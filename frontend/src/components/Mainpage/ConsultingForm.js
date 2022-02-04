import React, { useState } from 'react'
import { Modal, Form } from 'react-bootstrap'
import './ConsultingForm.css'
import ConsultingRequest from './ConsultingRequest'

function ConsultingForm() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button className="Consulting-button" onClick={handleShow}>
        실시간 상담
      </button>
      <Modal dialogClassName="Consulting" show={show} onHide={handleClose} centered="true">
        <Modal.Header>
          내용을 입력하시면 더 좋은 상담을 진행할 수 있어요
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>종을 입력하세요</Form.Label>
              <Form.Control type="text" placeholder="예: 스피츠 / 코리안 숏 헤어" />
            </Form.Group>
            <Form.Group>
              <Form.Label>증상을 입력하세요</Form.Label>
              <Form.Control as="textarea" placeholder="예: 다리를 절뚝거려요" required/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <ConsultingRequest/>
          <button className="Consulting-cancel" onClick={handleClose}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConsultingForm