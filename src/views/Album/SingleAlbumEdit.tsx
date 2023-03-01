import React, { useState, useRef, useEffect } from 'react';
import { ALBUM_UPDATE_REQUEST } from '../../redux/types';
import { useDispatch, useSelector } from 'react-redux';
import { CiEdit } from 'react-icons/ci';

export default function SingleAlbumEdit(props: any) {
    const ref: any = useRef(null);

    const dispatch = useDispatch();
    const [text, setText] = useState(props.albumContent.title);
    const [editable, setEditable] = useState(false);
    const editOn = () => {
        setEditable(true);
        setText(props.albumContent.title);
    };
    const handleChange = (e: any) => {
        setText(e.target.value);
    };
    const handleKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            setEditable(false);
            props.albumContent.title = text;

            dispatch({
                type: ALBUM_UPDATE_REQUEST,
                payload: {
                    album_id: props.albumContent.albumId,
                    title: text,
                    thumbnail_url: props.albumContent.thumbnailUrl,
                },
            });
            window.location.reload();
        }
    };

    const handleClickOutside = (e: any) => {
        if (editable === true && !ref.current.contains(e.target)) setEditable(false);
    };

    useEffect(() => {
        window.addEventListener('click', handleClickOutside, true);
    });
    return (
        <div>
            <div style={{ display: 'flex', textAlign: 'center' }}>
                {editable ? (
                    <div>
                        <form>
                            <input
                                type="text"
                                maxLength={25}
                                value={text}
                                onChange={(e) => handleChange(e)}
                                onKeyDown={handleKeyDown}
                                style={{
                                    textAlign: 'center',
                                    backgroundColor: 'transparent',
                                    borderColor: '#fff',
                                    color: '#fff',
                                    borderRadius: '5px',
                                    fontSize: 28,
                                }}
                            />
                        </form>{' '}
                    </div>
                ) : (
                    <div style={{ fontSize: '30px' }}>Title : {props.albumContent.title}</div>
                )}
                <CiEdit
                    size="30"
                    onClick={editOn}
                    style={{ color: '#fe2e79', cursor: 'pointer', marginTop: '3px', marginLeft: '20px', marginRight: '5px' }}
                />
            </div>
        </div>
    );
}
