import { useState } from 'react';
import './ExpenditureInput.css';
import UpdateDeleteButtons from './UpdateDeleteButtons'
import { Form } from 'react-bootstrap';
import DatePicker from '../PublicComponents/DatePicker';

const UpdateForm = (props) => {
  var YYYYMMDD = props.expenditureDate.substring(0,10);
  const [expenditureDate, setExpenditureDate] = useState(YYYYMMDD)
  const [expenditureCategory, setExpenditureCategory] = useState(props.expenditureCategory)
  const [expenditureItem, setExpenditureItem] = useState(props.expenditureItem)
  const [expenditurePrice, setExpenditurePrice] = useState(props.expenditurePrice)
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
  const textAlignCenter = {
    textAlign: 'center'
  };
  return (
        <div>
            <div className="ExpenditureTable">
                <div className='ExpenditureDateCol'>
                    <DatePicker type='date' style={textAlignCenter} change={dateHandler} baseDay={expenditureDate}/>
                </div>
                <div className='ExpenditureCategoryCol'>
                    <Form.Select aria-label="Default select example" style={textAlignCenter} onChange={categoryHandler} value={expenditureCategory}>
                        <option value="병원">병원</option>
                        <option value="용품">용품</option>
                        <option value="사료/간식">사료/간식</option>
                        <option value="기타">기타</option>
                    </Form.Select>
                </div>
                <div className='ExpenditureItemCol'>
                    <Form.Control id="ExpenditureItem" type="text" placeholder="구매 항목" onChange={itemHandler} value={expenditureItem}/>
                </div>
                <div className='ExpenditurePriceCol'>
                    <Form.Control id="ExpenditurePrice" type="text" placeholder="결제 금액 [ex)만원=>10000]" onChange={priceHandler} style={textAlignCenter} value={expenditurePrice}/>
                </div>
                <div className='ExpenditureEditButtonsCol'>
                    <UpdateDeleteButtons axiosGet={props.axiosGet} 
                    expenditureId={props.expenditureId} 
                    setIsUpdating={props.setIsUpdating} isUpdating={props.isUpdating} type='update'
                    expenditureDate={expenditureDate}
                    expenditureCategory={expenditureCategory}
                    expenditureItem={expenditureItem}
                    expenditurePrice={expenditurePrice}
                    />
                    <UpdateDeleteButtons axiosGet={props.axiosGet} expenditureId={props.expenditureId} type='delete'/>
                </div>
                <hr />
            </div> 
        </div>
      )
    
    
  
}

export default UpdateForm;

