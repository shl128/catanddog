import React, { useState } from 'react'
import './Nav.css'
import { Nav } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import ConsultingForm from './ConsultingForm'
import ConsultingRequest from './ConsultingRequest'
import { FindDocter } from './MainAxios'

function Navbar() {
  let navigate = useNavigate()
  const [consultingDialog, setConsultingDialog] = useState(false)
  const [findDocterDialog, setFindDocterDialog] = useState(false)
  const [consultingData, setConsultingData] = useState([])

  const logout = (e) => {
    if (window.confirm("정말로 로그아웃 하실건가요?")) {
      e.preventDefault()
      localStorage.removeItem('accessToken')
      navigate('/login')
    }
  }

  function canConsulting() {
    FindDocter()
    .then(() => {
      console.log("상담 가능한 의사가 있습니다")
      setConsultingDialog(true)
    })
    .catch(() => {
      console.log("상담 가능한 의사가 없습니다")
      alert("현재 상담 가능한 의사님이 없어요! 조금 이따가 신청해주세요!!")
    })
  }

  return (
    <div className="Nav">
      <Nav.Link href="/">
        <img className="Logo" alt="logoname" src={process.env.PUBLIC_URL + '/image/toplogo.png'} />
      </Nav.Link>
      <nav className="Nav-item">
        <NavLink to="/petpage" className={({ isActive }) => isActive ? "Nav-link-on" : "Nav-link" } state={{pageType:'create'}}>반려동물 추가</NavLink>
        <button className="Nav-link" onClick={canConsulting}>실시간 상담</button>
        <NavLink to="/calendarpage" className={({ isActive }) => isActive ? "Nav-link-on" : "Nav-link"} inChatting={false}>캘린더</NavLink>
        <NavLink to="/spendingOfMonth" className={({ isActive }) => isActive ? "Nav-link-on" : "Nav-link"}>이달의 지출</NavLink>
        <NavLink to="/chat" className={({ isActive }) => isActive ? "Nav-link-on" : "Nav-link"}>유저와의 소통</NavLink>
        <NavLink to="/cartoon" className={({ isActive }) => isActive ? "Nav-link-on" : "Nav-link"}>카툰화</NavLink>
        <NavLink to="/emoji" className={({ isActive }) => isActive ? "Nav-link-on" : "Nav-link"}>반려티콘</NavLink>
        <button className='Nav-link' onClick={logout}>로그아웃</button>
      </nav>
      {consultingDialog && 
        <ConsultingForm 
          consultingDialog={consultingDialog} 
          setConsultingDialog={setConsultingDialog} 
          setFindDocterDialog={setFindDocterDialog}
          setConsultingData={setConsultingData}
        />}
      {findDocterDialog && 
        <ConsultingRequest 
          findDocterDialog={findDocterDialog}
          consultingData={consultingData}
          setFindDocterDialog={setFindDocterDialog}
        />}
    </div>
  )
}


export default Navbar