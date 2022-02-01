import React from 'react'
import './Top.css'
import { Link } from 'react-router-dom'
import MyChatSearch from './MyChatSearch'

function Top(props) {
  return (
    <div className="Top-container">
      <div className="Top-search">
      <MyChatSearch />
      </div>
      <div className="Top-profile">
        <span>알림</span>
        <span>티어</span>
        <span><Link to="/mypage">프로필 사진 / 사용자 이름</Link></span>
      </div>
    </div>
  )
}

export default Top