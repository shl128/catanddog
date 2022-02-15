import React, { useState, useEffect, useRef } from 'react';
import './Calendarpage.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import DateCalculation from '../../components/PublicComponents/DateCalculation';
import moment from 'moment';
import Form from 'react-bootstrap/Form'
import SERVER from '../../API/server';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventForm from '../../components/Calendarpage/AddEventForm';
import ReadUpdateEventForm from '../../components/Calendarpage/ReadUpdateEventForm';
import AddAlarmIcon from '@material-ui/icons/AddAlarm';

const Calendarpage = (props) => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);
  const [allEvents, setAllEvents] = useState([])
  const [addEventBtnClick, setAddEventBtnClick] = useState(false)
  const [eventClick, setEventClick] = useState(false)
  const filterCategory = useRef('전체');
  const userData = localStorage.getItem('accessToken');
  const [eventId, setEventId] = useState(null)

  const [eventTitle, setEventTitle] = useState(null)
  const [eventCategory, setEventCategory] = useState(null)
  const [startEventDate, setStartEventDate] = useState(null)
  const [endEventDate, setEndEventDate] = useState(null)

  function axiosGet() {
    axios.get(
      `${SERVER.BASE_URL}${SERVER.ROUTES.Calendar}?category=${filterCategory.current.value}`,
      {headers: {
        Authorization: `Bearer ${userData}`,
      }}
    )
    .then((res) => {
      // console.log(res.data)
      setAllEvents(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function gotoReadUpdateForm(event) {
    // function dateAddDel(sDate, nNum, type) {
    //   var yyyy = parseInt(sDate.substring(0, 4));
    //   var mm = parseInt(sDate.substring(5, 7));
    //   var dd = parseInt(sDate.substring(8, 10));
    //   var temp = ''
    //   if (type === "d") {
    //     temp = new Date(yyyy, mm-1, dd + nNum);
    //   } else if (type === "m") {
    //     temp = new Date(yyyy, mm-1 + nNum, dd);
    //   } else if (type === "y") {
    //     temp = new Date(yyyy + nNum, mm - 1, dd);
    //   }
    //   yyyy = temp.getFullYear();
    //   mm = temp.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
    //   dd = temp.getDate(); dd = (dd < 10) ? '0' + dd : dd;
    //   return yyyy + '-' +  mm  + '-' + dd;
    // }
    

    setEventTitle(event.title)
    setStartEventDate(DateCalculation(event.start,1))
    setEndEventDate(DateCalculation(event.end,1))
    // setStartEventDate(dateAddDel(event.start, 1, 'd'))
    // setEndEventDate(dateAddDel(event.end, 1, 'd'))
    // setStartEventDate(finalStart)
    // setEndEventDate(finalEnd)
    setEventCategory(event.category)
    
    setEventId(event.id)
    setEventClick(true)
    
  }

  useEffect(() => { axiosGet(); },[])

  return (
    <div className={props.inChatting ? 'inChatting-Calendarpage' : 'Calendarpage'}>
      <div className='margin-x'>
        <div  >
          {
            props.inChatting
            ?
            <div className='gridBox'>
            <Form.Select className="inchatting-filterCategory" aria-label="Default select example" onChange={axiosGet} ref={filterCategory} >
              <option value="전체">전체</option>
              <option value="병원">병원</option>
              <option value="식사">식사</option>
              <option value="증상">증상</option>
              <option value="기타">기타</option>
            </Form.Select>
            <button className='Button-icon-style' onClick={() => setAddEventBtnClick(true)}><AddAlarmIcon/></button>
          </div>
            :
            <div  className='gridBox'>
              <Form.Select className="w-75 filterCategory mt-2" aria-label="Default select example" onChange={axiosGet} ref={filterCategory} >
                <option value="전체">전체</option>
                <option value="병원">병원</option>
                <option value="식사">식사</option>
                <option value="증상">증상</option>
                <option value="기타">기타</option>
              </Form.Select>
              <button className='Button-style mt-2' onClick={() => setAddEventBtnClick(true)}>일정 추가</button>
            </div>
          }
        </div>
        <div className='overflow-frame'>
          {
            props.inChatting
            ?
            <Calendar
              className='mt-2'
              localizer={localizer}
              events={allEvents}
              style={{ height: 550 }}
              onSelectEvent={event => gotoReadUpdateForm(event)}
            />
            :
            <Calendar
            className='mt-2'
            localizer={localizer}
            events={allEvents}
            style={{ height: 580 }}
            onSelectEvent={event => gotoReadUpdateForm(event)}
          />
          }
          {addEventBtnClick && 
          <AddEventForm
            axiosGet={axiosGet}
            addEventBtnClick={addEventBtnClick} 
            setAddEventBtnClick={setAddEventBtnClick} 
          />}
          {eventClick && 
          <ReadUpdateEventForm
            axiosGet={axiosGet}
            eventTitle={eventTitle}
            eventCategory={eventCategory}
            startEventDate={startEventDate}
            endEventDate={endEventDate}
            eventClick={eventClick}
            setEventClick={setEventClick}
            eventId={eventId}
          />}
        </div>
      </div>
        
    </div>
  );
}


export default Calendarpage;

