/* eslint-disable react/jsx-key */
import React, { useState, useEffect, useRef } from 'react';
import config from '../../config';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ALBUM_LOADING_REQUEST } from '../../redux/types';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination } from 'swiper';
import AlbumCarousel from './SingleAlbumCarousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import './StyleSingleAlbum.css';

const SingleAlbum = () => {
    const dispatch = useDispatch();
    const { albumId } = useParams();
    const { album } = useSelector((state: any) => state.album);

    useEffect(() => {
        dispatch({
            type: ALBUM_LOADING_REQUEST,
            payload: albumId,
        });
    }, [dispatch]);
    // const [cover, setCover] = useState('');
    // const getCoverImg = (img: any) => {
    //     setCover(img);
    //     console.log(album);
    // };

    return (
        <>
            <Swiper
                className="mySwiper"
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={'auto'}
                coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                autoplay={{
                    delay: 500,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[EffectCoverflow, Pagination]}
            >
                <SwiperSlide>
                    <div>
                        <img
                            src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${album.coverImgUrl}`}
                            style={{
                                margin: '70px auto',
                                height: '15rem',
                                width: '15rem',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                boxShadow: '0 0 0 1rem rgba(255,255,255,0.2)',
                            }}
                        />
                        <div style={{ textAlign: 'center', fontSize: '30px' }}>Title : {album.title}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <button
                            type="button"
                            // onClick={editOn}
                            style={{
                                borderRadius: '50%',
                                border: '1.5px solid #333',
                                boxShadow: '3px 3px 1px gray',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                marginLeft: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faEdit} size="lg" style={{ color: '#1d1d1d' }} />
                        </button>

                        <button
                            // onClick={handleOpen}
                            style={{
                                borderRadius: '50%',
                                border: '1.5px solid #333',
                                boxShadow: '3px 3px 1px gray',
                                backgroundColor: 'rgba(255, 255, 255, 0.5)',
                                marginLeft: '10px',
                            }}
                        >
                            <FontAwesomeIcon icon={faTrashAlt} size="lg" />
                        </button>
                    </div>
                </SwiperSlide>

                {album.cardId?.map((cardId: any) => {
                    return (
                        <SwiperSlide key={cardId}>
                            <AlbumCarousel key={cardId} cardInfo={cardId} />
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export default SingleAlbum;
