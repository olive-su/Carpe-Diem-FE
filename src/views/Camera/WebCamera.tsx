import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import * as faceapi from 'face-api.js';
import styled, { keyframes } from 'styled-components';
import { TbLoader } from 'react-icons/tb';

import './index.css';
import Emotion from './Emotion';
import * as types from '../../types/cam';
import constraints from '../../common/constraints';
import uploadToS3Bucket from '../../services/Cam/uploadToS3Bucket';
import EmotionSetData from './EmotionSetData';
import config from '../../config';
import axios from 'axios';
import { ConnectingAirportsOutlined } from '@mui/icons-material';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';

const rotate = keyframes`
  from {
      transform: rotate(0deg);
    }

    to { transform: rotate(360deg);
    }
    `;
const Rotate = styled.div`
    display: inline-block;
    animation: ${rotate} 2s linear infinite;
    padding: 2rem 1rem;
    font-size: 1.2rem;
`;

const OnButton = styled.button`
    color: #8a1441;
    font-size: 1em;
    width: 80px;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #8a1441;
    border-radius: 3px;
    font-family: IBMPlexSansKR-Regular;
    &:active,
    &:hover,
    &:focus {
        background: var(--button-hover-bg-color, white);
    }
`;

const OffButton = styled.button`
    color: #2679cc;
    font-size: 1em;
    width: 80px;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #2679cc;
    font-family: IBMPlexSansKR-Regular;
    border-radius: 3px;
    &:active,
    &:hover,
    &:focus {
        background: var(--button-hover-bg-color, white);
    }
`;

let recordFlag = false; // 녹화 여부
let recentRecordTime: number;
let recordInfo: types.RecordInfo;
const expression: types.Expression = { value: 0, label: '', target: '', time: 0 };

// 비디오 사이즈 설정
function WebCamera(props: any) {
    const wrapRef = useRef<any>(null);
    const videoRef = useRef<any>(null);
    const { usim } = useSelector((state: any) => state.usim);
    const { nickname } = useSelector((state: any) => state.auth);

    const [camStarted, setCamStarted] = useState(false);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [recordStarted, setRecordStarted] = useState(false);

    const [data, setData] = useState(EmotionSetData(0));

    // 사용자 비디오 가져오기
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => {
                if (videoRef && videoRef.current) {
                    if (camStarted) {
                        videoRef.current.srcObject = stream;
                        setModelLoaded(true);
                    } else {
                        setModelLoaded(false);
                        videoRef.current.srcObject = null;
                    }
                }
            })
            .catch((err) => console.error(err));
    }, [camStarted]);

    useEffect(() => {
        // 모델 로드
        const MODEL_URL = '/models';

        if (modelLoaded) {
            Promise.all([
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                // 사용자 이미지 Face Detection
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
            ])
                .then(() => {
                    console.log('모델 로드 완료');
                })
                .catch((err) => console.error(err));
        }
    }, [modelLoaded]);

    // 라벨링 할 인물 이미지 로컬에서 가져오기
    const loadImage = async () => {
        return Promise.all(
            usim.map(async (label: string) => {
                const images = await faceapi.fetchImage(label);
                const descriptions = [];
                const detections = await faceapi.detectSingleFace(images).withFaceLandmarks().withFaceDescriptor();
                if (detections) descriptions.push(detections.descriptor);

                return new faceapi.LabeledFaceDescriptors(label, descriptions);
            }),
        );
    };

    // 감정 인식 & 영상 다운로드
    const onPlay = async () => {
        // 이미지 정보를 기반으로 canvas 요소 생성
        const canvas = faceapi.createCanvasFromMedia(videoRef.current as HTMLVideoElement);
        if (wrapRef.current !== null) wrapRef.current.append(canvas);

        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true }); // 다운로드할 영상 변수 생성
        const mediaRecorder = new MediaRecorder(mediaStream); // 새로운 영상 객체 생성
        mediaRecorder.ondataavailable = handleDataAvailable;

        let displaySize = { width: constraints.video.width, height: constraints.video.height };

        if (videoRef.current) {
            // 영상 사이즈를 canvas에 맞추기 위한 설정
            displaySize = {
                width: videoRef.current.width,
                height: videoRef.current.height,
            };
        }

        faceapi.matchDimensions(canvas, displaySize); // canvas 사이즈를 맞춤

        // 로컬 대조 이미지 가져오기
        const labeledFaceDescriptors = await loadImage();

        // 안면 인식 부분
        const faceDetecting = async (expression: types.Expression) => {
            let detections;

            if (videoRef.current) {
                detections = await faceapi
                    .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                    .withFaceLandmarks()
                    .withFaceExpressions()
                    .withAgeAndGender()
                    .withFaceDescriptors();
            }

            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, constraints.model.matchValue);

            if (resizedDetections)
                resizedDetections.forEach((detection, i) => {
                    const matched = resizedDetections[i];
                    const box = matched.detection.box;
                    // const target = faceMatcher.findBestMatch(matched.descriptor).toString();
                    let label = faceMatcher.findBestMatch(matched.descriptor).label; // Face Detection
                    const labelColor = label !== 'unknown' ? 'red' : 'blue';
                    label = labelColor === 'red' ? nickname : '';
                    const drawBox = new faceapi.draw.DrawBox(box, { boxColor: labelColor, label: label });

                    // if (label === userId) drawBox.draw(canvas); // 특정 사용자가 감지됐을 때만 바운딩 박스 표시
                    drawBox.draw(canvas); // 전체 사용자 인식

                    // faceapi.draw.drawFaceExpressions(canvas, resizedDetections); // 감정 수치 표시

                    const { neutral, ...otherDetection }: Record<string, any> = detection.expressions;

                    expression.value = Math.max(...Object.values(otherDetection));
                    expression.label = Object.keys(otherDetection).find((key) => otherDetection[key] === expression.value) || ''; // 현재 최대 수치 감정 종류 가져오기
                    expression.target = label;
                    expression.time = Date.now();

                    // if (expression.target === userId) { // CHECK
                    setData(EmotionSetData(detection.expressions));
                    // }
                });
            return expression;
        };

        const loop = async () => {
            const expressions = await faceDetecting(expression);
            // 새로 녹화 시작
            // CHECK
            // if (!recordFlag && expressions.value > constraints.model.emotionValue && expressions.label === 'happy') {
            if (
                !recordFlag &&
                expressions.value > constraints.model.emotionValue &&
                expressions.label === 'happy' &&
                expressions.target !== 'unknown'
            ) {
                recordFlag = true;
                recordInfo = {
                    maxValue: expressions.value,
                    label: expressions.label,
                    count: 1,
                    startTime: expressions.time,
                    maxTime: -32400000,
                };
                recentRecordTime = expressions.time; // 최근 감정 갱신 시간
                mediaRecorder.start();
                recordVideo(mediaRecorder); // 녹화시작
                setRecordStarted(true);
                console.log('녹화 시작');
            }
            // 녹화 시간 연장
            else if (recordFlag && expressions.value > constraints.model.emotionValue && expressions.label === recordInfo.label) {
                if (recordInfo.maxValue < expressions.value) {
                    // 최대 감정 관측 데이터 변경
                    recordInfo.maxValue = expressions.value;
                    recordInfo.maxTime = expressions.time - recordInfo.startTime - 32400000;
                }
                recentRecordTime = expressions.time; // 최근 감정 갱신 시간
            }

            if (camStarted === true) setTimeout(loop, 0.03);
        };
        setTimeout(loop, 0.03);
    };

    const recordVideo = async (mediaRecorder: MediaRecorder) => {
        setTimeout(async () => {
            if (recordInfo.count <= 5 && Date.now() - recentRecordTime < 2000) {
                // 2초 이내 감정 갱신시, 시간 추가
                console.log('녹화 연장');
                recordInfo.count++; // 시간 연장 횟수 (최대 1분까지만 저장되게 구현)
                recordVideo(mediaRecorder);
            } else {
                try {
                    if (videoRef.current) {
                        mediaRecorder.stop();
                        props.onVideoListRender(new Date());
                    }
                    recordFlag = false;
                    recentRecordTime = 0;
                    console.log('녹화 중지');
                    setRecordStarted(false);
                } catch (err) {
                    console.log(err);
                }
            }
        }, 15000);
    };

    async function handleDataAvailable(event: any) {
        const recordedChunks: any[] = [];
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            if (camStarted === true) await uploadToS3Bucket(recordInfo, recordedChunks);
            recordedChunks.pop();
        }
    }

    const onairButton = {
        backgroundColor: 'black',
        color: 'red',
        textDecoration: 'none',
        marginBottom: 20,
        fontWeight: 'bold',
        border: '4px solid red',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.5), -4px -4px 4px rgba(255, 255, 255, 0.5)',
        padding: '8px 16px',
        fontSize: '24px',
        borderRadius: '20px',
        transition: 'all 0.6s ease-in-out',
    };

    const offairButton = {
        backgroundColor: 'black',
        color: 'white',
        textDecoration: 'none',
        marginBottom: 20,
        fontWeight: 'bold',
        border: '2px solid grey',
        boxShadow: '4px 4px 4px rgba(0, 0, 0, 0.5), -4px -4px 4px rgba(255, 255, 255, 0.5)',
        padding: '8px 16px',
        fontSize: '24px',
        borderRadius: '20px',
        transition: 'all 0.6s ease-in-out',
    };

    return (
        <>
            <div>
                <div>
                    <div style={{ paddingBottom: '20px' }}>
                        {recordStarted ? <button style={onairButton}>ON AIR</button> : <button style={offairButton}>ON AIR</button>}
                        {/* <OnButton onClick={() => setCamStarted(true)}>ON</OnButton>
                    <OffButton onClick={() => setCamStarted(false)}>OFF</OffButton> */}

                        {/* {camStarted ? (
                        <AwesomeButton onPressed={() => setCamStarted(false)} type="danger">
                            OFF
                        </AwesomeButton>
                    ) : (
                        <AwesomeButton onPressed={() => setCamStarted(true)} type="primary" className="aws-btn">
                            ON
                        </AwesomeButton>
                    )} */}
                        {/* <ButtonOnOff /> */}
                    </div>
                    <div
                        ref={wrapRef}
                        id="wrap"
                        style={{
                            borderStyle: 'none',
                            width: constraints.video.width,
                            height: constraints.video.height,
                        }}
                    >
                        <div>
                            {/* <img
                            src={`${process.env.PUBLIC_URL}/imgs/frame.png`}
                            style={{ position: 'absolute', left: '-130px', bottom: '-165px' }}
                            width={constraints.video.width + 260}
                            height={constraints.video.height + 200}
                        /> */}
                            <img
                                src={`${process.env.PUBLIC_URL}/imgs/imac-frame.png`}
                                style={{ position: 'absolute', left: '-35px', bottom: '-275px' }}
                                width={constraints.video.width + 58}
                                height={constraints.video.height + 315}
                            />
                            {camStarted ? (
                                <video
                                    ref={videoRef}
                                    autoPlay
                                    muted
                                    onPlay={onPlay}
                                    width={constraints.video.width}
                                    height={constraints.video.height}
                                />
                            ) : (
                                <video
                                    src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/assets/loading-video.mp4`}
                                    autoPlay
                                    loop
                                    muted
                                    style={{ objectFit: 'cover' }}
                                    width={constraints.video.width}
                                    height={constraints.video.height}
                                />
                            )}
                        </div>
                        <AwesomeButton
                            type={camStarted ? 'danger' : 'primary'}
                            onPress={() => {
                                setCamStarted(!camStarted);
                            }}
                            ripple
                            style={{ position: 'absolute', bottom: '10px', right: '30px' }}
                        >
                            {camStarted ? 'OFF' : 'ON'}
                        </AwesomeButton>
                    </div>
                </div>
            </div>
            <Emotion data={data} />
        </>
    );
}

export default WebCamera;
