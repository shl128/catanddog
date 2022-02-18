import React from 'react'
import ConsultingAlarmItem from './ConsultingAlarmItem'
import './ConsultingAlarm.css'

function ConsultingAlarm(props) {
  return (
    <div className="Alarm-list">
      {props.consultingList.map((alarmItem, idx) => {
        return <ConsultingAlarmItem key={idx} alarmItem={alarmItem} setUserActive={props.setUserActive}/>
      })}
    </div>
  )
}

export default ConsultingAlarm