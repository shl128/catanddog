import React from 'react';
import './Mypage.css'
import { Navbar, TopNavbar } from '../UI'
import {Login, Signup } from '../Mypage'

const Mypage = (props) => {
  return (
    <div className="Mypage">
      <div className='cardMypage'>
        <div className=' mypageContainer'>
          <div className='row'>
            <div className='col-2'>
              <Navbar/>
            </div>
            <div className='col-10 rightpage'>
              <TopNavbar/>
              {/* 여기다 이제 내용물 넣기 */}

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;