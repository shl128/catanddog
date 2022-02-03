import React, { useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import Wait from '../image/쫑이.jpg'
import './ConsultingRequest.css'
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function ConsultingRequest() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="Consulting-button" onClick={handleShow}>
        실시간 상담
      </button>

      <Modal dialogClassName="Consulting" show={show} onHide={handleClose} centered="true">
        <img className="Wait-image" alt="logoname" src={Wait} />
        <Modal.Body className="Consulting-body">
          응답할 수 있는 의사분을 찾는 중입니다!!
          <div><FontAwesomeIcon icon={faSpinner} size="3x" /></div>
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </Modal.Body>
        <Modal.Footer>
          <button className="Consulting-cancel" onClick={handleClose}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConsultingRequest