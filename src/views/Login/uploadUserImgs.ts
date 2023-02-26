import axios from 'axios';
import config from '../../config';

export default (imgs: File[]) => {
    // 녹화 영상 저장 이름 조합

    const formData = new FormData();
    // const file1 = new File(imgs[0].size, imgs[0].name);
    // const file2 = new File(imgs[1].size, imgs[1].name);
    // const file3 = new File(imgs[2].size, imgs[2].name);

    formData.append('imgs', imgs[0]);
    formData.append('imgs', imgs[1]);
    formData.append('imgs', imgs[2]);

    console.log(formData);

    axios({
        url: `http://${config.server.host}:${config.server.port}/usim`,
        method: 'post',
        withCredentials: true,
        data: formData,
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    })
        .then(function (result) {
            console.log(result.data[0]);
            console.log('파일 전송 성공');
        })
        .catch(function (error) {
            console.log(error);
            console.log('파일 전송 실패');
        });
};
