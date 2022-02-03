import React from 'react'
import './Welcome.css'
import { Link } from 'react-router-dom'

function Welcome(props) {
  return (
    <Link to="/mypage">
      <button className="Welcome">
        <h5>{props.name}님, 안녕하세요!</h5>
        <p>냥과함개와 반려동물 케어를 함께 할 준비가 되셨나요?</p>
      </button>
    </Link>
  );
}

export default Welcome