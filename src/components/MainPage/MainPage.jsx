import styles from './MainPage.module.css';
import GazpromLogo from '../../assets/GazpromLogo.svg';
import Plus from '../../assets/Plus.svg';
import Time from '../../assets/Time.svg';
import Settings from '../../assets/Settings.svg';
import { Link } from "react-router-dom";
import Back from "../../assets/Back.svg";
import Upload from "../../assets/Upload.svg";
import { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../main.jsx";

const MainPage = () => {
    const { store } = useContext(Context);
    const [content, setContent] = useState('Ипотека');
    const [extraContent, setExtraContent] = useState('');
    const [lawText, setLawText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [Photo_style, setPhoto_style] = useState('Реалистичный');
    const [width, setWidth] = useState(300); // Default width
    const [height, setHeight] = useState(250); // Default height
    const [bannerCreated, setBannerCreated] = useState(false);
    const [bannerImage, setBannerImage] = useState('');
    const [text, setText] = useState('');
    const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
    const [dragging, setDragging] = useState(false);
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const [textColor, setTextColor] = useState('#000000');
    const [textSize, setTextSize] = useState(16);
    const canvasRef = useRef(null);
    const textInputRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const handleFileChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsGenerating(true);
        try {
            const response = await store.createBanner(content, extraContent, lawText, width, height, Photo_style);
            if (response && response.images && response.images.length > 0) {
                setBannerCreated(true);
                setBannerImage(response.images[0]); // Извлекаем первое изображение
                console.log('Banner created successfully');
            } else {
                console.error('No images found in the response');
            }
        } catch (error) {
            console.error('Error creating banner', error);
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        if (bannerCreated && bannerImage) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.clearRect(0, 0, width, height); // Clear the canvas
            const image = new Image();
            image.onload = function() {
                context.drawImage(image, 0, 0, width, height); // Draw the new image
                context.font = `${textSize}px Arial`;
                context.fillStyle = textColor;
                context.fillText(text, textPosition.x, textPosition.y); // Draw the text
            }
            image.src = `data:image/png;base64,${bannerImage}`;
        }
    }, [bannerCreated, bannerImage, text, textPosition, textColor, textSize, width, height]);

    const handleDoubleClick = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const newText = prompt('Введите текст:');
        if (newText !== null) {
            setText(newText);
            setTextPosition({ x, y });
            drawTextOnCanvas(newText, x, y);
        }
    };

    const handleTextChange = (e) => {
        setText(e.target.value);
        drawTextOnCanvas(e.target.value, textPosition.x, textPosition.y);
    };

    const drawTextOnCanvas = (text, x, y) => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, width, height); // Clear the canvas
        const image = new Image();
        image.onload = function() {
            context.drawImage(image, 0, 0, width, height); // Draw the image
            context.font = `${textSize}px Arial`;
            context.fillStyle = textColor;
            context.fillText(text, x, y); // Draw the text
        };
        image.src = `data:image/png;base64,${bannerImage}`;
    };

    const handleMouseDown = (e) => {
        const canvas = canvasRef.current;
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const context = canvas.getContext('2d');
        context.font = `${textSize}px Arial`;
        const textWidth = context.measureText(text).width;
        const textHeight = textSize; // Approximate height

        if (x >= textPosition.x && x <= textPosition.x + textWidth &&
            y >= textPosition.y - textHeight && y <= textPosition.y) {
            setDragging(true);
            setOffset({ x: x - textPosition.x, y: y - textPosition.y });
        }
    };

    const handleMouseMove = (e) => {
        if (dragging) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            setTextPosition({ x: x - offset.x, y: y - offset.y });
            drawTextOnCanvas(text, x - offset.x, y - offset.y);
        }
    };

    const handleMouseUp = () => {
        setDragging(false);
    };

    const handleSaveCanvas = () => {
        const canvas = canvasRef.current;
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'banner.png';
        link.click();
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
        'Мультяшный',
        'Искусство',
        'Аниме'
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
                                                        <option key={index} value={service}>{service}</option>
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
                                        <canvas
                                            ref={canvasRef}
                                            width={width}
                                            height={height}
                                            onDoubleClick={handleDoubleClick}
                                            onMouseDown={handleMouseDown}
                                            onMouseMove={handleMouseMove}
                                            onMouseUp={handleMouseUp}
                                        ></canvas>
                                        <input
                                            ref={textInputRef}
                                            type="text"
                                            value={text}
                                            onChange={handleTextChange}
                                            style={{
                                                position: 'absolute',
                                                display: 'none',
                                                fontSize: `${textSize}px`,
                                                color: textColor,
                                            }}
                                        />
                                        <label>
                                            Цвет текста:
                                            <input type="color" value={textColor}
                                                   onChange={(e) => setTextColor(e.target.value)}/>
                                        </label>
                                        <label>
                                            Размер текста:
                                            <input
                                                type="number"
                                                value={textSize}
                                                onChange={(e) => {
                                                    setTextSize(e.target.value);
                                                    drawTextOnCanvas(text, textPosition.x, textPosition.y);
                                                }}
                                            />
                                        </label>
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
                                                        <option key={index} value={service}>{service}</option>
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
                                                    Ваш запрос<strong className={styles.strong}>*</strong>
                                                    <text className={styles.background}>Обязательное поле. Опишите ваш баннер
                                                    </text>
                                                </div>
                                                <textarea type={'text'} className={styles.textField}
                                                          value={extraContent}
                                                          onChange={(e) => setExtraContent(e.target.value)} required/>
                                            </div>
                                            <div className={styles.BannerQuestion}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Размеры баннера <strong className={styles.strong}>*</strong>
                                                </div>
                                                <input type={'number'} className={styles.NumberField} placeholder={'Ширина'}
                                                       value={width}
                                                       onChange={(e) => setWidth(e.target.value)}
                                                ></input>
                                                <input type={'number'} className={styles.NumberField} placeholder={'Длина'}
                                                       value={height}
                                                       onChange={(e)=>setHeight(e.target.value)}
                                                ></input>
                                            </div>
                                            <div className={styles.BannerLaw}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Юридический текст
                                                </div>
                                                <textarea type={'text'} className={styles.textField}
                                                          value={lawText}
                                                          onChange={(e) => setLawText(e.target.value)} required/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.ContentBannerContainer}>
                                    <div className={styles.ContentBannerPadding}>
                                        <div className={styles.HeaderOfBanner}>
                                            <div className={styles.NumberContainer}>
                                                <div className={styles.Number}>2</div>
                                                <div className={styles.TextNumber}>Фотография</div>
                                            </div>
                                        </div>
                                        <div className={styles.UploadImage}>
                                            <div className={styles.BannerThemeContainer}>
                                                <div className={styles.nameOfBannerContainer}>
                                                    Изображение, используемое на баннере
                                                </div>
                                                <div className={styles.UploadImageContainer}>
                                                    <div className={styles.Upload}>
                                                        <input
                                                            type="file"
                                                            id="fileUpload"
                                                            ref={fileInputRef}
                                                            className={styles.hiddenInput}
                                                            onChange={handleFileChange}
                                                        />
                                                        <button type="button" className={styles.customButton} onClick={handleButtonClick}>
                                                            <img src={Upload} className={styles.Image}/> Нажмите, чтобы добавить изображение
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.ButtonsFooter}>
                                {isGenerating && <span>Генерируется баннер, ожидайте</span>}
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

