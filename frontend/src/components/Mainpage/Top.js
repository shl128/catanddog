import React, { useEffect, useState, useRef } from 'react'
import './Top.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { MyProfile, ConsultingRequestList } from './MainAxios'
import Toggle  from './Toggle'
import ConsultingAlarm from './ConsultingAlarm'

function Top() {

  const [userkind, setUserkind] = useState(0)
  const [nickname, setNickname] = useState('')
  const [photo, setPhoto] = useState('')
  const [userActive, setUserActive] = useState(true)
  const [open, setOpen] = useState(false)
  const [consultingList, setConsultingList] = useState([])
  const RequestList = useRef()

  useEffect(() => {
    MyProfile()
    .then(response => {
      setUserkind(response.data.userKind)
      setNickname(response.data.userNickname)
      setPhoto(response.data.userPhoto)
      setUserActive(response.data.userActive)
      console.log("회원정보 가져오기 성공", response.data)
    })
    .catch(() => {
      console.log("회원정보 가져오기 실패")
    })
    
    if (userActive) {
      RequestGetStart()
    } else {
      RequestGetStop()
    }
  }, [userActive])

  function ListOpen() {
    setOpen(!open)
  }

  function RequestGetStart() {
    console.log("상담 신청 내역 가져오는 중")
    RequestList.current = setInterval(() => {
      ConsultingRequestList()
      .then(response => {
        console.log("등록된 상담 내역 가져오기 성공", response.data)
        setConsultingList(response.data)
      })
      .catch(() => {
        console.log("등록된 상담 내역 가져오기 실패")
      })
    }, 1000)
  }

  function RequestGetStop() {
    clearInterval(RequestList.current)
    setConsultingList([])
  }

  return (
    <div className="Top-container">
      {userkind === 2 && <Toggle userActive={userActive} setUserActive={setUserActive} />}
      {userkind === 2 && 
      <div style={{position: "relative"}}>
        <button onClick={ListOpen}>
          <FontAwesomeIcon className={userActive ? "Top-bell-icon-on" : "Top-bell-icon-off"} icon={faBell}/>
        </button>
        <div className={userActive ? "Top-bell-cnt" : "Top-list-off"}>{consultingList.length >= 1 && consultingList.length}</div>
        <div className={open ? "Top-list-open" : "Top-list-off"}>
          {consultingList.length >= 1 && <ConsultingAlarm consultingList={consultingList} setUserActive={setUserActive}/>}
        </div>
      </div>}
      <img className="Top-grade" alt="티어" src={process.env.PUBLIC_URL + '/image/rank.png'} />
      <Link to="/mypage" className="Top-profile">
        {
          photo === null
          ?
          <img className='Top-profile-img' alt="프로필사진" src={process.env.PUBLIC_URL + '/image/noimage.png'} />
          :          
          <img className='Top-profile-img' alt="프로필사진" src={'data:image/png;base64,' + photo} />
        }
        <div className="Top-profile-name">{nickname}</div>
      </Link>
    </div>
  )
}

export default Top