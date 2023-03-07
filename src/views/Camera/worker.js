//!!!!!1차 시도 ver
// self.onmessage = function (e) {
//     let delay = e.data;
//     let timer = setTimeout(() => {
//         self.postMessage('null이래');
//         clearTimeout(timer);
//     }, delay);
// };

//!!!!! 2차 시도 ver
onmessage = function (e) {
    const { mediaRecorder, recentRecordTime, count } = e.data;
    setTimeout(() => {
        if (count <= 5 && Date.now() - recentRecordTime < 2000) {
            // 2초 이내 감정 갱신시, 시간 추가
            console.log('녹화 연장');
            postMessage({ type: 'extend' });
        } else {
            try {
                if (mediaRecorder) {
                    mediaRecorder.stop();
                    postMessage({ type: 'stop' });
                }
            } catch (err) {
                console.log(err);
                postMessage({ type: 'error', error: err });
            }
        }
    }, 15000);
};
