import React, {useState} from 'react';
import './ExpenditureInput.css';
import CreateExpenditure from '../image/추가버튼.png';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import SERVER from '../../API/server';

const ExpenditureInput = () => {
  const [expenditureFilter, setExpenditureFilter] = useState("전체")
  const [expenditureDate, setExpenditureDate] = useState(null)
  const [expenditureCategory, setExpenditureCategory] = useState("병원")
  const [expenditureContent, setExpenditureContent] = useState(null)
  const [expenditurePrice, setExpenditurePrice] = useState(null)
  const userData = localStorage.getItem('accessToken');

  const onSubmitHandler = (e) => {
    e.prevenDefault()
    axios
      .post(
        SERVER.BASE_URL + SERVER.ROUTES.createExpenditure,
        {
          'expenditureDate': expenditureDate,
          'expenditureCategory': expenditureCategory,
          'expenditureContent': expenditureContent,
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
        console.log(error);
      });
  }

  return (
    <div className="ExpenditureTable">
      <div className='ExpenditureCreateButtonCol'>
        <img src={CreateExpenditure} alt="no" className='ExpenditureButton' onClick={onSubmitHandler}/>
      </div>
      <div className='ExpenditureDateCol'>
        <Form.Group controlId="duedate">
          <Form.Control
            style={{textAlign:'center'}}
            type="date"
            name="duedate"
            placeholder="Due date"

            // value={date}
            // onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
      </div>
      <div className='ExpenditureCategoryCol'>
        <Form.Select aria-label="Default select example" style={{textAlign:'center'}}>
          <option value="병원">병원</option>
          <option value="용품">용품</option>
          <option value="사료간식">사료/간식</option>
          <option value="기타">기타</option>
        </Form.Select>
      </div>
      <div className='ExpenditureContentCol'>
        <Form.Control id="ExpenditureContent" type="text" placeholder="구매 항목"/>
      </div>
      <div className='ExpenditurePriceCol'>
        <Form.Control id="ExpenditurePrice" type="text" placeholder="결제 금액"/>
      </div>
      
    </div>
  );
}


export default ExpenditureInput;

