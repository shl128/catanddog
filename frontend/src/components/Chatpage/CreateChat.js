import React, { useState, useRef } from 'react'
import './CreateChat.css'
import { Modal, Form } from 'react-bootstrap'

function CreateChat() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const inputTitle = useRef()
  const inputTag = useRef()
  const inputCnt = useRef()
  function createRoom() {
    if (inputTitle.current.value && inputTag.current.value && inputCnt.current.value) {
      handleClose()
    } else {
      alert("모든 항목을 입력하세요")
    }
  }

  return (
    <div className="Chat-create">
      <h3>채팅방 목록</h3>
      <button className="Chat-create-button" onClick={handleShow}>
        방 생성
      </button>

      <Modal show={show} onHide={handleClose} centered="true">
        <Modal.Title>채팅방 생성하기</Modal.Title>
        <Modal.Body>
          방 제목, 해시태그, 인원제한은 필수 항목입니다
          <Form>
            <Form.Group>
              <Form.Label>방 제목</Form.Label>
              <Form.Control ref={inputTitle} type="text"/>
            </Form.Group>
            <Form.Group>
              <Form.Label>해시태그</Form.Label>
              <Form.Control ref={inputTag} type="text" />
            </Form.Group>
            <Form.Group>
              <Form.Label>인원</Form.Label>
              <Form.Select ref={inputCnt}>
                <option value="2">2명</option>
                <option value="3">3명</option>
                <option value="4">4명</option>
                <option value="5">5명</option>
                <option value="6">6명</option>
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="Chat-create-button" onClick={createRoom}>
            방 생성
          </button>
          <button className="Chat-create-button" onClick={handleClose}>
            취소
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default CreateChat