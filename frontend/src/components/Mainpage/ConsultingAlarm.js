import React from 'react'
import ConsultingAlarmItem from './ConsultingAlarmItem'
import './ConsultingAlarm.css'

function ConsultingAlarm(props) {
  return (
    <div className="Alarm-list">
      {props.consultingList.map((alarmItem, idx) => {
        return <ConsultingAlarmItem key={idx} alarmItem={alarmItem}/>
      })}
    </div>
  )
}

export default ConsultingAlarm