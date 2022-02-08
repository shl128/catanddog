import React, {useState} from 'react';
import './ExpenditureInput.js';
import CreateExpenditure from '../image/추가버튼.png';
import DatePicker from '../PublicComponents/DatePicker'
import SelectBox from '../PublicComponents/SelectBox'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SERVER from '../../API/server';

const ExpenditureInput = (props) => {
  const [expenditureDate, setExpenditureDate] = useState(props.baseDay)
  const [expenditureCategory, setExpenditureCategory] = useState("병원")
  const [expenditureItem, setExpenditureItem] = useState(null)
  const [expenditurePrice, setExpenditurePrice] = useState(null)
  const userData = localStorage.getItem('accessToken');
  const textAlignCenter = {
    textAlign: 'center'
  };
  const dateHandler = (e) => {
    setExpenditureDate(e.target.value)
  }
  const categoryHandler = (e) => {
    setExpenditureCategory(e.target.value)
  }
  const itemHandler = (e) => {
    setExpenditureItem(e.target.value)
  }
  const priceHandler = (e) => {
    setExpenditurePrice(e.target.value)
  }
  const onSubmitHandler = (e) => {
    e.prevenDefault()
    axios
      .post(
        SERVER.BASE_URL + SERVER.ROUTES.Expenditure,
        {
          'expenditureDate': expenditureDate,
          'expenditureCategory': expenditureCategory,
          'expenditureItem': expenditureItem,
          'expenditurePrice': expenditurePrice
        },
        {headers: {
          Authorization: `Bearer ${userData}`
        }}
      )
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }

  return (
    <div className="ExpenditureTable">
      <div className='ExpenditureCreateButtonCol'>
        <button className='ExpenditureButton' onClick={onSubmitHandler}>
          <img src={CreateExpenditure} alt="no" className='ExpenditureButton'/>
        </button>
      </div>
      <div className='ExpenditureDateCol'>
        <DatePicker type='date' style={textAlignCenter} change={dateHandler} baseDay={expenditureDate}/>
      </div>
      <div className='ExpenditureCategoryCol'>
        <Form.Select aria-label="Default select example" style={textAlignCenter} onChange={categoryHandler}>
          <option value="병원">병원</option>
          <option value="용품">용품</option>
          <option value="사료/간식">사료/간식</option>
          <option value="기타">기타</option>
        </Form.Select>
      </div>
      <div className='ExpenditureItemCol'>
        <Form.Control id="ExpenditureItem" type="text" placeholder="구매 항목" onChange={itemHandler}/>
      </div>
      <div className='ExpenditurePriceCol'>
        <Form.Control id="ExpenditurePrice" type="text" placeholder="결제 금액" onChange={priceHandler}/>
      </div>
    </div>
  );
}


export default ExpenditureInput;

