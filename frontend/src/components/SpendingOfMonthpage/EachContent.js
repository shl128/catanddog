import { useState } from 'react';
import './ExpenditureInput.css';
import DateCalculation from '../../components/PublicComponents/DateCalculation';
import {numberWithCommas} from './NumberWithCommas';
import UpdateDeleteButtons from './UpdateDeleteButtons'
import DatePicker from '../PublicComponents/DatePicker';
import Form from 'react-bootstrap/Form';

const EachContent = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [expenditureDate, setExpenditureDate] = useState(DateCalculation(props.expenditureDate.substring(0,10),1))
  const [expenditureCategory, setExpenditureCategory] = useState(props.expenditureCategory)
  const [expenditureItem, setExpenditureItem] = useState(props.expenditureItem)
  const [expenditurePrice, setExpenditurePrice] = useState(props.expenditurePrice)
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

  return (
        <div className="ExpenditureTable mt-2 divFixHeight" id={props.expenditureId}> 
            <div className='ExpenditureDateCol'>
                {
                    isUpdating === false
                    ?
                    DateCalculation(props.expenditureDate.substring(0,10),1)
                    :
                    <DatePicker type='date' style={textAlignCenter} change={dateHandler} baseDay={expenditureDate}/>
                }
            </div>
            <div className='ExpenditureCategoryCol'>
                {
                    isUpdating === false
                    ?
                    props.expenditureCategory
                    :
                    <Form.Select aria-label="Default select example" style={textAlignCenter} onChange={categoryHandler} value={expenditureCategory}>
                        <option value="병원">병원</option>
                        <option value="용품">용품</option>
                        <option value="사료/간식">사료/간식</option>
                        <option value="기타">기타</option>
                    </Form.Select>
                }
            </div>
            <div className='ExpenditureItemCol'>
                {
                    isUpdating === false
                    ?
                    props.expenditureItem
                    :
                    <Form.Control id="ExpenditureItem" type="text" placeholder="구매 항목" onChange={itemHandler} value={expenditureItem}/>
                }
            </div>
            <div className='ExpenditurePriceCol'>
                {
                    isUpdating === false
                    ?
                    <span>
                        {numberWithCommas(props.expenditurePrice)} 원
                    </span>
                    :
                    <Form.Control id="ExpenditurePrice" type="text" placeholder="결제 금액 [ex)만원=>10000]" onChange={priceHandler} style={textAlignCenter} value={expenditurePrice}/>
                }
            </div>
            <div className='ExpenditureEditButtonsCol'>
                <UpdateDeleteButtons axiosGet={props.axiosGet}  
                setIsUpdating={setIsUpdating} isUpdating={isUpdating} type='update'
                expenditureId={props.expenditureId}
                expenditureDate={expenditureDate} setExpenditureDate={setExpenditureDate}
                expenditureCategory={expenditureCategory} setExpenditureCategory={setExpenditureCategory}
                expenditureItem={expenditureItem} setExpenditureItem={setExpenditureItem}
                expenditurePrice={expenditurePrice} setExpenditurePrice={setExpenditurePrice}
                />
                <UpdateDeleteButtons axiosGet={props.axiosGet} expenditureId={props.expenditureId} type='delete'/>
            </div>
            <hr />
        </div>
  );
}

export default EachContent;

