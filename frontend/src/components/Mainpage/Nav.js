import React from 'react'
import './Nav.css'
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div>
      <Nav.Link href="/main">
        <img className="Logo" alt="logo" src="img/냥과함개로고.png" />
        <img className="Logo-name" alt="logoname" src="img/냥과함개.png" />
      </Nav.Link>
      <Nav className="flex-column">
        <button className="Nav-button">반려동물 추가</button>
        <button className="Nav-button">실시간 상담</button>
        <button className="Nav-button" >캘린더</button>
        <button className="Nav-button" >이달의 지출</button>
        <button className="Nav-button" ><Link to="/petpage" className='Nav-link'>반려동물 케어</Link></button>
        <button className="Nav-button" ><Link to="/petpage" className='Nav-link'>유저들과 소통</Link></button>
        <button className="Nav-button" ><Link to="/petpage" className='Nav-link'>카툰화</Link></button>
        <button className="Nav-button" ><Link to="/petpage" className='Nav-link'>꾸미기</Link></button>
        <button className="Nav-button">로그아웃</button>
      </Nav>
    </div>
  )
}


export default Navbar