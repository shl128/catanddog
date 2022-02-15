import React, { useState, useEffect } from 'react'
import { Modal, Form } from 'react-bootstrap'
import '../Mainpage/ConsultingForm.css'
import DatePicker from '../PublicComponents/DatePicker'
import axios from 'axios'
import SERVER from '../../API/server';

function ReadUpdateForm(props) {
  const [eventTitle, setEventTitle] = useState(props.eventTitle);
  const [startEventDate, setStartEventDate] = useState(props.startEventDate);
  const [endEventDate, setEndEventDate] = useState(props.endEventDate);
  const [eventCategory, setEventCategory] = useState(props.eventCategory);
  const [updateEventBtnClick, setUpdateEventBtnClick] = useState(false)
  
  const userData = localStorage.getItem('accessToken');
  
  function axiosGet() {
    axios.get(
      `${SERVER.BASE_URL}${SERVER.ROUTES.Calendar}memo?id=${props.eventId}`,
      {headers: {
        Authorization: `Bearer ${userData}`,
      }}
    )
    .then((res) => {
      var tempStart = res.data[0].start.substring(0,10)
      var tempEnd = res.data[0].end.substring(0,10)
      setEventTitle(res.data[0].title)
      setStartEventDate(tempStart)
      setEndEventDate(tempEnd)
      setEventCategory(res.data[0].category)
    })
    .catch(() => {
      console.log('실패함')
    })
  }

  function updateHandler() {
    if (eventTitle && startEventDate && endEventDate && eventCategory) {
      axios.patch(
        `${SERVER.BASE_URL}${SERVER.ROUTES.Calendar}memo?category=${eventCategory}&end=${endEventDate}&start=${startEventDate}&title=${eventTitle}&id=${props.eventId}`,
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
        props.setEventClick(false);
        props.axiosGet();
      })
      .catch(() => {
        alert('수정 실패')
      })
    } else {
      alert("제목, 날짜, 카테고리, 내용을 모두 입력하세요")
    }
  }

  function updateCancelHandler() {
    setUpdateEventBtnClick(false);
    axiosGet();
  }

  function deleteHandler() {
    axios.delete(
      `${SERVER.BASE_URL}${SERVER.ROUTES.Calendar}memo?id=${props.eventId}`,
      {headers: {
        Authorization: `Bearer ${userData}`,
      }}
    )
    .then(() => {
      props.setEventClick(false);
      props.axiosGet();
      // window.location.reload();
    })
    .catch(() => {
      console.log('삭제실패')
    })
  }

  useEffect(() => { props.axiosGet(); },[])

  return (
      <Modal dialogClassName="Consulting" show={props.eventClick} centered="true">
        {
          updateEventBtnClick === true 
          ? 
          <Modal.Header className='grid-for-x-btn'>
            <div className='grid-header'>
              수정할 메모 정보를 입력하세요!
            </div>
            <div className='grid-x-btn'>
              <button className='btn-style' onClick={() => props.setEventClick(false)}>X</button>
            </div>
          </Modal.Header>
          : 
          <Modal.Header className='grid-for-x-btn'>
            <div className='grid-header'>
              등록된 메모 정보입니다.
            </div>
            <div className='grid-x-btn'>
              <button className='btn-style' onClick={() => props.setEventClick(false)}>X</button>
            </div>
          </Modal.Header>
        }
        <Modal.Body>
          <Form>
            <Form.Group className='mb-2'>
                {
                  updateEventBtnClick === true
                  ?
                  <>
                    <Form.Label>메모 제목을 입력하세요</Form.Label>
                    <Form.Control onChange={(e) => setEventTitle(e.target.value)} type="text" placeholder="예: 짱이 피부병 확진" value={eventTitle}/>
                    <hr />
                  </>
                  :
                  <>
                    <Form.Label>메모 제목</Form.Label>
                    <div>{eventTitle}</div>
                    <hr />
                  </>
                }
            </Form.Group>
            <Form.Group className='mb-2'>
              {
                updateEventBtnClick === true
                ?
                <>
                <Form.Label>메모 카테고리를 지정하세요</Form.Label>
                <Form.Select aria-label="Default select example" onChange={(e) => setEventCategory(e.target.value)} value={eventCategory}>
                  <option value="병원">병원</option>
                  <option value="식사">식사</option>
                  <option value="증상">증상</option>
                  <option value="기타">기타</option>
                </Form.Select>
                <hr />
                </>
                :
                <>
                <Form.Label>메모 카테고리</Form.Label>
                <div>{eventCategory}</div>
                <hr />
                </>
              }
            </Form.Group>
            <Form.Group className='mb-2'>
              {
                updateEventBtnClick === true
                ?
                <>
                <Form.Label>날짜를 지정하세요</Form.Label>
                <div className='gridBox'>
                  <div className='date-label'>시작 날짜 : </div>
                  <div className='date-picker'>
                    <DatePicker type='date' change={(e) => setStartEventDate(e.target.value)} baseDay={startEventDate}/>
                  </div>
                </div>
                <div className='gridBox'>
                  <div className='date-label'>종료 날짜 : </div>
                  <div className='date-picker'>
                    <DatePicker type='date' change={(e) => setEndEventDate(e.target.value)} baseDay={endEventDate}/>
                  </div>
                </div>
                </>
                :
                <>
                <Form.Label>날짜</Form.Label>
                <div className='gridBox'>
                  <div className='date-label'>시작 날짜 : </div>
                  <div className='date-picker'>
                    {startEventDate}
                  </div>
                </div>
                <div className='gridBox'>
                  <div className='date-label'>종료 날짜 : </div>
                  <div className='date-picker'>
                    {endEventDate}
                  </div>
                </div>
                </>
              }
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          {
            updateEventBtnClick === false
            ?
            <>
            <button className="Consulting-accept" onClick={() => setUpdateEventBtnClick(true)}>수정하기</button>
            <button className="Consulting-accept" onClick={deleteHandler}>삭제하기</button>
            </>
            :
            <>
            <button className="Consulting-accept" onClick={updateHandler}>수정완료</button>
            <button className="Consulting-cancel" onClick={updateCancelHandler}>수정취소</button>
            </>
          }
        </Modal.Footer>
      </Modal>
    
  );
}

export default ReadUpdateForm;