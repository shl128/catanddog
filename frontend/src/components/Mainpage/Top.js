import React, { useEffect, useState } from 'react'
import './Top.css'
import { Link } from 'react-router-dom'
import { MyProfile } from './MainAxios'
import Toggle  from './Toggle'
import ConsultingOk from './ConsultingOk'

function Top() {

  const [userdata, setUserdata] = useState('')
  const [userkind, setUserkind] = useState(0)
  const [nickname, setNickname] = useState('')
  const [photo, setPhoto] = useState('')
  const [userActive, setUserActive] = useState(true)

  useEffect(() => {
    MyProfile()
    .then(response => {
      setUserkind(response.data.userKind)
      setNickname(response.data.userNickname)
      setPhoto(response.data.userPhoto)
      setUserActive(response.data.userActive)
      setUserdata(response.data)
      console.log("회원정보 가져오기 성공")
      console.log(response.data)
    })
    .catch(() => {
      console.log("회원정보 가져오기 실패")
    })
  }, [])

  return (
    <div className="Top-container">
      <div className="Top-profile">
        {userkind === 0 && <Toggle userdata={userdata} userActive={userActive} setUserActive={setUserActive} />}
        {userkind === 0 && userActive && <ConsultingOk />}
        <p>알림</p>
        <p>티어</p>
        <Link to="/mypage">
          <img alt="프로필사진" src={photo} /> / {nickname}
        </Link>
      </div>
    </div>
  )
}

export default Top