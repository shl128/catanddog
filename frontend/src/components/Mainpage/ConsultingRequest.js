import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import Wait from '../image/쫑이.jpg'
import './ConsultingRequest.css'
import { ConsultingCancel, ConsultingWait } from './MainAxios'

function ConsultingRequest(props) {

  function closeFind() {
    clearInterval(waiting)
    ConsultingCancel()
    .then(() => {
      console.log("상담 신청 취소 완료")
      props.setFindDocterDialog(false)
    })
    .catch(() => {
      console.log("상담 취소 실패")
    })
  }

  const waiting = setInterval(() => {
    ConsultingWait()
    .then(() => {
      console.log("받아오기")
    })
    .catch(() => {
      console.log("받아오기 실패")
    })
  }, 1000);


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
          <button className="Consulting-request" onClick={closeFind}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConsultingRequest