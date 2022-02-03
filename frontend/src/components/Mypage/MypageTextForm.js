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
              props.role === '유저 종류' && '셀렉트박스'
            }
            {
              props.role === '닉네임' && <input className={props.data} name={props.data}  value={props.data} onChange={props.handleData} autoFocus required />
            }
            {
              props.role === '이메일' && <div>{props.data}</div>
            }
                        {
              props.role === '전화번호' && <input className={props.data} name={props.data}  value={props.data} onChange={props.handleData} autoFocus required />
            }

          </form>
        }
        
      </div>
    </div>
  )
}

export default MypageTextForm;
