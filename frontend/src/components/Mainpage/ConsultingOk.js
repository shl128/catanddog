import React from 'react'
import './ConsultingOk.css'

function ConsultingOk(props) {
  return (
    <div className={"Ok-page" }>
      <p>보호자이름 님이 상담을 신청했어요</p>
      <p>종: 데이터 필요</p>
      <p>증상: 데이터 필요</p>
      <div>
        <button className="Ok-accept">수락하기</button>
        <button className="Ok-reject">거절하기</button>
      </div>
    </div>
  )
}

export default ConsultingOk