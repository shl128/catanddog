import React, { useEffect, useState } from 'react'
import './Top.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { MyProfile } from './MainAxios'
import Toggle  from './Toggle'
import ConsultingOk from './ConsultingOk'
import ConsultingAlarm from './ConsultingAlarm'

function Top() {

  const [userdata, setUserdata] = useState('')
  const [userkind, setUserkind] = useState(0)
  const [nickname, setNickname] = useState('')
  const [photo, setPhoto] = useState('')
  const [userActive, setUserActive] = useState(true)
  const [open, setOpen] = useState(false)
  
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

  const consultingList = [
    {userName: "아무거나", petKind: "코숏", petName: "쿠키", content: "토했어요"},
    {userName: "이것저것", petKind: "스피츠", petName: "쫑", content: "입을 긁어요"},
    {userName: "대충대충", petKind: "진돗개", petName: "백구", content: "다리를 절어요"},
  ]

  function ListOpen() {
    setOpen(!open)
  }

  return (
    <div className="Top-container">
      <div className="Top-profile">
        {userkind === 2 && <Toggle userdata={userdata} userActive={userActive} setUserActive={setUserActive} />}
        {userkind === 2 && userActive && <ConsultingOk />}
        <button onClick={ListOpen}>
          <FontAwesomeIcon className="bell-icon" icon={faBell}/>
          <div>{consultingList.length}</div>
        </button>
        <p>티어</p>
        <Link to="/mypage" className="Top-link">
          <img className='profilePhoto' alt="프로필사진" src={'data:image/png;base64,' + photo} /> {nickname}
        </Link>
      </div>
      <div className={open ? "list-open" : "list-off"}>
        <ConsultingAlarm consultingList={consultingList}/>
      </div>
    </div>
  )
}

export default Top