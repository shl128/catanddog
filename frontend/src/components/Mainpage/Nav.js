import React from 'react'
import './Nav.css'
import logo from '../image/상단로고.png'
import { Nav} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ConsultingRequest from './ConsultingRequest'


function Navbar() {
  const logout = (e) => {
    e.preventDefault()
    localStorage.removeItem('accessToken')
  }
  return (
    <div>
      <Nav.Link href="/main">
        <img className="Logo" alt="logoname" src={logo} />
      </Nav.Link>
      <Nav className="flex-column">
        <button className="Nav-button"><Link to="/petpage" className='Nav-link'>반려동물 추가</Link></button>
        <ConsultingRequest/>
        <button className="Nav-button" >캘린더</button>
        <button className="Nav-button" >이달의 지출</button>
        <button className="Nav-button" >반려동물 케어</button>
        <button className="Nav-button" ><Link to="/petpage" className='Nav-link'>유저들과 소통</Link></button>
        <button className="Nav-button" ><Link to="/petpage" className='Nav-link'>카툰화</Link></button>
        <button className="Nav-button" ><Link to="/petpage" className='Nav-link'>꾸미기</Link></button>
        <button className="Nav-button" onClick={logout}>
          <Link to="/login" className='Nav-link'>로그아웃</Link>
        </button>
      </Nav>
    </div>
  )
}


export default Navbar