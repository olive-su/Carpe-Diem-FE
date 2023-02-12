import React, { useState } from 'react'
import styled from 'styled-components';
// import { FaBell } from 'react-icons/fa';

// const ModalContainer = styled.div`

// `;




// export default function Modal() {
//     const [modal, setModal] = useState(false);
//     const handleClick = () => {
//         setModal(!modal);
//     };

//     return (
//         <>
//             <ModalContainer >
//                 <FaBell onClick={handleClick} style={{ color: 'white', fontSize: '25px', paddingLeft: '30px' }}>

//                     {modal ? <ModalContent /> : null}
//                 </FaBell>

//             </ModalContainer>
//         </>
//     )
// }

// function ModalContent() {
//     return (
//         <div style={{ top: '200px', width: '100%', height: '100%', display: 'block', backgroundColor: 'pink' }}>
//             <div style={{ padding: '20px', border: '1px solid darkblue', borderRadius: '5px', fontSize: '15px' }}>새 앨범이 도착했습니다.</div>
//             <div style={{ padding: '20px', border: '1px solid darkblue', borderRadius: '5px', fontSize: '15px' }}>새 앨범이 도착했습니다.</div>
//             <div style={{ padding: '20px', border: '1px solid darkblue', borderRadius: '5px', fontSize: '15px' }}>새 앨범이 도착했습니다.</div>
//         </div >
//     )
// }

const Modal = styled.div`
    position: absolute;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    display: none;

    background-color: rgba(0, 0, 0, 0.4);
`;

const ModalBody = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;

    width: 800px;
    height: 600px;

    background-color: rgb(255, 255, 255);
    border-radius: 10px;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);

    transform: translateX(-50%) translateY(-50%);
`;

const ModalHead = styled.div`
    height: 10%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    background-color:#e7e5e5;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
`;

const ModalBbody2 = styled.div`
    height: 80%;
    padding: 20px;
`;

const ModalFooter = styled.div`
    height: 10%;
    padding: 15px;
    background-color:#e7e5e5;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    display: flex;
    justify-content: end;
`;

const ModalTitle = styled.div`
    font-size: 18px;
    color: gray;
    font-weight: 500;

`;



export default function Modals() {
    return (
        <>

        </>
    )
}
