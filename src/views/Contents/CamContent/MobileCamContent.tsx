import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import styledComponents from 'styled-components';
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { Alert, Button, FormGroup, FormControlLabel, Switch } from '@mui/material';
import { ArrowCircleLeftRounded, ClearRounded, TimerRounded } from '@mui/icons-material';

import InteractiveCard from '../../Card/InteractiveCard';
import Modal from '../../Camera/Modal';
import { USIM_LOADING_REQUEST } from '../../../redux/types';
import WebCamera from '../../Camera/WebCamera';
import MobileCamera from '../../Camera/MobileCamera';
import config from '../../../config';
import MainLayout from '../../../components/MainLayout/MainLayout';
import iphone from '../../../assets/iphone.png';

const StyleContent = styledComponents.div`
    font-family: IBMPlexSansKR-Regular;
    height: 100%;
    position: relative;
    min-width: 100vw;
    display: flex;
    justify-content: center;
    display: flex;
    text-align: left;
`;

const AlignContents = styledComponents.div`
    display: flex;
    flex-direction: column;
    padding: 50px;
    border-radius: 45px;
    border-width: 30px;
    border-style: solid;
    border-color: black;
    background-color: rgba(255, 255, 255, 0.5);
`;

const WebCamPage = styledComponents.section`
    display: block;
    flex-direction: row;
    text-align: center;
    margin-top: 20px;
`;

const MobileCamPage = styledComponents.section`
    display: block;
    flex-direction: row;
    text-align: center;
    margin-left: 30px;
    margin-top: 20px;
`;

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 80,
    height: 36,
    padding: 10,
    '& .MuiSwitch-switchBase': {
        margin: 0,
        padding: 0,
        transform: 'translateX(6px)',
        '&.Mui-checked': {
            color: '#fff',
            transform: 'translateX(40px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M20 3H4c-1.1 0-2 .9-2 2v11c0 1.1.9 2 2 2h3l-1 1v2h12v-2l-1-1h3c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 13H4V5h16v11z"/></svg>')`,
            },
            '& + .MuiSwitch-track': {
                opacity: 1,
                backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
            },
        },
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
        width: 36,
        height: 36,
        '&:before': {
            content: "''",
            position: 'absolute',
            width: '100%',
            height: '100%',
            left: 0,
            top: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="24" width="24" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                '#fff',
            )}" d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"/></svg>')`,
        },
    },
    '& .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        borderRadius: 20 / 2,
    },
}));

export default function MobileCamContent() {
    const dispatch = useDispatch();
    const { usim } = useSelector((state: any) => state.usim);
    const [videoList, setVideoList] = useState<any[]>([]);
    const [alertClosed, setAlertClosed] = useState<any>('inline-block');
    const [switchChecked, setSwitchChecked] = useState<any>(false);

    useEffect(() => {
        dispatch({
            type: USIM_LOADING_REQUEST,
        });
    }, [dispatch]);

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
        <MainLayout>
            <StyleContent>
                {usim !== undefined && usim.length === 0 && <Modal />}
                <AlignContents>
                    <div style={{ textAlign: 'center', top: '-10px' }}>
                        <img src={iphone} style={{ width: '200px', position: 'relative', top: '-50px' }}></img>
                    </div>
                    {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <MaterialUISwitch
                                        sx={{ m: 1 }}
                                        checked={switchChecked}
                                        onChange={() => {
                                            setSwitchChecked(!switchChecked);
                                        }}
                                    />
                                }
                                label={<Typography sx={{ color: 'white' }}>Select Device</Typography>}
                            />
                        </FormGroup>
                        <Alert icon={false} severity="info" style={{ display: `${alertClosed}` }}>
                            <ArrowCircleLeftRounded sx={{ mx: 1 }} />
                            카메라를 연결할 기기를 바꿀 수 있어요!
                            <Button
                                onClick={() => {
                                    setAlertClosed('none');
                                }}
                            >
                                <ClearRounded />
                            </Button>
                        </Alert>
                    </div> */}
                    {switchChecked === true ? (
                        <WebCamPage>
                            <WebCamera onVideoListRender={videoRenderFlag} />
                        </WebCamPage>
                    ) : (
                        <MobileCamPage>
                            <MobileCamera onVideoListRender={videoRenderFlag} />
                        </MobileCamPage>
                    )}
                </AlignContents>
                <div
                    style={{
                        width: '500px',
                        paddingLeft: '20px',
                        paddingTop: '50px',
                        paddingBottom: '50px',
                    }}
                >
                    <h4 style={{ color: 'white' }}>
                        {' '}
                        <TimerRounded sx={{ marginRight: '10px' }} />
                        최근 저장된 영상
                    </h4>
                    <div>
                        {videoList.length > 0 && videoList[0]?.map((videos: any, index: any) => <InteractiveCard key={index} properties={videos} />)}
                    </div>
                </div>
            </StyleContent>
        </MainLayout>
    );
}
