import React, { useState } from 'react';
import styles from './IconToolTip.module.css';

const IconToolTip = ({ icon, text }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="icon-tooltip-container"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {isHovered ? <span className="tooltip-text">{text}</span> : <img src={icon} alt="icon" className="icon-image" />}
        </div>
    );
};

export default IconToolTip;