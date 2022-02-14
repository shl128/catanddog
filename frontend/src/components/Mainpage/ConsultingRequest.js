import React, { useEffect, useRef, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Wait from '../image/쫑이.jpg'
import './ConsultingRequest.css'
import { ConsultingCancel, ConsultingWait } from './MainAxios'

function ConsultingRequest(props) {
  const [requestData, setRequestData] = useState()
  const waiting = useRef(0)
  const navigate = useNavigate()

  function closeFind() {
    stop()
    ConsultingCancel()
    .then(() => {
      console.log("상담 신청 취소 완료")
      props.setFindDocterDialog(false)
    })
    .catch(() => {
      console.log("상담 취소 실패")
    })
  }

  function start() {
    waiting.current = setInterval(() => {
      ConsultingWait()
      .then(response => {
        console.log("수의사의 응답을 기다리는 중", response.data)
        setRequestData(response.data)
      })
      .catch(() => {
        console.log("기다리기 실패")
      })
    }, 1000)
  }
  
  function stop() {
    clearInterval(waiting.current)
  }
  
  function enter() {
    navigate(`/chatting/${requestData.videoChatRoom}`)
    stop()
  }

  useEffect(() => {
    start()
  }, [])

  return (
    <>
      <Modal dialogClassName="Consulting" show={props.findDocterDialog} onHide={() => props.setFindDocterDialog(false)} centered="true">
        <img className="Wait-image" alt="logoname" src={Wait} />
        <Modal.Body className="Consulting-body">
          응답할 수 있는 의사분을 찾는 중입니다!!
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
          <div>{props.consultingData.petName}</div>
          <div>{props.consultingData.petKind}</div>
          <div>{props.consultingData.petContent}</div>
        </Modal.Body>
        <Modal.Footer>
          {requestData && <button onClick={enter}>입장하기</button>}
          <button className="Consulting-request" onClick={closeFind}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConsultingRequest


// waiting.current = setInterval(() => {
//   ConsultingWait()
//   .then(response => {
//     console.log("요청 중", !!response.data)
//   })
//   .catch(() => {
//     console.log("요청 중")
//   })
// }, 1000)