import React, {useEffect, useState} from 'react'
import './Welcome.css'
import { Link } from 'react-router-dom'
import { MyProfile } from './MainAxios'

function Welcome() {

  const [userData, setUserData] = useState(null)

  useEffect(() => {
    MyProfile()
    .then(response => {
      setUserData(response.data)
    })
    .catch(() => {
      console.log("회원정보 가져오기 실패")
    })
  }, [])

  return (
    <Link to="/mypage">
      <button className="Welcome">
        <h5>{userData && userData.userNickname}님, 안녕하세요!</h5>
        <p>냥과함개와 반려동물 케어를 함께 할 준비가 되셨나요?</p>
      </button>
    </Link>
  );
}

export default Welcome