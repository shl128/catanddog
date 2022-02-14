import React, { useState, useEffect } from 'react';
import './Calendarpage.css'
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import Form from 'react-bootstrap/Form'
// import events from './events'
// import Button from 'react-bootstrap/Button';
import SERVER from '../../API/server';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddScheduleForm from '../../components/Calendarpage/AddScheduleForm';

const Calendarpage = () => {
  moment.locale('en-US');
  const localizer = momentLocalizer(moment);
  const [allEvents, setAllEvents] = useState([])
  const [addEventBtnClick, setAddEventBtnClick] = useState(false)
  const [filterCategory, setFilterCategory] = useState('전체')
  const userData = localStorage.getItem('accessToken');

  function axiosGet() {
    axios.get(
      // URL 수정 필요 calendarMemoMonth 파라미터 삭제
      `${SERVER.BASE_URL}${SERVER.ROUTES.Calendar}?calendarMemoCategory=${filterCategory}`,
      {headers: {
        Authorization: `Bearer ${userData}`,
      }}
    )
    .then((res) => {
      alert('캘린더 메모 불러오기 성공')
      console.log(res.data)
      setAllEvents(res.data)
    })
    .catch(() => {
      alert('캘린더 메모 불러오기 실패')
    })
  }

  function filterHandler (e) {
    setFilterCategory(e.target.value)
    axiosGet();
  }

  useEffect(() => { axiosGet(); })

  return (
    <div className="Calendarpage">
      <div className='margin-x'>
        <div className='gridBox' >
          <Form.Select className="w-75 filterCategory mt-2" aria-label="Default select example" onChange={filterHandler} value={filterCategory}>
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
        />
        {addEventBtnClick && 
        <AddScheduleForm 
          filterCategory={filterCategory}
          setAllEvents={setAllEvents}
          addEventBtnClick={addEventBtnClick} 
          setAddEventBtnClick={setAddEventBtnClick} 
        />}
      </div>
        
    </div>
  );
}


export default Calendarpage;

