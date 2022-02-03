import React from 'react';
import './Mypage.css'
import { Navbar, TopNavbar } from '../UI'


const Template = (props) => {
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
              {/* 여기에 주소를 바꿔가면서 넣기 */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Template;