import React, { useEffect, useState } from 'react';
import { FabricJSCanvas, useFabricJSEditor } from 'fabricjs-react';
import { fabric } from 'fabric';
import style from '../components/MainPage/Test.module.css';

const Test = () => {
    const { editor, onReady } = useFabricJSEditor();
    const [textColor, setTextColor] = useState('#000000');
    const [textSize, setTextSize] = useState(16);
    const [fontFamily, setFontFamily] = useState('Arial');
    const [opacity, setOpacity] = useState(1);
    const [shapeColor, setShapeColor] = useState('#000000');

    useEffect(() => {
        if (editor) {
            editor.canvas.setWidth(800);
            editor.canvas.setHeight(900);

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
        const image = editor.canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
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

    return (
        <div className={style.test}>
            <FabricJSCanvas className={style.canvas} onReady={onReady} />
            <div className={style.toolbar}>
                <input type="file" accept="image/*" onChange={handleImageUpload} />
                <button onClick={handleSaveCanvas}>Save Canvas</button>
                <button onClick={handleAddSquare}>Add Square</button>
                <button onClick={handleAddCircle}>Add Circle</button>
                <div>
                    <label>Text Color: </label>
                    <input
                        type="color"
                        value={textColor}
                        onChange={handleFontColorChange}
                    />
                </div>
                <div>
                    <label>Font Size: </label>
                    <input
                        type="number"
                        value={textSize}
                        onChange={handleFontSizeChange}
                    />
                </div>
                <div>
                    <label>Font Family: </label>
                    <select
                        value={fontFamily}
                        onChange={handleFontFamilyChange}
                    >
                        <option value="Arial">Arial</option>
                        <option value="Courier New">Courier New</option>
                        <option value="Times New Roman">Times New Roman</option>
                        <option value="Verdana">Verdana</option>
                        <option value="Manrope">Manrope</option>
                    </select>
                </div>
                <div>
                    <label>Shape Color: </label>
                    <input
                        type="color"
                        value={shapeColor}
                        onChange={handleShapeColorChange}
                    />
                </div>
                <div>
                    <label>Opacity: </label>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={opacity}
                        onChange={handleOpacityChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default Test;
