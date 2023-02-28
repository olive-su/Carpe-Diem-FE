import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import Header from '../../../components/Header/Header';

import InteractiveCard from '../../Card/InteractiveCard';
import CameraPage from '../../Camera';
import config from '../../../config';

const StyleContent = styled.div`
    background-color: #fff;
    font-family: IBMPlexSansKR-Regular;
    display: flex;
    height: auto;
    text-align: left;
    margin-top: -16px;
`;
const WebCamPage = styled.section`
    display: block;
    flex-direction: row;
    text-align: center;
    margin-left: 30px;
    margin-top: 20px;
`;

const userId = 'test';

export default function CamContent() {
    const [videoList, setVideoList] = useState<any[]>([]);
    const videoRenderFlag = () => {
        async function fetchData(): Promise<any> {
            const result = await axios({
                url: `http://${config.server.host}:${config.server.port}/camera`,
                method: 'get',
                withCredentials: true,
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
    useEffect(() => {
        videoRenderFlag();
    }, []);

    return (
        <>
            <Header />
            <span>
                <hr />
            </span>
            <StyleContent>
                <WebCamPage>
                    <CameraPage onVideoListRender={videoRenderFlag} />
                </WebCamPage>
                <div style={{ marginLeft: '20px', marginTop: '20px' }}>
                    <h2>최근 저장된 영상</h2>
                    <div>
                        {videoList.length > 0 && videoList[0]?.map((videos: any, index: any) => <InteractiveCard key={index} properties={videos} />)}
                    </div>
                </div>
            </StyleContent>
            <span>
                <hr style={{ marginTop: '-1px' }} />
            </span>
        </>
    );
}
