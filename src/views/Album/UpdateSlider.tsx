import React, { useCallback, Component, useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link, useNavigate, useParams } from 'react-router-dom';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import OutletIcon from '@mui/icons-material/Outlet';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import SickIcon from '@mui/icons-material/Sick';
import { inputClasses } from '@mui/material';

const userId = 'test';
const cardId = 21;

interface IProps {
    albumId: any;
    cardId: any;
    comment: any;
    createdAt: any;
    expressionLabel: any;
    thumbnailUrl: any;
    updatedAt: any;
    userId: any;
    videoUrl: any;
}

const UpdateSlider = () => {
    const naviagate = useNavigate();

    const { cardId } = useParams();

    const [emotion, setEmotion] = useState('');
    const [comment, setComment] = useState('');
    const [video, setVideo] = useState('');

    const [cardAlbum, setCardAlbum] = useState<IProps>({
        albumId: '',
        cardId: '',
        comment: '',
        createdAt: '',
        expressionLabel: '',
        thumbnailUrl: '',
        updatedAt: '',
        userId: '',
        videoUrl: '',
    });

    useEffect(() => {
        const getCard = async () => {
            const { data } = await axios.get(`http://localhost:4000/card/${userId}/${cardId}`);
            return data;
        };
        getCard().then((result) => {
            setComment(result.comment);
            setVideo(result.videoUrl);
            setEmotion(result.emotion);
        });
    }, []);

    const canSubmit = useCallback(() => {
        return comment !== '' && emotion !== '';
    }, [comment, video, emotion]);

    const handleSubmit = useCallback(async () => {
        try {
            const cardData = new FormData();
            cardData.append('comment', comment);
            cardData.append('emotion', emotion);
            await axios.put('card/cardId', cardData);
            window.location.href = `/card/${cardId}`;
        } catch (error) {
            console.log(error);
        }
    }, [canSubmit]);

    // get
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:4000/card/${userId}/${cardId}`,
        })
            .then(function (result) {
                setCardAlbum(result.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // put
    const onClickEdit = () => {
        const [inputs, setInputs] = useState({
            comment: '',
        });

        axios
            .put(`http://localhost:4000/card/${userId}/${cardId}`, {
                comment: inputs.comment,
            })
            .then((result) => {
                console.log(result);
                alert('수정이 완료되었습니다.');
            })
            .catch((error) => {
                console.log(error);
            });
    };

    // delete *** 단일페이지 책 표지로 돌아가게 설정할 것!!!
    const onClickDelete = () => {
        axios
            .delete(`http://localhost:4000/card/${userId}/${cardId}`, {
                data: {
                    cardId: cardId,
                },
            })
            .then(function (result) {
                console.log(result);
                console.log(cardId);
                window.location.reload();
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <div>
                <Link to={'/album/4'}>
                    <Slider {...settings}>
                        <div>
                            <h1>1</h1>

                            <div>
                                {canSubmit() ? <button onClick={handleSubmit}>수정하기</button> : <button>코멘트를 입력해주세요</button>}
                                <img
                                    src="./images/frame.png"
                                    height="500px"
                                    style={{ overflow: 'hideen', width: '100%', position: 'absolute' }}
                                ></img>
                                {/* <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img> */}
                                <video controls loop src={cardAlbum.videoUrl} width="600px" height="460px"></video>
                            </div>
                            <div>
                                <div
                                    style={{
                                        borderRadius: '5px',
                                        borderStyle: 'solid',
                                        borderColor: 'grey',
                                        width: '100px',
                                        marginTop: '50px',
                                    }}
                                >
                                    <InsertEmoticonIcon />
                                    {cardAlbum.expressionLabel}
                                </div>
                                <div style={{ textAlign: 'right' }}>
                                    <button type="button" onClick={onClickEdit}>
                                        update
                                    </button>
                                    <button style={{ textAlign: 'right' }} type="button" onClick={() => onClickDelete()}>
                                        delete
                                    </button>
                                </div>
                                <form>
                                    <label>comment</label>
                                    <input type="text" placeholder="leave you comment"></input>
                                    <br />
                                    {cardAlbum.comment}
                                </form>
                                <div>
                                    <button type="submit">등록</button>
                                </div>
                            </div>
                        </div>
                    </Slider>
                </Link>
            </div>
        </>
    );
};
export default UpdateSlider;
