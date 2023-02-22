import React from 'react';

export default function AlbumCarousel(props: any) {
    console.log('Carousel', props.cardInfo);
    return (
        <div>
            <h3>{props.cardInfo.cardId}</h3>
            <div>
                {props.cardInfo.expressionLabel}
                <img src="./images/frame.png" height="500px" style={{ overflow: 'hideen', width: '100%', position: 'absolute' }}></img>
                <video controls loop src="{cardAlbum.videoUrl}" width="600px" height="460px"></video>
            </div>
        </div>
    );
}
