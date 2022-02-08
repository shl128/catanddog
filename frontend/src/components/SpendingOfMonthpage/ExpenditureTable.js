import {useState, useEffect} from 'react';
import './ExpenditureInput.css';
import EditExpenditure from '../image/수정버튼.png';
import DeleteExpenditure from '../image/삭제버튼.png';
// import {numberWithCommas} from './NumberWithCommas';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SERVER from '../../API/server';

const ExpenditureTable = (props) => {
  const userData = localStorage.getItem('accessToken');

  const numberWithCommas = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const onUpdateHandler = (e) => {
    e.prevenDefault()

  }

  const onDeleteHandler = (e) => {
    e.prevenDefault()
  }

  return (
    props.contents.map((content) => {
      return (
        <div className="ExpenditureTable mt-2">
          <div className='ExpenditureDateCol'>
            {content.expenditureDate.substring(0,10)}
          </div>
          <div className='ExpenditureCategoryCol'>
            {content.expenditureCategory}
          </div>
          <div className='ExpenditureItemCol'>
            {content.expenditureItem}
          </div>
          <div className='ExpenditurePriceCol'>
            {numberWithCommas(content.expenditurePrice)} 원
          </div>
          <div className='ExpenditureEditButtonsCol'>
            <span className='me-2'>
              <button className='ExpenditureButton'>
                <img src={EditExpenditure} alt="no" className='ExpenditureButton'/>
              </button>
            </span>
            <span>
              <button className='ExpenditureButton'>
                <img src={DeleteExpenditure} alt="no" className='ExpenditureButton'/>
              </button>
            </span>
          </div>
          <hr />
        </div>
      )

    })
    
  );
}

export default ExpenditureTable;

