import React from 'react'
import './Welcome.css'
import { Link } from 'react-router-dom'

function Welcome(props) {

  return (
    <Link to="/mypage">
      <button className="Welcome">
        <div>{props.userData && props.userData.userNickname}님, 안녕하세요!</div>
        <div>냥과함개와 반려동물 케어를 함께 할 준비가 되셨나요?</div>
      </button>
    </Link>
  );
}

export default Welcome