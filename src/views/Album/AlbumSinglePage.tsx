import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import { useParams } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import axios from 'axios';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import OutletIcon from '@mui/icons-material/Outlet';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import SickIcon from '@mui/icons-material/Sick';
import config from '../../config';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-regular-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';

const userId = 'test';

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

const AlbumSinglePage = () => {
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

    const emotionType: any = (): any => {
        if (cardAlbum.expressionLabel == 'happy') {
            return <InsertEmoticonIcon />;
        } else if (cardAlbum.expressionLabel == 'angry') {
            return <LocalFireDepartmentIcon />;
        } else if (cardAlbum.expressionLabel == 'fearful') {
            return <SentimentVeryDissatisfiedRoundedIcon />;
        } else if (cardAlbum.expressionLabel == 'surprised') {
            return <OutletIcon />;
        } else if (cardAlbum.expressionLabel == 'sad') {
            return <SentimentDissatisfiedIcon />;
        } else if (cardAlbum.expressionLabel == 'disgusted') {
            return <SickIcon />;
        }
    };

    const { cardId } = useParams();
    console.log(cardId);

    // put
    const ref: any = useRef(null);
    const [text, setText] = useState(cardAlbum.comment);
    const [editable, setEditable] = useState(false);

    const editOn = () => {
        setEditable(true);
        setText(cardAlbum.comment);
    };

    const handleChange = (e: any) => {
        setText(e.target.value);
    };
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setEditable(!editable);
            cardAlbum.comment = text;

            axios
                .put(`http://localhost:4000/card/${userId}/${cardId}`, {
                    // card_id: cardAlbum.cardId,
                    // user_id: cardAlbum.userId,
                    album_id: cardAlbum.albumId,
                    expression_label: cardAlbum.expressionLabel,
                    comment: text,
                    thumbnail_url: cardAlbum.thumbnailUrl,
                    video_url: cardAlbum.videoUrl,
                })
                .then(function (result) {
                    console.log(result);
                    // window.location.reload();
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    const handleClickOutside = (e: any) => {
        if (editable === true && !ref.current.contains(e.target)) setEditable(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside, true);
    });

    // get
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:4000/card/${userId}/${cardId}`,
        })
            .then(function (result) {
                setCardAlbum(result.data);
                emotionType();
            })
            .catch(function (error) {
                console.log(error);
            });
    }, []);

    // delete
    const onClickDelete = () => {
        axios
            .delete(`http://localhost:4000/card/${userId}/${cardId}`, {})
            .then(function (response) {
                console.log(response.status);
                window.location.replace(`http://localhost:3000/video`);
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
                <Slider {...settings}>
                    <div>
                        <h1>1</h1>

                        <div>
                            <img src="./images/frame.png" height="500px" style={{ overflow: 'hideen', width: '100%', position: 'absolute' }}></img>
                            <video
                                controls
                                loop
                                src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${cardAlbum.videoUrl}`}
                                width="600px"
                                height="460px"
                            ></video>
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
                                {emotionType()}
                                {cardAlbum.expressionLabel}
                            </div>
                            <div style={{ textAlign: 'right', padding: '10px' }}>
                                <button
                                    type="button"
                                    onClick={editOn}
                                    style={{
                                        outline: 'none',
                                        borderRadius: '50%',
                                        border: '1.5px solid #221718',
                                        boxShadow: '3px 3px 1px gray',
                                        borderColor: 'black',
                                        backgroundColor: 'white',
                                        color: 'whitesmoke',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faEdit} size="lg" style={{ color: '#1d1d1d' }} />
                                </button>

                                <button
                                    onClick={onClickDelete}
                                    style={{
                                        outline: 'none',
                                        borderRadius: '50%',
                                        border: '1.5px solid #221718',
                                        boxShadow: '3px 3px 1px gray',
                                        borderColor: 'black',
                                        backgroundColor: 'white',
                                        color: 'whitesmoke',
                                        margin: '10px',
                                    }}
                                >
                                    <FontAwesomeIcon icon={faTrashAlt} size="lg" style={{ color: '#1d1d1d' }} />
                                </button>
                            </div>

                            <div>
                                comment
                                <br />
                                {cardAlbum.comment}
                            </div>
                            {editable ? (
                                <div>
                                    <form>
                                        <input
                                            type="text"
                                            value={text}
                                            onChange={(e) => handleChange(e)}
                                            onKeyDown={handleKeyDown}
                                            style={{
                                                outline: 'none',
                                                borderRadius: '30px',
                                                border: '1.5px solid #221718',
                                                fontSize: '16px',
                                                boxShadow: '3px 3px 1px gray',
                                                paddingLeft: '10px',
                                                marginBottom: '20px',
                                            }}
                                        />
                                        {/* <label>
                                            <FontAwesomeIcon
                                                icon={faPaperPlane}
                                                size="lg"
                                                style={{
                                                    outline: 'none',
                                                    borderRadius: '50%',
                                                    border: '1.5px solid #221718',
                                                    boxShadow: '3px 3px 1px gray',
                                                    borderColor: 'black',
                                                    backgroundColor: 'white',
                                                    color: 'black',
                                                }}
                                            />
                                        </label> */}
                                    </form>{' '}
                                </div>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>
                </Slider>
            </div>
        </>
    );
};
export default AlbumSinglePage;
