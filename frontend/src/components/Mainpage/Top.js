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
      <div className="Top-profile">
        {userkind === 2 && <Toggle userActive={userActive} setUserActive={setUserActive} />}
        <button onClick={ListOpen}>
          <FontAwesomeIcon className="bell-icon" icon={faBell}/>
          <div>{consultingList.length >= 1 && consultingList.length}</div>
        </button>
        <p>티어</p>
        <Link to="/mypage" className="Top-link">
          <img className='profilePhoto' alt="프로필사진" src={'data:image/png;base64,' + photo} /> {nickname}
        </Link>
      </div>
      <div className={open ? "list-open" : "list-off"}>
        {consultingList.length >= 1 && <ConsultingAlarm consultingList={consultingList} setUserActive={setUserActive}/>}
      </div>
    </div>
  )
}

export default Top