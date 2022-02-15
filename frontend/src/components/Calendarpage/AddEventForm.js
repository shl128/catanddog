import React, { useState, useRef } from 'react'
import { Modal, Form } from 'react-bootstrap'
import '../Mainpage/ConsultingForm.css'
import './Form.css'
import DatePicker from '../PublicComponents/DatePicker'
import axios from 'axios'
import SERVER from '../../API/server';

function AddEventForm(props) {
  const [eventTitle, setEventTitle] = useState(null)
  const [startEventDate, setStartEventDate] = useState(null);
  const [endEventDate, setEndEventDate] = useState(null);
  const [eventCategory, setEventCategory] = useState('병원')
  const userData = localStorage.getItem('accessToken');

  function createHandler() {
    
    if (eventTitle && startEventDate && endEventDate && eventCategory) {
      axios.post(
        `${SERVER.BASE_URL}${SERVER.ROUTES.Calendar}memo?category=${eventCategory}&end=${endEventDate}&start=${startEventDate}&title=${eventTitle}`,
        {
          'title':eventTitle,
          'start':startEventDate,
          'end':endEventDate,
          'category':eventCategory
        },
        {headers: {
          Authorization: `Bearer ${userData}`,
        }}
      )
      .then(() => {
        props.axiosGet();
      })
      .catch(() => {
        alert('이벤트 추가 실패')
      })
      props.setAddEventBtnClick(false)
    } else {
      alert("모두 입력하세요")
    }
  }

  return (
    <>
      <Modal dialogClassName="Consulting" show={props.addEventBtnClick} onHide={() => props.setConsultingDialog(false)} centered="true">
        <Modal.Header className='grid-for-x-btn'>
          <div className='grid-header'>
            추가할 메모 정보를 입력하세요!
          </div>
          <div className='grid-x-btn'>
            <button className='btn-style' onClick={() => props.setAddEventBtnClick(false)}>X</button>
          </div>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-2'>
              <Form.Label>메모 제목을 입력하세요</Form.Label>
              <Form.Control onChange={(e) => setEventTitle(e.target.value)} type="text" placeholder="예: 짱이 피부병 확진" />
            </Form.Group>
            <Form.Group className='mb-2'>
              <Form.Label>메모 카테고리를 지정하세요</Form.Label>
              <Form.Select aria-label="Default select example" onChange={e => setEventCategory(e.target.value)}>
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
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="Consulting-accept" onClick={createHandler}>추가하기</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddEventForm;