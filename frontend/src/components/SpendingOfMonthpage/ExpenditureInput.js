import React, {useState} from 'react';
import './ExpenditureInput.js';
import DatePicker from '../PublicComponents/DatePicker'
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SERVER from '../../API/server';

const ExpenditureInput = (props) => {
  const [expenditureDate, setExpenditureDate] = useState(props.baseDay)
  const [expenditureCategory, setExpenditureCategory] = useState("병원")
  const [expenditureItem, setExpenditureItem] = useState(null)
  const [expenditurePrice, setExpenditurePrice] = useState(null)
  const userData = localStorage.getItem('accessToken');
  const ExpenditureUrl = SERVER.BASE_URL + SERVER.ROUTES.Expenditure
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
    console.log(e.target.value)
    setExpenditureItem(e.target.value)
  }
  const priceHandler = (e) => {
    setExpenditurePrice(e.target.value)
  }
  const onSubmitHandler = (e) => {
    e.preventDefault()
    const newContents = {
      'expenditureDate': expenditureDate,
      'expenditureCategory': expenditureCategory,
      'expenditureItem': expenditureItem,
      'expenditurePrice': expenditurePrice
    }
    if (!parseInt(expenditurePrice)) {
      alert("결제 금액에 숫자를 입력하십시오.")
    }
    axios
      .post(
        `${ExpenditureUrl}?expenditureCategory=${expenditureCategory}&expenditureDate=${expenditureDate}&expenditureItem=${expenditureItem}&expenditurePrice=${expenditurePrice}`,
        newContents,
        {headers: {
          Authorization: `Bearer ${userData}`
        }}
      )
      .then(function (response) {
        console.log(response)
      })
      .then(() => {  
        props.axiosGet()
      }) 
      .catch(function (error) {
        console.log(error);
      });

  }

  return (
    <div>
      <div className="ExpenditureTable">
       <div className='ExpenditureCreateButtonCol'>
         {
            expenditureItem === null || expenditurePrice === null || expenditureItem === '' || expenditurePrice === ''
            ? <img src={process.env.PUBLIC_URL + '/image/nonplus.jpg'} alt="no" className='ExpenditureButton'/>
            :
            <button className='ExpenditureButton' onClick={onSubmitHandler}>
              <img src={process.env.PUBLIC_URL + '/image/plus.png'} alt="no" className='ExpenditureButton'/>
            </button>
          }
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
          <Form.Control id="ExpenditurePrice" type="text" placeholder="결제 금액 [ex)만원=>10000]" onChange={priceHandler} style={textAlignCenter}/>
        </div>
        <hr />
      </div> 
    </div>
  );
}


export default ExpenditureInput;

