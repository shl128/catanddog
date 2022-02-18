import React, { useState } from 'react';
import './WithdrawalModal.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const WithdrawalModal = (props) => {
  return (
    <div>
      <div onClick={props.handleShow} className='Withdrawal'>
        회원을 탈퇴하시겠습니까?
      </div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='WithdTitle'>회원 탈퇴</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img className='plizImg' src={process.env.PUBLIC_URL + '/image/pliz.jpg'} alt="noimg"></img>
          <div className='qfont'>진짜 회원 탈퇴 할거에요?</div>
        </Modal.Body>
        <Modal.Footer>
          
          <button className='mypage-closebutton' onClick={props.handleClose}>
            Close
          </button>
          <button className='mypage-WithdrawalButton' onClick={props.onwithdrawal}>
            회원 탈퇴
          </button>
        </Modal.Footer>
      </Modal>
    </div>
    
  )
}
export default WithdrawalModal;