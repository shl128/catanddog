import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import './ConsultingAlarmItem.css'

function ConsultingAlarmItem(props) {
  const [show, setShow] = useState(false)


  return (
    <div className="Alarm-item">
      <span>{props.alarmItem.petKind}상담이 있어요 </span>
      <button onClick={() => setShow(true)}>/ 펼쳐보기</button>

      <Modal show={show} centered="true">
        <Modal.Header>
          <div>{props.alarmItem.userName}님의 상담입니다</div>
        </Modal.Header>
        <Modal.Body>
          <div>이름: {props.alarmItem.petName}</div>
          <div>종: {props.alarmItem.petKind}</div>
          <div>증상: {props.alarmItem.content}</div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShow(false)}>
            상담하기
          </button>
          <button onClick={() => setShow(false)}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default ConsultingAlarmItem