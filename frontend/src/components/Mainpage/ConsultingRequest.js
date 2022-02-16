import React, { useEffect, useRef, useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './ConsultingRequest.css'
import { ConsultingCancel, ConsultingWait, DeleteConsultingRoom } from './MainAxios'

function ConsultingRequest(props) {
  const [requestData, setRequestData] = useState(null)
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
        console.log(response.data)
        setRequestData(response.data)
      })
      .catch(() => {
        console.log("수의사의 응답을 기다리는 중")
      })
    }, 1000)
  }
  
  function stop() {
    clearInterval(waiting.current)
  }
  
  function enter() {
    navigate(`/diagnosischat/${requestData.videoChatRoom}`)
    closeFind()
    DeleteConsultingRoom()
    .then(() => {
      console.log("상담 완료")
    })
    .catch(() => {
      console.log("상담 안 끝남")
    })
  }

  useEffect(() => {
    start()
  }, [])

  return (
    <>
      <Modal dialogClassName="Consulting" show={props.findDocterDialog} onHide={() => props.setFindDocterDialog(false)} centered="true">
        <img className="Wait-image" alt="logoname" src={process.env.PUBLIC_URL + '/image/wait.jpg'} />
        {!requestData && <Modal.Body className="Consulting-body">

          응답할 수 있는 의사분을 찾는 중입니다!!
          <div>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
          <div>이름: {props.consultingData.petName}</div>
          <div>종: {props.consultingData.petKind}</div>
          <div>증상: {props.consultingData.petContent}</div>
        </Modal.Body>}
        {requestData && <Modal.Body className="Consulting-body">
          수의사가 응답했습니다!! 아래의 입장하기 버튼을 눌러주세요 
        </Modal.Body>}
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