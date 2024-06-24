import styles from './MainPage.module.css';
import GazpromLogo from '../../assets/GazpromLogo.svg';
import Plus from '../../assets/Plus.svg';
import Time from '../../assets/Time.svg';
import Settings from '../../assets/Settings.svg';
import { Link } from "react-router-dom";
import Back from "../../assets/Back.svg";
import Upload from "../../assets/Upload.svg";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../main.jsx";
import IconToolTip from "./IconToolTip.jsx";
import Ext from "../../assets/Ext.svg";
import {FabricJSCanvas, useFabricJSEditor} from "fabricjs-react";
import {fabric} from "fabric";

const MainPage = () => {
    const { store } = useContext(Context);
    const [content, setContent] = useState('Ипотека');
    const [extraContent, setExtraContent] = useState('');
    const [lawText, setLawText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [Photo_style, setPhoto_style] = useState('Реалистичный');
    const [width, setWidth] = useState(800); // Default width
    const [height, setHeight] = useState(900); // Default height
    const [bannerCreated, setBannerCreated] = useState(true);
    const [bannerImage, setBannerImage] = useState('');
    const { editor, onReady } = useFabricJSEditor();
    const [textColor, setTextColor] = useState('#000000');
    const [textSize, setTextSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Manrope');
    const [opacity, setOpacity] = useState(1);
    const [shapeColor, setShapeColor] = useState('#000000');
    const [isGenerating, setIsGenerating] = useState(false);
    const [bannerTheme, setBannerTheme] = useState([]);
    const [bannerTexts, setBannerTexts] = useState([]);
    const [WithoutText, setWithoutText] = useState(false);


    const triggerFileInput = () => {
        document.getElementById('file-input').click();
    };

    const handleCheckboxChange = () => {
        setWithoutText(prevState => !prevState);
    };

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        if(WithoutText === true) {
            try {
                const response = await store.createBannerWithoutText(content, extraContent, lawText, width, height, Photo_style);
                if (response && response.images && response.images.length > 0) {
                    setBannerCreated(true);
                    setBannerImage(response.images[1]);
                    setBannerTexts(response.banners.texts);
                    console.log('Banner created successfully');
                } else {
                    console.error('No images found in the response');
                }
            } catch (error) {
                console.error('Error creating banner', error);
            } finally {
                setIsGenerating(false);
            }
        } else {
            try {
                const response = await store.createBanner(content, extraContent, lawText, width, height, Photo_style);
                if (response && response.images && response.images.length > 0) {
                    setBannerCreated(true);
                    setBannerImage(response.images[1]); // Извлекаем первое изображение
                    console.log('Banner created successfully');
                } else {
                    console.error('No images found in the response');
                }
            } catch (error) {
                console.error('Error creating banner', error);
            } finally {
                setIsGenerating(false);
            }
        }
    };

    useEffect(()=> {
        store.bannerTheme().then(responce => {
            setBannerTheme(responce);
        })
    },[])


    useEffect(() => {
        if (bannerImage && editor) {
            const img = new Image();
            img.src = `data:image/png;base64,${bannerImage}`;
            img.onload = () => {
                const fabricImage = new fabric.Image(img, {
                    selectable: false, // Изображение не будет выделяться
                    evented: false, // Изображение не будет реагировать на события
                });
                editor.canvas.add(fabricImage);
                editor.canvas.sendToBack(fabricImage); // Отправляем изображение на задний план

                // Добавление текста
                bannerTexts.forEach((textObj) => {
                    const { text, coordinates, style } = textObj;
                    const fabricText = new fabric.Textbox(text, {
                        left: coordinates.x,
                        top: coordinates.y,
                        fontSize: style['font-size'],
                        fill: style.color,
                        fontFamily: style.fontFamily || 'Arial',
                        opacity: style.opacity || 1,
                        editable: true,
                    });
                    editor.canvas.add(fabricText);
                    editor.canvas.bringToFront(fabricText); // Перемещаем текст на передний план
                });

                editor.canvas.renderAll();
            };
        }
    }, [bannerImage, editor, bannerTexts]);

    useEffect(() => {
        if (editor) {
            editor.canvas.setWidth(width);
            editor.canvas.setHeight(height);
            editor.canvas.renderAll();
        }
    }, [editor, width, height]);


    useEffect(() => {
        if (editor) {
            editor.canvas.setWidth(width);
            editor.canvas.setHeight(height);

            const handleDoubleClick = (event) => {
                const pointer = editor.canvas.getPointer(event.e);
                const textbox = new fabric.Textbox('Пишите свой текст', {
                    left: pointer.x,
                    top: pointer.y,
                    fontSize: textSize,
                    fill: textColor,
                    fontFamily: fontFamily,
                    opacity: opacity,
                    editable: true,
                });
                editor.canvas.add(textbox);
                editor.canvas.setActiveObject(textbox);
                editor.canvas.renderAll();
            };

            const handleObjectSelected = (e) => {
                const activeObject = e.target;
                if (activeObject.type === 'textbox') {
                    setTextColor(activeObject.fill);
                    setTextSize(activeObject.fontSize);
                    setFontFamily(activeObject.fontFamily);
                    setOpacity(activeObject.opacity);
                } else if (activeObject.type === 'rect' || activeObject.type === 'circle') {
                    setShapeColor(activeObject.fill);
                    setOpacity(activeObject.opacity);
                }
            };

            const handleKeyDown = (event) => {
                const activeObject = editor.canvas.getActiveObject();
                if (activeObject && event.key === 'Backspace') {
                    if (activeObject.type !== 'textbox' || (activeObject.type === 'textbox' && !activeObject.isEditing)) {
                        editor.canvas.remove(activeObject);
                        editor.canvas.renderAll();
                    }
                }
            };

            editor.canvas.on('mouse:dblclick', handleDoubleClick);
            editor.canvas.on('object:selected', handleObjectSelected);
            window.addEventListener('keydown', handleKeyDown);

            return () => {
                editor.canvas.off('mouse:dblclick', handleDoubleClick);
                editor.canvas.off('object:selected', handleObjectSelected);
                window.removeEventListener('keydown', handleKeyDown);
            };
        }
    }, [editor, textSize, textColor, fontFamily, opacity]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const imgObj = new Image();
            imgObj.src = event.target.result;
            imgObj.onload = () => {
                const img = new fabric.Image(imgObj);
                img.set({
                    left: 0,
                    top: 0,
                    scaleX: editor.canvas.width / img.width,
                    scaleY: editor.canvas.height / img.height,
                });
                editor.canvas.setBackgroundImage(img, editor.canvas.renderAll.bind(editor.canvas));
            };
        };
        reader.readAsDataURL(file);
    };

    const handleSaveCanvas = () => {
        // Устанавливаем размер для toDataURL в пикселях
        const canvasWidth = editor.canvas.getWidth();
        const canvasHeight = editor.canvas.getHeight();

        const dataURL = editor.canvas.toDataURL({
            format: 'png',
            multiplier: 1, // масштабирование, если нужно большее разрешение
            width: canvasWidth,
            height: canvasHeight
        });

        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'banner.png';
        link.click();
    };


    const handleFontSizeChange = (event) => {
        const newSize = parseFloat(event.target.value);
        setTextSize(newSize);
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set({ fontSize: newSize });
            editor.canvas.renderAll();
        }
    };

    const handleFontColorChange = (event) => {
        const newColor = event.target.value;
        setTextColor(newColor);
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set({ fill: newColor });
            editor.canvas.renderAll();
        }
    };

    const handleFontFamilyChange = (event) => {
        const newFontFamily = event.target.value;
        setFontFamily(newFontFamily);
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject && activeObject.type === 'textbox') {
            activeObject.set({ fontFamily: newFontFamily });
            editor.canvas.renderAll();
        }
    };

    const handleOpacityChange = (e) => {
        const newOpacity = parseFloat(e.target.value);
        setOpacity(newOpacity);
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject) {
            activeObject.set({ opacity: newOpacity });
            editor.canvas.renderAll();
        }
    };

    const handleShapeColorChange = (e) => {
        const newColor = e.target.value;
        setShapeColor(newColor);
        const activeObject = editor.canvas.getActiveObject();
        if (activeObject && (activeObject.type === 'rect' || activeObject.type === 'circle')) {
            activeObject.set({ fill: newColor });
            editor.canvas.renderAll();
        }
    };

    const handleAddSquare = () => {
        const square = new fabric.Rect({
            left: 100,
            top: 100,
            fill: shapeColor,
            width: 60,
            height: 60,
            opacity,
        });
        editor.canvas.add(square);
    };

    const handleAddCircle = () => {
        const circle = new fabric.Circle({
            left: 100,
            top: 100,
            fill: shapeColor,
            radius: 30,
            opacity,
        });
        editor.canvas.add(circle);
    };

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click();
    };

    const services = [
        'Классический потребительский кредит',
        'Рефинансирование внутреннего ПК в Газпромбанке',
        'Рефинансирование внешнего ПК в другом банке',
        'Кредитная карта',
        'Классический автокредит',
        'Кредит под залог авто',
        'Ипотека',
        'Рефинансирование ипотеки',
        'Кредит под залог недвижимости',
        'Депозит',
        'Накопительный счет',
        'Дебетовая карта',
        'Премиальная карта',
        'Брокерский и инвестиционный счет',
        'Инвестиционное страхование жизни',
        'Накопительное страхование жизни',
        'Страхование жизни',
        'Доверительное управление',
        'Обезличенный металлический счет',
        'Индивидуальный зарплатный проект',
        'Обмен валюты'
    ];

    const stylesBanner = [
        'Реалистичный',
        'Мультик',
        'Искусство',
        'Аниме',
        'Звезды'
    ];

    return (
        <div className={styles.BodyContainer}>
            <div className={styles.MainContainer}>
                <div className={styles.SideBar}>
                    <div className={styles.SideBarContent}>
                        <img src={GazpromLogo} width={237} height={50} alt="Gazprom"/>
                        <div className={styles.Navigation}>
                            <div className={styles.CreateBannerContainer}>
                                <img src={Plus}/>
                                <Link to={'/main'} className={styles.TextContainer}>Создание нового баннера</Link>
                            </div>
                            <div className={styles.BannerContainer}>
                                <img src={Time}/>
                                <Link to={"/history"} className={styles.TextContainer}>История</Link>
                            </div>
                            <div className={styles.BannerContainer}>
                                <img src={Settings}/>
                                <Link to={"/settings"} className={styles.TextContainer}>Настройки</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.CreateContainer}>
                    {bannerCreated ? (
                        <div className={styles.BannerCreatedContainer}>
                            <div className={styles.HeaderContainer}>
                                <div className={styles.HeaderButton}>Создать новый баннер</div>
                            </div>
                            <div className={styles.ContentContainerForCanvas}>
                                <div className={styles.ContentBannerCanvasContainer}>
                                    <div className={styles.ContentBannerPadding}>
                                        <div className={styles.HeaderOfBanner}>
                                            <div className={styles.NumberContainer}>
                                                <div className={styles.TextNumber}>Баннер успешно создан!</div>
                                            </div>
                                            <div className={styles.BackContainer}>
                                                <img src={Back} className={styles.BackLogo} alt="BackButton"/>
                                                <div>Назад</div>
                                            </div>
                                        </div>
                                        <div className={styles.BannerContent}>
                                            <div className={styles.BannerThemeContainer}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Тема баннера
                                                </div>
                                                <select id="services-dropdown" className={styles.Dropdown}
                                                        value={content}
                                                        onChange={(e) => setContent(e.target.value)}>
                                                    {services.map((service, index) => (
                                                        <option key={index} value={service}>{content}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={styles.BannerStyle}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Стиль баннера
                                                </div>
                                                <select id="services-dropdownStyles" className={styles.Dropdown}
                                                        value={Photo_style}
                                                        onChange={(e) => setPhoto_style(e.target.value)}>
                                                    {stylesBanner.map((style, index) => (
                                                        <option key={index} value={style}>{style}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.Canvas}>
                                        <div className={styles.test}>
                                            <FabricJSCanvas className={styles.canvas} onReady={onReady} />
                                            <div className={styles.Toolbar}>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageUpload}
                                                    id="file-input"
                                                    className={styles.HiddenFileInput}
                                                />
                                                <button onClick={triggerFileInput} className={styles.UploadButton}>
                                                    <img src={Upload}/>
                                                </button>
                                                <button onClick={handleAddSquare} className={styles.Button}>Квадрат
                                                </button>
                                                <button onClick={handleAddCircle} className={styles.Button}>Круг
                                                </button>
                                                <div className={styles.InputGroup}>
                                                    <label>Цвет текста: </label>
                                                    <input
                                                        type="color"
                                                        value={textColor}
                                                        onChange={handleFontColorChange}
                                                        className={styles.ColorInput}
                                                    />
                                                </div>
                                                <div className={styles.InputGroup}>
                                                    <label>Размер: </label>
                                                    <input
                                                        type="number"
                                                        value={textSize}
                                                        onChange={handleFontSizeChange}
                                                        className={styles.NumberInput}
                                                    />
                                                </div>
                                                <div className={styles.InputGroup}>
                                                    <label>Шрифт: </label>
                                                    <select
                                                        value={fontFamily}
                                                        onChange={handleFontFamilyChange}
                                                        className={styles.SelectInput}
                                                    >
                                                        <option value="Arial">Arial</option>
                                                        <option value="Courier New">Courier New</option>
                                                        <option value="Times New Roman">Times New Roman</option>
                                                        <option value="Verdana">Verdana</option>
                                                        <option value="Manrope">Manrope</option>
                                                    </select>
                                                </div>
                                                <div className={styles.InputGroup}>
                                                    <label>Цвет фигуры: </label>
                                                    <input
                                                        type="color"
                                                        value={shapeColor}
                                                        onChange={handleShapeColorChange}
                                                        className={styles.ColorInput}
                                                    />
                                                </div>
                                                <div className={styles.InputGroup}>
                                                    <label>Прозрачность: </label>
                                                    <input
                                                        type="range"
                                                        min="0"
                                                        max="1"
                                                        step="0.1"
                                                        value={opacity}
                                                        onChange={handleOpacityChange}
                                                        className={styles.RangeInput}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.ButtonsFooter}>
                                <button className={styles.SaveButton}>Переделать</button>
                                <button type={'button'} className={styles.DaleeButton}
                                        onClick={handleSaveCanvas}>Опубликовать
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className={styles.HeaderContainer}>
                                <div className={styles.HeaderButton}>Создать новый баннер</div>
                            </div>
                            <div className={styles.ContentContainer}>
                                <div className={styles.ContentHeaderBanner}>Создать новый баннер</div>
                                <div className={styles.ContentBannerContainer}>
                                    <div className={styles.ContentBannerPadding}>
                                        <div className={styles.HeaderOfBanner}>
                                            <div className={styles.NumberContainer}>
                                                <div className={styles.Number}>1</div>
                                                <div className={styles.TextNumber}>Описание баннера</div>
                                            </div>
                                            <div className={styles.BackContainer}>
                                                <img src={Back} className={styles.BackLogo} alt="BackButton"/>
                                                <Link to={"/main"} className={styles.backButton}>Назад</Link>
                                            </div>
                                        </div>
                                        <div className={styles.BannerContent}>
                                            <div className={styles.BannerThemeContainer}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Тема баннера
                                                </div>
                                                <select id="services-dropdown" className={styles.Dropdown}
                                                        value={content}
                                                        onChange={(e) => setContent(e.target.value)}>
                                                    {bannerTheme.map((banner, index) => (
                                                        <option key={index} value={banner.title}>{banner.title}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={styles.BannerStyle}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Стиль баннера
                                                </div>
                                                <select id="services-dropdownStyles" className={styles.Dropdown}
                                                        value={Photo_style}
                                                        onChange={(e) => setPhoto_style(e.target.value)}>
                                                    {stylesBanner.map((style, index) => (
                                                        <option key={index} value={style}>{style}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className={styles.BannerQuestion}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Ваш запрос<strong className={styles.strong}>*</strong> <IconToolTip
                                                    icon={Ext} text={'Обязательное поле. Опишите ваш баннер'}/>
                                                </div>
                                                <textarea type={'text'} className={styles.textField}
                                                          value={extraContent}
                                                          onChange={(e) => setExtraContent(e.target.value)} required/>
                                            </div>
                                            <div className={styles.BannerQuestion}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Размеры баннера <strong
                                                    className={styles.strong}>*</strong><IconToolTip icon={Ext}
                                                                                                     text={'Обязательное поле. Укажите размеры вашего баннера, но не более 1200 на 1000'}/>
                                                </div>
                                                <input type={'number'} className={styles.NumberField}
                                                       placeholder={'Ширина'}
                                                       value={width} max="1200"
                                                       onChange={(e) => setWidth(e.target.value)}
                                                ></input>
                                                <input type={'number'} className={styles.NumberField}
                                                       placeholder={'Длина'}
                                                       value={height} max="1000"
                                                       onChange={(e) => setHeight(e.target.value)}
                                                ></input>
                                            </div>
                                            <div className={styles.BannerLaw}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Юридический текст<strong
                                                    className={styles.strong}>*</strong><IconToolTip icon={Ext}
                                                                                                     text={'Обязательное поле. Заполните поле для юридической информации об условиях продукта'}/>
                                                </div>
                                                <textarea type={'text'} className={styles.textField}
                                                          value={lawText}
                                                          onChange={(e) => setLawText(e.target.value)} required/>
                                            </div>
                                            <div className={styles.BannerQuestionCheck}>
                                                    <input
                                                        className={styles.CheckFiels}
                                                        type="checkbox"
                                                        checked={WithoutText}
                                                        onChange={handleCheckboxChange}
                                                    />
                                                <text>Расположить текст самому</text>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<div className={styles.ContentBannerContainer}>*/}
                                {/*    <div className={styles.ContentBannerPadding}>*/}
                                {/*        <div className={styles.HeaderOfBanner}>*/}
                                {/*            <div className={styles.NumberContainer}>*/}
                                {/*                <div className={styles.Number}>2</div>*/}
                                {/*                <div className={styles.TextNumber}>Фотография</div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*        <div className={styles.UploadImage}>*/}
                                {/*            <div className={styles.BannerThemeContainer}>*/}
                                {/*                <div className={styles.nameOfBannerContainer}>*/}
                                {/*                    Изображение, используемое на баннере*/}
                                {/*                </div>*/}
                                {/*                <div className={styles.UploadImageContainer}>*/}
                                {/*                    <div className={styles.Upload}>*/}
                                {/*                        <input*/}
                                {/*                            type="file"*/}
                                {/*                            id="fileUpload"*/}
                                {/*                            ref={fileInputRef}*/}
                                {/*                            className={styles.hiddenInput}*/}
                                {/*                            onChange={handleFileChange}*/}
                                {/*                        />*/}
                                {/*                        <button type="button" className={styles.customButton} onClick={handleButtonClick}>*/}
                                {/*                            <img src={Upload} className={styles.Image}/> Нажмите, чтобы добавить изображение*/}
                                {/*                        </button>*/}
                                {/*                    </div>*/}
                                {/*                </div>*/}
                                {/*            </div>*/}
                                {/*        </div>*/}
                                {/*    </div>*/}
                                {/*</div>*/}
                            </div>
                            <div className={styles.ButtonsFooter}>
                                {isGenerating && <span className={styles.ButtonGenerate}>Генерируется баннер, ожидайте</span>}
                                <button className={styles.SaveButton}>Сохранить черновик</button>
                                <button type={'button'} className={styles.DaleeButton} onClick={handleSubmit}>Далее</button>
                            </div>

                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MainPage;

