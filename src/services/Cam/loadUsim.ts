import axios from 'axios';
import config from '../../config';

export default (userId: string): any[] => {
    const resultUrls: any[] = [];
    axios({
        url: `http://${config.server.host}:${config.server.port}/camera/usim/${userId}`,
        method: 'get',
    })
        .then(function (result) {
            result.data.forEach((element: any) => {
                resultUrls.push(element.userImgUrl);
            });

            console.log('이미지 로드 성공');
        })
        .catch(function (error) {
            console.log(error);
            console.log('이미지 로드 실패');
        });
    return resultUrls;
};
