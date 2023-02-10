/* eslint-disable */
import './index.css';
import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import * as faceapi from 'face-api.js';
import sstyled, { keyframes } from 'styled-components';
import { TbLoader } from 'react-icons/tb';

// 녹화 확인 flag
let recordFlag = false;
// 웹캠이 시작 중인지 확인
let camStart = false;

// 녹화를 시작한 시간들을 모두 초로 변경
let startAllTime;
// 현재 시간들을 모두 초로 변경
let nowAllTime;

// 시스템 시간 계산 변수값
let calSysTime;

// 녹화할 시간
let recordTime = 10000;
// 녹화 시작을 위한 최소 감정 값
let recordExpressionValue = 0.96;

// 녹화 시작시 감정
let startExpression = 'natural';
// 녹화 시작시 감정 수치
let startExpressionValue;
// 현재 감정
let nowExpression = 'natural';
// 현재 감정 수치
let nowExpressionValue;

// 반복 감정 횟수
let expressionCnt = 0;
// 반복 녹화 횟수
let recordCnt = 0;

// 시, 분, 초
let hour = 0;
let minute = 0;
let second = 0;

// 현재 시간
let currentTime = 0;
// 녹화 영상 저장 이름
let recordSave = '';

// 서버로 넘어가는 유저 아이디
let userId = 'HSH';
// 녹화중 가장 높았던 감정 수치
let recordExpressionMaxValue = 0;
// 녹화중 가장 높았던 감정 수치의 시간
let recordExpressionMaxtime = 0;

// 비디오 사이즈 설정
const constraints = {
    video: {
        width: 640,
        height: 480,
    },
    audio: false,
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Rotate = sstyled.div`
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
  padding: 2rem 1rem;
  font-size: 1.2rem;
`;

const OnButton = styled.button`
    color: #8A1441;
    font-size: 1em;
    width:80px;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #8A1441;
    border-radius: 3px;
    font-family:GangwonEduPowerExtraBoldA;
    &:active,
    &:hover,
    &:focus {
        background: var(--button-hover-bg-color, white);
    }
`
const OffButton = styled.button`
    color: #2679CC;
    font-size: 1em;
    width:80px;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid #2679CC;
    font-family:GangwonEduPowerExtraBoldA;
    border-radius: 3px;
    &:active,
    &:hover,
    &:focus {
        background: var(--button-hover-bg-color, white);
    }
`


function WebCamPage() {
    const wrapRef = useRef(null);
    const videoRef = useRef(null);

    const [isStartDetect, setIsStartDetect] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);

    // 라벨링 할 인물 이미지 로컬에서 가져오기
    const loadImage = async () => {
        // 업로드 된 이미지 이름을 배열에 담아 라벨링 합니다.
        const labels = [`${userId}`];

        return Promise.all(
            labels.map(async (label) => {
                const images = await faceapi.fetchImage(require(`./imgs/${label}.jpg`));
                const descriptions = [];
                const detections = await faceapi.detectSingleFace(images).withFaceLandmarks().withFaceDescriptor();
                descriptions.push(detections.descriptor);

                return new faceapi.LabeledFaceDescriptors(label, descriptions);
            }),
        );
    };

    // 감정 인식 & 영상 다운로드
    const onPlay = async () => {
        // 이미지 정보를 기반으로 canvas 요소 생성
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        wrapRef.current.append(canvas);

        // 다운로드할 영상 변수 생성
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // 새로운 영상 객체 생성
        const mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.ondataavailable = handleDataAvailable;

        // 영상 사이즈를 canvas에 맞추기 위한 설정
        const displaySize = {
            width: videoRef.current.width,
            height: videoRef.current.height,
        };

        // canvas 사이즈를 맞춤
        faceapi.matchDimensions(canvas, displaySize);

        // 로컬 대조 이미지 가져오기
        const labeledFaceDescriptors = await loadImage();

        // 안면 인식 부분
        const faceDetecting = async () => {
            const detections = await faceapi
                .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
                .withFaceLandmarks()
                .withFaceExpressions()
                .withAgeAndGender()
                .withFaceDescriptors();

            const resizedDetections = faceapi.resizeResults(detections, displaySize);

            // canvas 초기화
            canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.42);

            resizedDetections.forEach((detection, i) => {
                const matched = resizedDetections[i];
                const box = matched.detection.box;
                const showLabel = faceMatcher.findBestMatch(matched.descriptor).toString();
                const distance = faceMatcher.findBestMatch(matched.descriptor).distance;
                const label = faceMatcher.findBestMatch(matched.descriptor).label;
                const drawBox = new faceapi.draw.DrawBox(box, { label: showLabel });
                drawBox.draw(canvas);
                // 기본 안면 인식 테두리, 겹치므로 제외
                // faceapi.draw.drawDetections(canvas, resizedDetections);
                // 감정 읽기
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

                // 감정 최대 수치 가져오기
                nowExpressionValue = Math.max(
                    detection.expressions.angry,
                    detection.expressions.disgusted,
                    detection.expressions.fearful,
                    detection.expressions.happy,
                    detection.expressions.sad,
                    detection.expressions.surprised,
                );

                // 현재 최대 수치 감정 종류 가져오기
                nowExpression = Object.keys(detection.expressions).find((key) => detection.expressions[key] === nowExpressionValue);

                nowAllTime = Date.now();

                calSysTime = nowAllTime - startAllTime;

                // 녹화 중일때만 감정 수치를 수집
                if (recordFlag === true) {
                    // 최대 감정 수치가 현재 감정 수치보다 작은 경우 최대 감정 수치와 시간 갱신
                    if (recordExpressionMaxValue < nowExpressionValue) {
                        recordExpressionMaxValue = nowExpressionValue;
                        recordExpressionMaxtime = calSysTime;
                    }
                }
                // console.log(recordExpressionMaxValue, recordExpressionMaxtime);

                // 녹화 시간 늘리기
                // 녹화중 조건 같은 감정으로 3번 이상 들어온 경우 최대 3번까지 녹화 길이를 늘림
                if (nowExpression === startExpression && nowExpressionValue > recordExpressionValue && recordFlag === true && distance < 0.4) {
                    expressionCnt++;

                    if (expressionCnt > 3 && calSysTime < recordTime && recordCnt < 3) {
                        console.log('녹화 시간 추가');
                        expressionCnt = 0;
                        recordTime += 8000;
                        recordCnt++;
                    }
                }

                // 조건에 따라 영상 녹화 중지
                if (calSysTime >= recordTime && recordFlag === true) {
                    setTimeout(() => {
                        try {
                            mediaRecorder.stop();
                        } catch (err) {
                            console.log(err);
                        }

                        console.log('녹화 종료!');

                        recordFlag = false;
                        expressionCnt = 0;
                        recordCnt = 0;
                        recordTime = 10000;
                    }, recordTime - 9000);
                }

                // 조건에 따라 영상 녹화 시작
                if (nowExpressionValue > recordExpressionValue && recordFlag === false && label === 'HSH') {
                    // 녹화 시작전에 최대 감정 값과 시간 초기화
                    recordExpressionMaxValue = 0;
                    recordExpressionMaxtime = 0;

                    recordFlag = true;
                    console.log('녹화 시작!');

                    startExpressionValue = nowExpressionValue;
                    startExpression = Object.keys(detection.expressions).find((key) => detection.expressions[key] === startExpressionValue);

                    mediaRecorder.start();

                    startAllTime = Date.now();

                    // 녹화 시작시의 감정 수치도 들어가야 하므로 추가
                    recordExpressionMaxValue = nowExpressionValue;
                    // recordExpressionMaxtime = nowAllTime - startAllTime;

                    // 현재 날짜와 시간을 받아오기
                    let now = new Date();

                    // 시간 조합
                    hour = now.getHours();
                    if (hour < 10) {
                        hour = '0' + hour;
                    }
                    minute = now.getMinutes();
                    if (minute < 10) {
                        minute = '0' + minute;
                    }
                    second = now.getSeconds();
                    if (second < 10) {
                        second = '0' + second;
                    }
                    currentTime = String(hour) + ':' + String(minute) + ':' + String(second);
                    console.log(currentTime);
                }
                // console.log(calSysTime);
            });
        };

        const loop = () => {
            faceDetecting();
            setTimeout(loop, 1000.0);
        };
        setTimeout(loop, 1000.0);
    };

    // 모델에 따른 얼굴 감지 시작
    const startDetecting = async () => {
        // model load
        const loadModels = async () => {
            const MODEL_URL = '/models';

            Promise.all([
                faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
                faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
                faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
                faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
                // video 에서 로드된 이미지 매칭 시 아래 모델이 필요 함.
                faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
                faceapi.nets.ageGenderNet.loadFromUri(MODEL_URL),
            ]).then(() => {
                setModelsLoaded(true);
                if (camStart === false) {
                    camStart = true;
                    startVideo();
                }
            });
        };

        loadModels();
    };

    // 영상 권한 요청
    const startVideo = () => {
        setIsStartDetect(true);

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => (videoRef.current.srcObject = stream))
            .catch((err) => console.error(err));

        console.log('영상 시작');
    };

    // 모델에 따른 얼굴 감지 중지
    const stopDetecting = async () => {
        setModelsLoaded(false);
        camStart = false;

        setIsStartDetect(false);

        navigator.mediaDevices
            .getUserMedia(constraints)
            .then((stream) => (videoRef.current.srcObject = null))
            .catch((err) => console.error(err));

        console.log('영상 중지');
    };

    // 다운로드 된 영상을 배열로 저장
    const recordedChunks = [];

    function handleDataAvailable(event) {
        if (event.data.size > 0) {
            // 새로운 영상을 저장하면 배열에 push
            recordedChunks.push(event.data);

            uploadToS3Bucket();
            // 다운로드가 끝나면 다음 영상 다운으로 위해 배열에서 pop
            recordedChunks.pop();
        }
    }

    function uploadToS3Bucket() {
        // 녹화 영상 저장 이름 조합
        recordSave = `${currentTime}`;

        const file = new File(recordedChunks, `${recordSave}.webm`);

        const formData = new FormData();
        const expressionData = {
            user_id: userId,
            expression: startExpression,
            accuracy: recordExpressionMaxValue,
            time: recordExpressionMaxtime,
        };

        formData.append('file', file);
        formData.append('expressionData', JSON.stringify(expressionData));

        axios({
            url: `http://localhost:4000/camera?userId=${userId}`,
            method: 'post',
            data: formData,
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(function (result) {
                // console.log(result.data[0]);
                console.log('파일 전송 성공');
            })
            .catch(function (error) {
                console.log(error);
                console.log('파일 전송 실패');
            });
    }

    return (
        <div>
            <h2>Recording My DAY </h2>

            <div ref={wrapRef} id="wrap" style={{ borderStyle: 'none' }}>
                <div>
                    {
                        camStart
                            ?
                            ''
                            :
                            <Rotate><TbLoader size='50' padding='0' /> </Rotate>
                    }
                </div>
                < video ref={videoRef} autoPlay muted onPlay={onPlay} width={640} height={480} />
            </div>
            < div>
                <OnButton onClick={startDetecting}>
                    ON
                </OnButton>
                < OffButton onClick={stopDetecting} >
                    OFF
                </OffButton>
            </div>
        </div>
    );
}

export default WebCamPage;
