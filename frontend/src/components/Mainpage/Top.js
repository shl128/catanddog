import React from 'react'
import './Top.css'
import { Link } from 'react-router-dom'
import { MyProfile } from './MainAxios'


function Top() {
  const userName = <MyProfile />
  return (
    <div className="Top-container">
      <div className="Top-profile">
        <span>알림</span>
        <span>티어</span>
        <span><Link to="/mypage">프로필사진 / {userName}</Link></span>
      </div>
    </div>
  )
}

export default Top