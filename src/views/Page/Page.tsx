import React from 'react';
import styled from 'styled-components';
import frame from './images/frame.png';

const StyleContent = styled.div`
    font-family:GangwonEduPowerExtraBoldA;
    text-align: center;

`;

const FrameImage = styled.img`

    max-width:925px;
    width:80vw;
    height:50vw;
    margin: 0 auto;
    position:absolute;
    left:50%;
    top:10pxo;
    transform:translateX(-40%);
   
`;

const FrameVideo = styled.video`
    display:block;
    width:100%;
    height:0;
    padding-top:56.25%;
    position:relative;
`;

const VideoIFrame = styled.iframe`
    position:absolute;
    left:0;
    top:0;
    width:100%;
    height:100%;
`;

export default function Page() {
    return (
        <StyleContent>
            <FrameImage src={frame}>

            </FrameImage>

        </StyleContent>
    );
}
