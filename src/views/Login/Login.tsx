import React from 'react';
import axios from 'axios';
import config from '../../config';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
//리액트 버전 16에 의존해서 npm install --legacy-peer-deps로 다운받음
//마치 6버전 이하에서 동작하던 것 처럼 peerDependencies를 무시함
import jwt_decode from 'jwt-decode';
import { Button } from '@mui/material';
const authData = {
    email: 'ekjlwj@gmail.com',
    password: '1111111', //소스 코드 바깥쪽으로 빼내기 + 비밀번호 암호화
    nickname: 'esfssf',
};
const LoginSuccess = (result: any) => {
    const email = result.email;
    const name = result.name;
    console.log(email, name);
    axios
        .post(`http://${config.server.host}:${config.server.port}/user/google`, {
            name: name,
            email: email,
        })
        .then(function (response) {
            console.log(response);
            window.location.href = '/';
        })
        .catch(function (error) {
            console.log('error', error);
        });
};
const Login = () => {
    return (
        // <GoogleOAuthProvider clientId={`${process.env.REACT_APP_GOOGLE_ID2}`}>
        //     <GoogleLogin
        //         onSuccess={(credentialResponse: any) => {
        //             const decoding = jwt_decode(credentialResponse.credential);
        //             console.log(decoding);
        //             LoginSuccess(decoding);
        //             // 해당 부분은 후에 들어오는 토큰에 대해서 디코딩 하는 부분이다. // const decodeding = jwt_decode(credentialResponse.credential);
        //         }}
        //         onError={() => {
        //             console.log('Login Failed');
        //         }}
        //     />
        // </GoogleOAuthProvider>
        <Button
            onClick={() => {
                window.location.href = 'http://localhost:4000/auth/google';
            }}
        >
            SignIn with Google
        </Button>
    );
};
// import React, { useCallback } from 'react';
// import { GoogleLoginButton } from 'react-social-login-buttons';
// import axios from 'axios';
// import config from '../../config';
// import { Tooltip } from 'antd';
// const GoogleLoginBtn = () => {
//     const onClickGoogleLogin = () => {
//         axios({
//             method: 'get',
//             url: `http://localhost:4000/user/google`,
//         })
//             .then(function (result) {
//                 console.log(result);
//             })
//             .catch(function (error) {
//                 console.log(`http://${config.server.host}:${config.server.port}/user/google`);
//                 console.error('google 에러발생: ', error);
//             });
//     };
//     return <GoogleLoginButton onClick={onClickGoogleLogin} align="center" text="Google" />;
// };

// export default GoogleLoginBtn;

// import GoogleLoginOuter from 'react-google-login';
// import axios from 'axios';
// import { Route } from 'react-router-dom';
// import React from 'react';
// const Login = () => {
//     const GoogleLoginTrigger = async (response: any) => {
//         axios.post('/oauth/google/login', { data: response }).then((res) => {
//             if (res.data.loginSuccess) {
//                 //Cookie.set("cineps_auth", res.data.token);
//                 // 로그인 성공하면 자동 홈으로 이동 처리함.
//                 window.location.href = '/';
//             } else {
//                 // 오류 발생시 처리할 곳
//                 alert('실패');
//                 window.location.href = '/login';
//             }
//         });
//     };
//     return (
//         <>
//             <GoogleLoginOuter
//                 clientId={`${process.env.REACT_APP_GOOGLE_ID2}`}
//                 onSuccess={GoogleLoginTrigger}
//                 render={(renderProps) => (
//                     <button onClick={renderProps.onClick} disabled={renderProps.disabled}>
//                         <img src={'/googleLogo.png'} alt="google"></img>
//                         <span style={{ marginLeft: '0.5em' }}>Google로 로그인하기</span>
//                     </button>
//                 )}
//             ></GoogleLoginOuter>
//         </>
//     );
// };
export default Login;
