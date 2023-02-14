import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Sidebar from '../../../components/Sidebar/Sidebar';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import InteractiveCard from '../../Card/InteractiveCard';
import WebCamPage from '../../webCam';
import config from '../../../config';

const StyleContent = styled.div`
    background-color: #fff;
    font-family: GangwonEduPowerExtraBoldA;
    display: flex;
    height: auto;
    text-align: left;
    margin-top: -16px;
`;
const WebcamPage = styled.section`
    display: block;
    flex-direction: row;
    text-align: center;
    margin-left: 10px;
    margin-top: 20px;
`;

export default function CamContent() {
    const [videoList, setVideoList] = useState<any[]>([]);
    // const [videoRenderFlag, setVideoRenderFlag] = useState<Date>(new Date());
    console.log(videoList);
    const videoRenderFlag = () => {
        async function fetchData(): Promise<any> {
            const result = await axios({
                url: `http://${config.server.host}:${config.server.port}/camera/test`,
                method: 'get',
            });
            return result;
        }
        fetchData()
            .then((result) => {
                setVideoList(new Array(result.data));

                console.log(result.data);
                console.log('최근 24시간 내 저장된 영상 데이터 로드 성공');
            })
            .catch((err) => {
                console.log(err);
                console.log('최근 24시간 내 저장된 영상 데이터 로드 실패');
            });
    };

    return (
        <>
            <Header />
            <span>
                <hr />
            </span>
            <StyleContent>
                <Sidebar />
                <WebcamPage>
                    <WebCamPage onVideoListRender={videoRenderFlag} />
                </WebcamPage>
                <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                    <h2>최근 24시간 내에 저장된 영상</h2>
                    <div>
                        {videoList[0]?.map((videos: any, index: any) => (
                            <InteractiveCard key={index} properties={videos} />
                            // <div>{videos.cardId}</div>
                        ))}
                    </div>
                </div>
            </StyleContent>
            <span>
                <hr style={{ marginTop: '-1px' }} />
            </span>
            <Footer />
        </>
    );
}
