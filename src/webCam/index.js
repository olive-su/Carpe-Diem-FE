import './index.css';
import React, { useEffect, useRef, useState } from 'react';
import * as faceapi from 'face-api.js';

const MODEL_URL = '/models';
var flag = false;
var camStart = false;

// 비디오 사이즈 설정
const constraints = {
    video: {
        width: 640,
        height: 480,
    },
    audio: false,
};


function WebCamPage() {
    const wrapRef = useRef(null);
    const videoRef = useRef(null);

    const [isStartDetect, setIsStartDetect] = useState(false);
    const [modelsLoaded, setModelsLoaded] = useState(false);

    // 라벨링 할 인물 이미지 로컬에서 가져오기
    const loadImage = async () => {
        // 업로드 된 이미지 이름을 배열에 담아 라벨링 합니다.
        const labels = ["test"];

        return Promise.all(
            labels.map(async (label) => {
                const images = await faceapi.fetchImage(require(`./imgs/${label}.jpg`));
                const descriptions = [];
                const detections = await faceapi
                    .detectSingleFace(images)
                    .withFaceLandmarks()
                    .withFaceDescriptor();
                descriptions.push(detections.descriptor);

                return new faceapi.LabeledFaceDescriptors(label, descriptions);
            })
        );
    };

    // 감정 인식 & 영상 다운로드
    const onPlay = async () => {
        // 이미지 정보를 기반으로 canvas 요소 생성
        const canvas = faceapi.createCanvasFromMedia(videoRef.current);
        wrapRef.current.append(canvas);

        // 다운로드할 영상 변수 생성
        const mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });

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

            const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

            resizedDetections.forEach((detection, i) => {
                const matched = resizedDetections[i];
                const box = matched.detection.box;
                const label = faceMatcher.findBestMatch(matched.descriptor).toString();
                const drawBox = new faceapi.draw.DrawBox(box, { label: label });
                drawBox.draw(canvas);
                // 기본 안면 인식 테두리, 겹치므로 제외
                // faceapi.draw.drawDetections(canvas, resizedDetections);
                // 감정 읽기
                faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
                var count = Math.max(
                    detection.expressions.angry,
                    detection.expressions.happy,
                    detection.expressions.sad,
                    detection.expressions.surprised,
                );

                // 조건에 따라 영상 녹화 시작
                if (count > 0.98 && flag == false) {
                    alert('녹화 시작!');
                    flag = true;
                    mediaRecorder.start();
                    setTimeout(() => {
                        console.log('stopping');
                        mediaRecorder.stop();
                        alert('녹화 종료!');
                        flag = false
                    }, 9000);
                }
            });
        };

        const loop = () => {
            faceDetecting();
            setTimeout(loop, 0.03);
        };
        setTimeout(loop, 0.03);
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
                if (camStart == false) {
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

        console.log("영상 시작");
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

        console.log("영상 중지");
    };

    // 다운로드 된 영상을 배열로 저장
    const recordedChunks = [];

    function handleDataAvailable(event) {
        console.log('data-available');
        if (event.data.size > 0) {
            // 새로운 영상을 저장하면 배열에 push
            recordedChunks.push(event.data);
            // 다운로드 실행
            download();
            // 다운로드가 끝나면 다음 영상 다운으로 위해 배열에서 pop
            recordedChunks.pop();
        }
    }

    // 다운로드를 위한 함수
    function download() {
        const blob = new Blob(recordedChunks, {
            type: 'video/webm',
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        document.body.appendChild(a);
        a.style = 'display: none';
        a.href = url;
        a.download = 'test.webm';
        a.click();
        window.URL.revokeObjectURL(url);
    }

    return (
        <div>
            <h2>Face-Api Video Test</h2>
            <ul>
                <li>model loaded: {modelsLoaded.toString()}</li>
            </ul>

            <div ref={wrapRef} id="wrap">
                <video ref={videoRef} autoPlay muted onPlay={onPlay} width={640} height={480} />
            </div>

            <button onClick={startDetecting}>영상 시작</button>

            <button onClick={stopDetecting}>영상 중지</button>
        </div>
    );
}

export default WebCamPage;