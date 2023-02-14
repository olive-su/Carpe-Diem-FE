/* eslint-disable */
import React, { useRef, useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';
import styled, { keyframes } from 'styled-components';
import { TbLoader } from 'react-icons/tb';
import InteractiveCard from '../Card/InteractiveCard';
import axios from 'axios';

import './index.css';
import config from '../../config';
import * as types from '../../types/cam';
import constraints from '../../common/constraints';
import uploadToS3Bucket from '../../services/Cam/uploadToS3Bucket';
import loadUsim from '../../services/Cam/loadUsim';
// import loadRecentVideo from '../../services/Cam/loadRecentVideo';

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
    font-family: GangwonEduPowerExtraBoldA;
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
    font-family: GangwonEduPowerExtraBoldA;
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
const expression: types.Expression = { value: 0, label: '', time: 0 };

// 서버로 넘어가는 유저 아이디
const userId = 'test';

// 비디오 사이즈 설정
function WebCamPage() {
    const wrapRef = useRef<any>(null);
    const videoRef = useRef<any>(null);

    const [camStarted, setCamStarted] = useState(true);
    const [video, setVideo] = useState(0);
    const [modelLoaded, setModelLoaded] = useState(false);
    const [videoList, setVideoList] = useState<any[]>([]);

    console.log('홋시 뭐?');
    console.log('v3', videoList);
    // setTimeout(() => setVideo(video + 1), 10000);
    useEffect(() => {
        async function fetchData(): Promise<any> {
            const result = await axios({
                url: `http://${config.server.host}:${config.server.port}/camera/${userId}`,
                method: 'get',
            });
            return result;
        }
        fetchData()
            .then((result) => {
                console.log('v1', videoList);
                setVideoList(new Array(result.data));

                console.log('v2', videoList);
                // console.log(r);
                console.log(result.data);
                console.log('최근 24시간 내 저장된 영상 데이터 로드 성공');
            })
            .catch((err) => {
                console.log(err);
                console.log('최근 24시간 내 저장된 영상 데이터 로드 실패');
            });
    }, [video, videoList]);
    useEffect(() => {
        // 비디오
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
        // 업로드 된 이미지 이름을 배열에 담아 라벨링 합니다.
        const labels = [`${userId}`];
        // const labels: any[] = await loadUsim(userId);

        return Promise.all(
            labels.map(async (label) => {
                const images = await faceapi.fetchImage(require(`./imgs/${label}.jpg`));
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

            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.42);

            if (resizedDetections)
                resizedDetections.forEach((detection, i) => {
                    const matched = resizedDetections[i];
                    const box = matched.detection.box;
                    const showLabel = faceMatcher.findBestMatch(matched.descriptor).toString();
                    const label = faceMatcher.findBestMatch(matched.descriptor).label;
                    const labelColor = label === userId ? 'red' : 'blue';
                    const drawBox = new faceapi.draw.DrawBox(box, { boxColor: `${labelColor}`, label: showLabel });

                    drawBox.draw(canvas);

                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

                    const { neutral, ...otherDetection }: Record<string, any> = detection.expressions;

                    expression.value = Math.max(...Object.values(otherDetection));
                    expression.label = Object.keys(otherDetection).find((key) => otherDetection[key] === expression.value) || ''; // 현재 최대 수치 감정 종류 가져오기
                    expression.time = Date.now();
                });
            return expression;
        };

        const loop = async () => {
            const expressions = await faceDetecting(expression);
            if (!recordFlag && expressions.value > 0.96) {
                recordFlag = true;
                recordInfo = {
                    userId: userId,
                    maxValue: expressions.value,
                    label: expressions.label,
                    count: 1,
                    startTime: expressions.time,
                    maxTime: 0,
                };
                recentRecordTime = expressions.time; // 최근 감정 갱신 시간
                mediaRecorder.start();
                recordVideo(mediaRecorder); // 녹화시작
                console.log('녹화 시작');
            }
            // 감정 최대값 갱신
            else if (recordFlag && expression.value > 0.96 && expression.label === recordInfo.label) {
                recordInfo.maxValue = expression.value;
                recordInfo.maxTime = expressions.time - recordInfo.startTime;
                recentRecordTime = expression.time; // 최근 감정 갱신 시간
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
                    if (videoRef.current) await mediaRecorder.stop();
                    recordFlag = false;
                    recentRecordTime = 0;
                    setVideo(video + 1);
                    console.log('녹화 중지');
                } catch (err) {
                    console.log(err);
                }
            }
        }, 10000);
    };

    function handleDataAvailable(event: any) {
        const recordedChunks: any[] = [];
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
            if (camStarted === true) uploadToS3Bucket(recordInfo, recordedChunks);
            recordedChunks.pop();
        }
    }

    return (
        <div>
            <h2>Recording My DAY</h2>

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
                    {camStarted ? (
                        <video ref={videoRef} autoPlay muted onPlay={onPlay} width={constraints.video.width} height={constraints.video.height} />
                    ) : (
                        <Rotate>
                            <TbLoader size="50" style={{ padding: 0 }} />
                        </Rotate>
                    )}
                </div>
            </div>
            <div>
                <OnButton onClick={() => setCamStarted(true)}>ON</OnButton>
                <OffButton onClick={() => setCamStarted(false)}>OFF</OffButton>
            </div>
            <h2>최근 24시간 내에 저장된 영상</h2>
            <div>
                {videoList[0]?.map((videos: any) => (
                    <InteractiveCard properties={videos} />
                    // <div>{videos.cardId}</div>
                ))}
            </div>
        </div>
    );
}

export default WebCamPage;
