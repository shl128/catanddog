import React from 'react';
import { faSignOutAlt, faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import topLogo from '../images/상단로고.png'
import './Navbar.css'

const Navbar = (props) => {
  return (
    <div className='navbarContainer'>
      <div className='navColumn' >
        <div className='navItem'>
          <img className="topLogo" src={topLogo} alt='toplogo' />
        </div>
        <div className='navItem'>
          <button className='navSubmit1'>+ 반려동물 추가</button>
        </div>
        <div className='navItem'>
          <button className='navSubmit2'>실시간 화상 상담</button>
        </div>
        <div className='navItem'>
          <div className='navText'>반려동물과 소통</div>
        </div>
        <div className='navItem'>
          <div className='navText'>유저들과 소통</div>
        </div>
        <div className='navItem'>
          <div className='navText'>카툰화</div>
        </div>
        <div className='navItem'>
          <div className='navText'>꾸미기</div>
        </div>
        <div className='navItem navLogout'>
          <div className=''>
            <div className="row">
              <div className='col-3'>
              </div>
              <div className='col-1'>
              <FontAwesomeIcon icon={faSignOutAlt} size="2x" />
              </div>
              <div className='col-4'>
              
              <div className='navText'>Logout</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar;
