import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BsFillBellFill } from 'react-icons/bs';

import 'bootstrap/dist/css/bootstrap.min.css';


function MyModal() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div>
            <span>
                <BsFillBellFill
                    onClick={handleShow}
                    onMouseOver={({ target }) => target.style.color = '#0f382f'}
                    onMouseOut={({ target }) => target.style.color = '#7DB2B1'}
                    style={{ color: '#7DB2B1', cursor: 'pointer', marginLeft: '20px', marginRight: '40px' }}
                />
            </span>

            <Modal show={show} onHide={handleClose} style={{ fontFamily: 'GangwonEduPowerExtraBoldA' }}>
                <Modal.Header>
                    <Modal.Title>알림</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ border: '1px', borderStyle: 'solid', borderColor: 'black', borderRadius: '5px', margin: '1px' }}>새 앨범이 도착했습니다</Modal.Body>
                <Modal.Body style={{ border: '1px', borderStyle: 'solid', borderColor: 'black', borderRadius: '5px', margin: '1px' }}>새 앨범이 도착했습니다</Modal.Body>
                <Modal.Body style={{ border: '1px', borderStyle: 'solid', borderColor: 'black', borderRadius: '5px', margin: '1px' }}>새 앨범이 도착했습니다</Modal.Body>
                <Modal.Footer>
                    <Button className="btn_close" variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    )
}
export default MyModal;