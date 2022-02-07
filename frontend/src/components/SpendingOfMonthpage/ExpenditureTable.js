import React, {useState} from 'react';
import './ExpenditureInput.css';
import EditExpenditure from '../image/수정버튼.png';
import DeleteExpenditure from '../image/삭제버튼.png';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SERVER from '../../API/server';

const ExpenditureTable = () => {
  const userData = localStorage.getItem('accessToken');

  const onSubmitHandler = (e) => {
    e.prevenDefault()
    axios
      .post(
        SERVER.BASE_URL + SERVER.ROUTES.createExpenditure,
        {
        },
        {headers: {
          Authorization: `Bearer ${userData}`
        }}
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <div className="ExpenditureTable">

      
      {/* 추가한 모든 내용 보여주기 */}
      {/* <div className='ExpenditureCreateButtonCol'>
      </div> */}
      <div className='ExpenditureDateCol mt-2'>
        fd
      </div>
      <div className='ExpenditureCategoryCol mt-2'>
        dfd
      </div>
      <div className='ExpenditureContentCol mt-2'>
        dfdf
      </div>
      <div className='ExpenditurePriceCol mt-2'>
        df
      </div>
      <div className='ExpenditureEditButtonsCol mt-2'>
        <span className='me-2'>
          <img src={EditExpenditure} alt="no" className='ExpenditureButton'/>
        </span>
        <span>
          <img src={DeleteExpenditure} alt="no" className='ExpenditureButton'/>
        </span>
      </div>
      <hr />
      
    </div>
  );
}


export default ExpenditureTable;

