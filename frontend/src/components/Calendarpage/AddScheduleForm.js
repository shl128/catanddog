import React, { useState, useRef, useEffect } from 'react'
import { Modal, Form } from 'react-bootstrap'
import '../Mainpage/ConsultingForm.css'
import DatePicker from '../PublicComponents/DatePicker'
import axios from 'axios'
import SERVER from '../../API/server';

function AddScheduleForm(props) {
  const eventTitle = useRef()
  const [startEventDate, setStartEventDate] = useState(null);
  const [endEventDate, setEndEventDate] = useState(null);
  const eventCategory = useRef()
  const [newEvent, setNewEvent] = useState({title:'', start:'', end:''})
  // const eventContent = useRef()
  const userData = localStorage.getItem('accessToken');
  
  function axiosGet() {
    axios.get(
      // URL 수정 필요 calendarMemoMonth 파라미터 삭제
      `${SERVER.BASE_URL}${SERVER.ROUTES.Calendar}?calendarMemoCategory=${props.filterCategory}`,
      {headers: {
        Authorization: `Bearer ${userData}`,
      }}
    )
    .then((res) => {
      alert('캘린더 메모 불러오기 성공')
      console.log(res.data)
      props.setAllEvents(res.data)
    })
    .catch(() => {
      alert('캘린더 메모 불러오기 실패')
    })
  }

  function createHandler() {
    
    if (eventTitle.current.value && startEventDate.current.value && endEventDate.current.value && eventCategory.current.value) {
      axios.post(
        // URL 수정 필요
        `${SERVER.BASE_URL}${SERVER.ROUTES.Calendar}`,
        {
          'calendarMemoTitle':eventTitle,
          // 'calendarMemoContent':eventContent,
          'calendarMemoStartDate':startEventDate,
          'calendarMemoEndDate':endEventDate,
          'calendarMemoCategory':eventCategory
        },
        {headers: {
          Authorization: `Bearer ${userData}`,
        }}
      )
      .then(() => {
        alert('이벤트 추가 성공')
        axiosGet();
      })
      .catch(() => {
        alert('이벤트 추가 실패')
      })
      props.setAddEventBtnClick(false)
    } else {
      alert("제목, 날짜, 카테고리, 내용을 모두 입력하세요")
    }
  }

  // useEffect(() => { axiosGet() })

  return (
    <>
      <Modal dialogClassName="Consulting" show={props.addEventBtnClick} onHide={() => props.setConsultingDialog(false)} centered="true">
        <Modal.Header>
          추가할 메모 정보를 입력하세요!
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-2'>
              <Form.Label>메모 제목을 입력하세요</Form.Label>
              <Form.Control ref={eventTitle} type="text" placeholder="예: 짱이 피부병 확진" />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>메모 카테고리를 지정하세요</Form.Label>
              <Form.Select aria-label="Default select example" ref={eventCategory}>
                <option value="병원">병원</option>
                <option value="식사">식사</option>
                <option value="증상">증상</option>
                <option value="기타">기타</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>날짜를 지정하세요</Form.Label>
              <div className='gridBox'>
                <div className='date-label'>시작 날짜 : </div>
                <div className='date-picker'>
                  <DatePicker type='date' change={(e) => setStartEventDate(e.target.value)}/>
                </div>
              </div>
              <div className='gridBox'>
                <div className='date-label'>종료 날짜 : </div>
                <div className='date-picker'>
                  <DatePicker type='date' change={(e) => setEndEventDate(e.target.value)}/>
                </div>
              </div>
            </Form.Group>
            {/* <Form.Group>
              <Form.Label>이벤트 내용을 입력하세요</Form.Label>
              <Form.Control ref={eventContent} as="textarea" placeholder="예: 피부병 진단받고 약처방 받음"/>
            </Form.Group> */}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="Consulting-accept" onClick={createHandler}>추가하기</button>
          <button className="Consulting-cancel" onClick={() => props.setAddEventBtnClick(false)}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddScheduleForm;