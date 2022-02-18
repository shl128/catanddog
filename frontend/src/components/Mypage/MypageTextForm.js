import React, { useState } from 'react';
import './MypageTextForm.css'

const MypageTextForm = (props) =>{
  
  return (
    <div className='MypageTextForm-container'>
      <div className='TextForm-label'>
         {props.role}
      </div>
      <div className='TextForm-value'>
        {
          props.update === false
          ?
          <div>
            {props.data}
          </div>
          :
          <form>
            {
              props.role === '유저 종류' && <div>{props.data}</div>
            }
            {
              props.role === '닉네임' && 
              <div>
                <input className="userInput" name={props.data}  value={props.data} onChange={props.handleData} autoFocus required />
                {
                  props.nickNameConfirm === false &&
                  <button className='confirmNicknameButton' onClick={props.onNicknameConfirm}>중복 확인</button>
                }
              </div>
            }
            {
              props.role === '이메일' && <div>{props.data}</div>
            }
                        {
              props.role === '전화번호' && <input className="userInput" name={props.data}  value={props.data} onChange={props.handleData} autoFocus required />
            }

          </form>
        }
        
      </div>
    </div>
  )
}

export default MypageTextForm;
