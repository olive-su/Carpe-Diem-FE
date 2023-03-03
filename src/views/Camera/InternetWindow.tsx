import React, { useState } from 'react';
import './index.css';

const InternetWindow = () => {
    const [isMinimized, setIsMinimized] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [url, setUrl] = useState('https://www.google.com');

    const handleMinimize = () => {
        setIsMinimized(true);
    };

    const handleMaximize = () => {
        setIsMaximized(!isMaximized);
    };

    const handleFullScreen = () => {
        setIsFullScreen(!isFullScreen);
    };

    const handleUrlChange = (event: any) => {
        setUrl(event.target.value);
    };

    return (
        <div className="internet-window">
            <div className="internet-window__header">
                <div className="internet-window__title">Internet Explorer</div>
                <div className="internet-window__buttons">
                    <div className="internet-window__button internet-window__button--minimize" onClick={handleMinimize}>
                        _
                    </div>
                    <div className="internet-window__button internet-window__button--maximize" onClick={handleMaximize}>
                        {isMaximized ? '[] ' : '□ '}
                    </div>
                    <div className="internet-window__button internet-window__button--fullscreen" onClick={handleFullScreen}>
                        {isFullScreen ? '◀◀◀' : '▶'}
                    </div>
                    <div className="internet-window__button internet-window__button--close">X</div>
                </div>
            </div>
            {!isMinimized && (
                <div className="internet-window__body">
                    <div className="internet-window__menu">
                        <div className="internet-window__menu-item">File</div>
                        <div className="internet-window__menu-item">Edit</div>
                        <div className="internet-window__menu-item">View</div>
                        <div className="internet-window__menu-item">Favorites</div>
                        <div className="internet-window__menu-item">Tools</div>
                        <div className="internet-window__menu-item">Help</div>
                    </div>
                    <div className="internet-window__content">
                        <input type="text" className="internet-window__url" value={url} onChange={handleUrlChange} />
                        <iframe
                            title="Internet Window"
                            className={`internet-window__iframe ${isFullScreen ? 'internet-window__iframe--fullscreen' : ''}`}
                            src={url}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default InternetWindow;
