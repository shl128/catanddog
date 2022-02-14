import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import './ConsultingAlarmItem.css'
import { ConsultingStart, CreateConsultingRoom } from './MainAxios'

function ConsultingAlarmItem(props) {
  const [show, setShow] = useState(false)

  function consultingStart() {
    ConsultingStart(props.alarmItem.hostId)
    .then(() => {
      console.log("선택한 상담 삭제 후 시작")
    })
    .catch(() => {
      console.log("선택한 상담 삭제 실패")
    })
    
    CreateConsultingRoom(props.alarmItem)
    .then(() => {
      console.log("화상 상담방 생성 완료")
    })
    .catch(() => {
      console.log("화상 상담방 생성 실패")
    })

    props.setUserActive(false)
    setShow(false)
  }

  return (
    <div className="Alarm-item">
      <button onClick={() => setShow(true)}>{props.alarmItem.petKind}상담이 있어요 </button>

      <Modal show={show} centered="true">
        <Modal.Header>
          <div>{props.alarmItem.userName}님의 상담입니다</div>
        </Modal.Header>
        <Modal.Body>
          <div>이름: {props.alarmItem.petName}</div>
          <div>종: {props.alarmItem.petKind}</div>
          <div>증상: {props.alarmItem.petContent}</div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={consultingStart}>
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