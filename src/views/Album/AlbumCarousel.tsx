import React from 'react';
import logotitle from '../../assets/frame.png';
import config from '../../config';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import OutletIcon from '@mui/icons-material/Outlet';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import SentimentVeryDissatisfiedRoundedIcon from '@mui/icons-material/SentimentVeryDissatisfiedRounded';
import SickIcon from '@mui/icons-material/Sick';

export default function AlbumCarousel(props: any) {
    console.log('Carousel', props.cardInfo);
    const emotionType: any = (): any => {
        if (props.cardInfo.expressionLabel == 'happy') {
            return <InsertEmoticonIcon />;
        } else if (props.cardInfo.expressionLabel == 'angry') {
            return <LocalFireDepartmentIcon />;
        } else if (props.cardInfo.expressionLabel == 'fearful') {
            return <SentimentVeryDissatisfiedRoundedIcon />;
        } else if (props.cardInfo.expressionLabel == 'surprised') {
            return <OutletIcon />;
        } else if (props.cardInfo.expressionLabel == 'sad') {
            return <SentimentDissatisfiedIcon />;
        } else if (props.cardInfo.expressionLabel == 'disgusted') {
            return <SickIcon />;
        }
    };
    return (
        <div>
            <h3>{props.cardInfo.cardId}</h3>
            <div style={{ position: 'relative', margin: '20px' }}>
                <img src={logotitle} style={{ width: '620px', height: '500px', position: 'absolute', top: 0, left: '22%' }}></img>
                <video
                    controls
                    loop
                    src={`https://${config.aws.bucket_name}.s3.${config.aws.region}.amazonaws.com/${props.cardInfo.videoUrl}`}
                    width="600px"
                    height="460px"
                ></video>
            </div>
            <div style={{ marginTop: '100px' }}>
                <span
                    style={{
                        borderRadius: '5px',
                        borderStyle: 'solid',
                        borderColor: 'grey',
                        width: '200px',
                        marginTop: '50px',
                    }}
                >
                    {emotionType()}
                    {props.cardInfo.expressionLabel}
                </span>
                <span
                    style={{
                        outline: 'none',
                        borderRadius: '5px',
                        border: '1.5px solid grey',
                        fontSize: '16px',
                        boxShadow: '3px 3px 1px gray',
                        paddingLeft: '10px',
                        marginBottom: '40px',
                        marginLeft: '20px',
                        width: '800px',
                    }}
                >
                    {props.cardInfo.comment}
                </span>
            </div>
        </div>
    );
}
