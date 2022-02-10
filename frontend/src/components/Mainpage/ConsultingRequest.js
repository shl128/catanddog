import React from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import Wait from '../image/쫑이.jpg'
import './ConsultingRequest.css'

function ConsultingRequest(props) {
  return (
    <>
      <Modal dialogClassName="Consulting" show={props.findDocterDialog} onHide={() => props.setFindDocterDialog(false)} centered="true">
        <img className="Wait-image" alt="logoname" src={Wait} />
        <Modal.Body className="Consulting-body">
          응답할 수 있는 의사분을 찾는 중입니다!!
          <div>
            <Spinner animation="border" role="status">
              <spen className="visually-hidden">Loading...</spen>
            </Spinner>
          </div>
          <div>{props.consultingData.petName}</div>
          <div>{props.consultingData.petKind}</div>
          <div>{props.consultingData.petContent}</div>
        </Modal.Body>
        <Modal.Footer>
          <button className="Consulting-request" onClick={() => props.setFindDocterDialog(false)}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConsultingRequest