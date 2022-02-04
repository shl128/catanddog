import React, { useState } from 'react'
import { Modal, Spinner } from 'react-bootstrap'
import Wait from '../image/쫑이.jpg'
import './ConsultingRequest.css'

function ConsultingRequest() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="Consulting-request" onClick={handleShow}>
        수의사님 찾기
      </button>

      <Modal dialogClassName="Consulting" show={show} onHide={handleClose} centered="true">
        <img className="Wait-image" alt="logoname" src={Wait} />
        <Modal.Body className="Consulting-body">
          응답할 수 있는 의사분을 찾는 중입니다!!
          <div>
            <Spinner animation="border" role="status">
              <spen className="visually-hidden">Loading...</spen>
            </Spinner>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="Consulting-request" onClick={handleClose}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConsultingRequest