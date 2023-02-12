/* eslint-disable */
import './index.css';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import * as faceapi from 'face-api.js';
import constraints from '../../common/constraints'; // CHECK

// TODO : any 체크하기

// 웹캠이 시작 중인지 확인
let camStart = false;

let recordFlag = false; // 녹화 중인지 아닌지
let recentRecordTime: number;
let recordInfo: { maxValue: any; label: any; count: number; startTime: any; maxTime: any };
let expression: { value: any; label: any; time: number } = { value: 0, label: '', time: 0 };

// 서버로 넘어가는 유저 아이디
const userId = 'test';

const RecordInit = () => {
    recordFlag = false;
    recentRecordTime = 0;
    recordInfo = { maxValue: undefined, label: undefined, count: 0, startTime: undefined, maxTime: undefined };
    expression = { value: undefined, label: undefined, time: 0 };
};

// 비디오 사이즈 설정
function WebCamPage() {
    const wrapRef = useRef<any>(null);
    const videoRef = useRef<any>(null);

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

        // 다운로드할 영상 변수 생성
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

        // 새로운 영상 객체 생성
        const mediaRecorder = new MediaRecorder(mediaStream);
        mediaRecorder.ondataavailable = handleDataAvailable;

        let displaySize = { width: constraints.video.width, height: constraints.video.height };
        // 영상 사이즈를 canvas에 맞추기 위한 설정
        if (videoRef.current) {
            displaySize = {
                width: videoRef.current.width,
                height: videoRef.current.height,
            };
        }
        // canvas 사이즈를 맞춤
        faceapi.matchDimensions(canvas, displaySize);

        // 로컬 대조 이미지 가져오기
        const labeledFaceDescriptors = await loadImage();

        // 안면 인식 부분
        const faceDetecting = async (expression: any) => {
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

            // canvas 초기화
            canvas.getContext('2d')?.clearRect(0, 0, canvas.width, canvas.height);

            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.42);

            if (resizedDetections)
                resizedDetections.forEach((detection, i) => {
                    const matched = resizedDetections[i];
                    const box = matched.detection.box;
                    const showLabel = faceMatcher.findBestMatch(matched.descriptor).toString();
                    const distance = faceMatcher.findBestMatch(matched.descriptor).distance;
                    const label = faceMatcher.findBestMatch(matched.descriptor).label;
                    const drawBox = new faceapi.draw.DrawBox(box, { label: showLabel });
                    drawBox.draw(canvas);

                    faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

                    // TODO
                    const { neutral, ...otherDetection }: Record<string, any> = detection.expressions;

                    expression.value = Math.max(...Object.values(otherDetection));
                    expression.label = Object.keys(otherDetection).find((key) => otherDetection[key] === expression.value); // 현재 최대 수치 감정 종류 가져오기
                    expression.time = Date.now();
                });
            return expression; // TODO
        };

        const loop = async () => {
            const expressions = await faceDetecting(expression);
            if (!recordFlag && expressions.value > 0.96) {
                recordFlag = true;
                recordInfo = {
                    maxValue: expressions.value,
                    label: expressions.label,
                    count: 1,
                    startTime: expressions.time,
                    maxTime: expressions.time,
                };
                recentRecordTime = expressions.time; // 최근 감정 갱신 시간
                mediaRecorder.start();
                recordVideo(mediaRecorder); // 녹화시작
                console.log('녹화시작');
            }
            // 감정 최대값 갱신
            else if (recordFlag && expression.value > 0.96 && expression.label === recordInfo.label) {
                recordInfo.maxValue = expression.value;
                recentRecordTime = expression.time; // 최근 감정 갱신 시간
            }
            setTimeout(loop, 0.03);
        };
        setTimeout(loop, 0.03);
    };

    const recordVideo = async (mediaRecorder: MediaRecorder) => {
        setTimeout(function () {
            if (recordInfo.count <= 5 && Date.now() - recentRecordTime < 2000) {
                // 2초 이내 감정 갱신시, 시간 추가
                console.log('녹화 연장');
                recordInfo.count++; // 시간 연장 횟수 (최대 1분까지만 저장되게 구현)
                recordVideo(mediaRecorder);
            } else {
                try {
                    mediaRecorder.stop();
                    RecordInit();
                    console.log('녹화중지');
                } catch (err) {
                    console.log(err);
                }
            }
        }, 10000);
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
            .then((stream) => {
                if (videoRef.current) videoRef.current.srcObject = stream;
            })
            .catch((err) => console.error(err));

        console.log('영상 시작');
    };

    // 모델에 따른 얼굴 감지 중지
    const stopDetecting = async () => {
        if (camStart === true) {
            setModelsLoaded(false);
            camStart = false;

            setIsStartDetect(false);

            navigator.mediaDevices
                .getUserMedia(constraints)
                .then((stream) => {
                    if (videoRef.current) videoRef.current.srcObject = null;
                })
                .catch((err) => console.error(err));
        }

        console.log('영상 중지');
    };

    // 다운로드 된 영상을 배열로 저장
    const recordedChunks: any[] = [];

    function handleDataAvailable(event: any) {
        if (event.data.size > 0) {
            // 새로운 영상을 저장하면 배열에 push
            // recordedChunks.push(event.data);

            download();
            // 다운로드가 끝나면 다음 영상 다운으로 위해 배열에서 pop
            // recordedChunks.pop();
        }
    }

    function download() {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        // a.style = 'display: none';
        a.href = url;
        a.download = 'test.webm';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // function uploadToS3Bucket() {
    // 녹화 영상 저장 이름 조합
    //    recordSave = `${currentTime}`;

    //    const file = new File(recordedChunks, `${recordSave}.webm`);

    //    const formData = new FormData();
    //    const expressionData = {
    //        user_id: userId,
    //        expression: startExpression,
    //        accuracy: recordExpressionMaxValue,
    //        time: recordExpressionMaxtime,
    //    };

    //     formData.append('file', file);
    //     formData.append('expressionData', JSON.stringify(expressionData));

    //     axios({
    //         url: `http://localhost:4000/camera?userId=${userId}`,
    //         method: 'post',
    //         data: formData,
    //         headers: {
    //             'Content-Type': 'multipart/form-data',
    //         },
    //     })
    //         .then(function (result) {
    //             // console.log(result.data[0]);
    //             console.log('파일 전송 성공');
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //             console.log('파일 전송 실패');
    //         });
    // }

    return (
        <div>
            <h2>Face-Api Video Test</h2>
            <ul>
                <li>model loaded: {modelsLoaded.toString()}</li>
            </ul>
            {wrapRef !== undefined && (
                <div ref={wrapRef} id="wrap">
                    <video ref={videoRef} autoPlay muted onPlay={onPlay} width={constraints.video.width} height={constraints.video.height} />
                </div>
            )}

            <button onClick={startDetecting}>영상 시작</button>

            <button onClick={stopDetecting}>영상 중지</button>
        </div>
    );
}

export default WebCamPage;
