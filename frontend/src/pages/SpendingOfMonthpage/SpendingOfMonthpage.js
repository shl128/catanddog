import React, {useState, useEffect, useRef} from 'react';
import './SpendingOfMonthpage.css'
import ExpenditureInput from '../../components/SpendingOfMonthpage/ExpenditureInput'
import ExpenditureTable from '../../components/SpendingOfMonthpage/ExpenditureTable'
import {numberWithCommas} from '../../components/SpendingOfMonthpage/NumberWithCommas';
import axios from 'axios';
import SERVER from '../../API/server';

const SpendingOfMonthpage = () => {
  var today = new Date();
  var nowYear = today.getFullYear();
  var nowMonth = ('0' + (today.getMonth() + 1)).slice(-2);
  var nowDay = ('0' + today.getDate()).slice(-2);
  var monthString = nowYear + '-' + nowMonth
  var dayString = nowYear + '-' + nowMonth + '-' + nowDay
  
  const ExpenditureUrl = SERVER.BASE_URL + SERVER.ROUTES.Expenditure
  const categoryFilter = useRef("전체");
  const [justMonthRender,setJustMonthRender] = useState(monthString);
  const monthFilter = useRef(monthString);
  const [expenditureFilterContents,setExpenditureFilterContents] = useState(null);
  const [totalPrice,setTotalPrice] = useState(0)
  const userData = localStorage.getItem('accessToken');

  const textAlignCenter = {
    textAlign: 'center'
  };

  function filterContentsGet() {
    axios.get(
      `${ExpenditureUrl}?expenditureCategory=${categoryFilter.current.value ? categoryFilter.current.value : categoryFilter.current}&expenditureDate=${monthFilter.current.value ? monthFilter.current.value : monthFilter.current}`,
      {headers: {
        Authorization: `Bearer ${userData}`
      }})
      .then(response => {
        setExpenditureFilterContents(response.data);
        console.log("조회 성공", response.data)
        totalPriceHandler(response.data);
      })
      .catch(() =>{
        alert("조회 실패")
      })
  }

  const totalPriceHandler = (filterContents) => {
    var total = 0
    if (!filterContents) {
      setTotalPrice(0)
    } else {
      filterContents.map((content) => {
        return total += content.expenditurePrice
      })
      setTotalPrice(total)
    }
  }

  useEffect(() => {
    filterContentsGet();
  }, []);

  const monthFilterHandler = (e) => {
    setJustMonthRender(e.target.value);
    filterContentsGet();
  };

  const categoryFilterHandler = () => {
    filterContentsGet();
  };

  if (!expenditureFilterContents) {
    return null;
  }

  return (
    <div className='SpendingOfMonthpage'>
      <div className='SpendingOfMonthHeader'>
        <h4 className='my-3'>
          <span>
            <input id="monthFilter" type="month" className="me-3" style={textAlignCenter} onChange={monthFilterHandler} value={justMonthRender} ref={monthFilter}/>
          </span>
          의
          <span>
            <select className='filter mx-3' onChange={categoryFilterHandler} ref={categoryFilter}>
              <option value="전체">전체</option>
              <option value="병원">병원</option>
              <option value="용품">용품</option>
              <option value="사료/간식">사료/간식</option>
              <option value="기타">기타</option>
            </select> 
          </span> 
          지출 금액은 총  
          <span className='redColor mx-2'>{numberWithCommas(totalPrice)}</span>
          원 입니다.
        </h4>
      </div>
      <div>
        <ExpenditureInput baseDay={dayString} axiosGet={filterContentsGet}/>
      </div>
      <div className='overflowFrame'>
        <ExpenditureTable contents={expenditureFilterContents} axiosGet={filterContentsGet}/>
      </div>
    </div>
  );
}


export default SpendingOfMonthpage;

