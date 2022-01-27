import React from 'react';
import './Mypage.css'
import topLogo from '../images/상단로고.png'
const Mypage = (props) => {
  return (
    <div className="Mypage">
      <div className='cardMypage'>
        <div className=' mypageContainer'>
          <div className='row'>
            <div className='col-2'>
              <img class="topLogo" src={topLogo} alt='toplogo' />
            </div>
            <div className='col-10 rightpage'>
              1010
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Mypage;