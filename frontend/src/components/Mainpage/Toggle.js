import React from 'react'
import './Toggle.css'
import { ChangeActive } from './MainAxios'

function Toggle(props) {

  function ActiveToggle() {
    const newData = {
      ...props.userdata,
      userActive: !props.userActive
    }
    ChangeActive(newData)
    .then(()=> {
      props.setUserActive(!props.userActive)
      console.log("상담 상태가 변경되었습니다")
    })
    .catch(error => {
      console.log("상담 상태가 변경되지 않았습니다")
    })
  }

  return (
    <div>
      <button className={ props.userActive ? 'Toggle-on' : 'Toggle-off' } onClick={() => ActiveToggle()}>
        { props.userActive ? '상담 가능' : '상담 불가능'}
      </button>
    </div>
  )
}

export default Toggle