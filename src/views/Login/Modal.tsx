import React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import SwipeableViews from 'react-swipeable-views';
import ImageUploader from 'react-images-upload';
import config from '../../config';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
    {
        label: 'San Francisco – Oakland Bay Bridge, United States',
        imgPath: './imgs/01.svg',
        text: `<Span style="font-size: 15pt; color: #6C63FF;">찰나의 순간</Span>을 기록하지 못해서<br> <Span style="font-size: 15pt; color: #6C63FF;">후회</span>하신 적 있지 않으신가요?`,
    },
    {
        label: 'Bird',
        imgPath: './imgs/02.svg',
        text: '사용자의 <Span style="font-size: 15pt; color: #6C63FF;">얼굴과 표정</span>을 디텍팅하여<br> 의미있는 순간을 <Span style="font-size: 15pt; color: #6C63FF;">짧은 비디오</span>로<br> 만들어드립니다.',
    },
    {
        label: 'Bali, Indonesia',
        imgPath: './imgs/04.svg',
        text: '원하는 영상을 골라 <br><Span style="font-size: 15pt; color: #6C63FF;">여러분만의 앨범</span>을 만들고<br>친구들과 공유하세요.',
    },
    {
        label: 'Goč, Serbia',
        imgPath: './imgs/05.svg',
        text: '정확한 디텍팅을 위해<br> <Span style="font-size: 15pt; color: #6C63FF;">얼굴 사진 3장</span>을 업로드하고<br> 지금 바로 시작해보세요!',
    },
];

const Modal = () => {
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = images.length;
    const [pictures, setPictures] = React.useState<any[]>([]);
    const [text, setText] = React.useState<string>('');
    const onDrop = (picture: any) => {
        setPictures(picture);
    };
    React.useEffect(() => {
        pictures.map((picture) => {
            console.log(picture.size);
        });
    }, [pictures]);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleStepChange = (step: number) => {
        setActiveStep(step);
    };
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const handleClickOpen = () => {
        setOpen(true);
    };
    const submitImg = () => {
        window.location.replace(`http://${config.client.host}:${config.client.port}/`);
    };
    return (
        <React.Fragment>
            <Button variant="outlined" onClick={handleClickOpen}>
                button
            </Button>
            <Dialog fullWidth={true} maxWidth="sm" sx={{ height: 'auto' }} open={open}>
                <DialogTitle sx={{ textAlign: 'center', backgroundColor: '#ddd6fe' }}>
                    Welcome to <span style={{ fontSize: '15pt', color: '#6C63FF' }}>CarpeDiem</span>!
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#ddd6fe', pt: '15px' }}>
                    <SwipeableViews
                        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={activeStep}
                        onChangeIndex={handleStepChange}
                        enableMouseEvents
                    >
                        {images.map((step, index) => (
                            <div key={step.label}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    {Math.abs(activeStep - index) <= 2 ? (
                                        <Box
                                            component="img"
                                            sx={{
                                                height: 255,
                                                display: 'block',
                                                maxWidth: 400,
                                                overflow: 'hidden',
                                                width: '100%',
                                                backgroundColor: '#ddd6fe',
                                            }}
                                            src={step.imgPath}
                                            alt={step.label}
                                        />
                                    ) : null}
                                </Box>
                                <DialogContentText
                                    sx={{ textAlign: 'center', mt: '20px', mb: '10px' }}
                                    dangerouslySetInnerHTML={{ __html: step.text }}
                                ></DialogContentText>
                            </div>
                        ))}
                    </SwipeableViews>
                    <MobileStepper
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        sx={{ backgroundColor: '#ddd6fe', mb: '10px' }}
                        nextButton={
                            <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                                Next
                                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                                Back
                            </Button>
                        }
                    />
                    {/* <Slider {...settings}>
                        {images.map((step, index) => (
                            <div key={step.label}>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <Box
                                        component="img"
                                        sx={{
                                            height: 255,
                                            display: 'block',
                                            maxWidth: 400,
                                            overflow: 'hidden',
                                            width: '100%',
                                        }}
                                        src={step.imgPath}
                                        alt={step.label}
                                    />
                                </Box>
                                <DialogContentText
                                    sx={{ textAlign: 'center', mt: '20px', mb: '15px' }}
                                    dangerouslySetInnerHTML={{ __html: step.text }}
                                ></DialogContentText>
                            </div>
                        ))}
                    </Slider> */}
                    <DialogContentText sx={{ mt: '25px', mb: '10px' }}>얼굴 이미지 3개를 업로드해주세요</DialogContentText>
                    <ImageUploader
                        withPreview={true}
                        withIcon={false}
                        onChange={onDrop}
                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                        maxFileSize={5242880}
                    />
                </DialogContent>
                <DialogActions sx={{ backgroundColor: '#ddd6fe' }}>
                    {pictures.length === 3 ? (
                        <Button sx={{ backgroundColor: '#6C63FF' }} variant="contained" onClick={submitImg}>
                            Start
                        </Button>
                    ) : (
                        <Button disabled>Start</Button>
                    )}
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
};

export default Modal;
