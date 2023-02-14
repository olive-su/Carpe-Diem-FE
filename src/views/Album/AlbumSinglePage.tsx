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
                    data: {
                        // card_id: cardAlbum.cardId,
                        // user_id: cardAlbum.userId,
                        album_id: cardAlbum.albumId,
                        expression_label: cardAlbum.expressionLabel,
                        comment: text,
                        thumbnail_url: cardAlbum.thumbnailUrl,
                        video_url: cardAlbum.videoUrl,
                    },
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
    console.log(`http://localhost:4000/card/${userId}/${cardId}`);
    // get
    useEffect(() => {
        axios({
            method: 'get',
            url: `http://localhost:4000/card/${userId}/${cardId}`,
        })
            .then(function (result) {
                console.log('Sssssssss');
                setCardAlbum(result.data);
            })
            .catch(function (error) {
                console.log('ffffffff');
                console.log(error);
            });
    }, []);

    // delete
    const onClickDelete = () => {
        axios
            .delete(`http://localhost:4000/card/${userId}/${cardId}`, {
                data: {},
            })
            .then(function (response) {
                console.log(response.status);
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
                <Slider {...settings}>
                    <div>
                        <h1>1</h1>

                        <div>
                            <img src="./images/frame.png" height="500px" style={{ overflow: 'hideen', width: '100%', position: 'absolute' }}></img>
                            {/* <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img> */}
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
                                <InsertEmoticonIcon />
                                {cardAlbum.expressionLabel}
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <button type="button" onClick={editOn}>
                                    update
                                </button>
                                <button onClick={onClickDelete}>delete</button>
                            </div>

                            <div>
                                comment
                                <br />
                                {cardAlbum.comment}
                            </div>
                            {editable ? (
                                <div>
                                    <input type="text" value={text} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />{' '}
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

// export default class AlbumSlider extends Component {
//     render() {
//         const settings = {
//             dots: true,
//             infinite: true,
//             speed: 500,
//             slidesToShow: 1,
//             slidesToScroll: 1
//         };
//         return (
//             <>
//                 <div>
//                     <h2>What Did I Do For a Week</h2>
//                     <Slider {...settings}>
//                         <div>
//                             <h3>1</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                             <div style={{ textAlign: 'right', justifyContent: 'bottom', marginTop: '80px' }}>
//                                 {/*
//                                 switch (emotion) {
//                                     case 'Happy':
//                                         print(<InsertEmoticonIcon />)
//                                         break;
//                                     case 'Sad':
//                                         print(<SentimentDissatisfiedIcon />)
//                                         break;
//                                     case 'Angry':
//                                         print(LocalFireDepartmentIcon />)
//                                         break;
//                                     case 'Disgusted':
//                                         print(<SickIcon />)
//                                         break;
//                                     case 'Fearful':
//                                         print(<SentimentVeryDissatisfiedRoundedIcon />)
//                                         break;
//                                     case 'Surprised':
//                                         print(<OutletIcon />)
//                                         break;
//                                 }
//                                 */}

//                             </div>
//                             <br />
//                             <div>
//                                 <div style={{ border: '1px solid black', height: '300px', width: '200px', float: 'right' }}>
//                                     comment

//                                 </div>
//                             </div>
//                         </div>

//                         <div>
//                             <h3>2</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                         </div>
//                         <div>
//                             <h3>3</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                         </div>
//                         <div>
//                             <h3>4</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                         </div>
//                         <div>
//                             <h3>5</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                         </div>
//                         <div>
//                             <h3>6</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                         </div>
//                         <div>
//                             <h3>7</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                         </div>
//                         <div>
//                             <h3>8</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                         </div>
//                         <div>
//                             <h3>9</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                         </div>
//                         <div>
//                             <h3>10</h3>
//                             <img src="./images/frame.png" height="600px" style={{ float: 'left', clear: 'both' }}></img>
//                         </div>
//                     </Slider>
//                 </div >
//             </>
//         );
//     }
// }
