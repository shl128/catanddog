import React, { useState, useEffect, useRef } from 'react';
import './Calendarpage.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Form from 'react-bootstrap/Form'
import SERVER from '../../API/server';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddEventForm from '../../components/Calendarpage/AddEventForm';
import ReadUpdateEventForm from '../../components/Calendarpage/ReadUpdateEventForm';

const Calendarpage = () => {
  moment.locale('en-US');
  const localizer = momentLocalizer(moment);
  const [allEvents, setAllEvents] = useState([])
  const [addEventBtnClick, setAddEventBtnClick] = useState(false)
  const [eventClick, setEventClick] = useState(false)
  const filterCategory = useRef('전체');
  const userData = localStorage.getItem('accessToken');
  const [eventId, setEventId] = useState(null)

  function axiosGet() {
    axios.get(
      `${SERVER.BASE_URL}${SERVER.ROUTES.Calendar}?category=${filterCategory.current.value}`,
      {headers: {
        Authorization: `Bearer ${userData}`,
      }}
    )
    .then((res) => {
      console.log(res.data)
      setAllEvents(res.data)
    })
    .catch((err) => {
      console.log(err)
    })
  }

  function gotoReadUpdateForm(event) {
    setEventClick(true)
    setEventId(event.id)
  }

  useEffect(() => { axiosGet(); },[])
  //무한루프 도는중

  return (
    <div className="Calendarpage">
      <div className='margin-x'>
        <div className='gridBox' >
          <Form.Select className="w-75 filterCategory mt-2" aria-label="Default select example" onChange={axiosGet} ref={filterCategory} >
            <option value="전체">전체</option>
            <option value="병원">병원</option>
            <option value="식사">식사</option>
            <option value="증상">증상</option>
            <option value="기타">기타</option>
          </Form.Select>
          <button className='Button-style mt-2' onClick={() => setAddEventBtnClick(true)}>일정 추가</button>
        </div>
        <Calendar
          className='mt-2'
          localizer={localizer}
          events={allEvents}
          style={{ height: 600 }}
          onSelectEvent={event => gotoReadUpdateForm(event)}
        />
        {addEventBtnClick && 
        <AddEventForm 
          addEventBtnClick={addEventBtnClick} 
          setAddEventBtnClick={setAddEventBtnClick} 
        />}
        {eventClick && 
        <ReadUpdateEventForm
          eventClick={eventClick}
          setEventClick={setEventClick}
          eventId={eventId}
        />}
      </div>
        
    </div>
  );
}


export default Calendarpage;

