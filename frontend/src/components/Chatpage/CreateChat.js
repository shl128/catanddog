import React, { useState, useRef } from 'react'
import './CreateChat.css'
import { Modal, Form } from 'react-bootstrap'
import { CreateRoom } from './ChatAxios'

function CreateChat({ trigger, setTrigger }) {
  const [tagValue, setTagValue] = useState('')
  const [show, setShow] = useState(false)
  const [tags, setTags] = useState([])
  const inputTitle = useRef()
  const inputCnt = useRef()

  const handleShow = () => setShow(true)

  function handleClose() {
    setTags([])
    setTagValue('')
    setShow(false)
  }

  function changeTag(event) {
    setTagValue(event.target.value)
  }

  function addTag(event) {
    if (event.key === 'Enter') {
      event.preventDefault()
      setTags(tags => [...tags, tagValue])
      setTagValue('')
    }
  }

  function createRoom() {

    if (inputTitle.current.value && tags && inputCnt.current.value) {
      const chatData = new FormData()
      chatData.append("chatRoomTagName", tags)
      chatData.append("chatRoomTitle", inputTitle.current.value)
      chatData.append("userMaxCount", inputCnt.current.value * 1)

      CreateRoom(chatData)
      .then(() => {
        console.log("채팅방 생성 완료")
        setTrigger(!trigger)
      })
      .catch(() => {
        console.log("채팅방 생성 실패")
      })

      handleClose()
    } else {
      alert("모든 항목을 입력하세요")
    }
  }

  return (
    <div className="Chat-create">
      <div style={{fontSize: "large"}}>채팅방 목록</div>
      <button className="Chat-create-button" onClick={handleShow}>
        방 생성
      </button>

      <Modal dialogClassName="Chat-create-form" show={show} onHide={handleClose} centered="true">
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
              <div className="Chat-create-tags">
                {tags.map((tag, idx) => 
                  <span key={idx}>#{tag} </span>
                )}
              </div>
              <Form.Control value={tagValue} type="text" onChange={changeTag} onKeyPress={addTag}/>
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