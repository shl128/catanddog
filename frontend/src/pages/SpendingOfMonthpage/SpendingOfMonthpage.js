import React, {useState, useEffect, useRef} from 'react';
import './SpendingOfMonthpage.css'
import ExpenditureInput from '../../components/SpendingOfMonthpage/ExpenditureInput'
import ExpenditureTable from '../../components/SpendingOfMonthpage/ExpenditureTable'
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
  const TotalPriceUrl = SERVER.BASE_URL + SERVER.ROUTES.TotalPrice
  // const [categoryFilter,setCategoryFilter] = useState('전체');
  const categoryFilter = useRef("전체");
  const [monthFilter,setMonthFilter] = useState(monthString);
  const [expenditureFilterContents,setExpenditureFilterContents] = useState(null);
  const [totalPrice,setTotalPrice] = useState(0)
  const userData = localStorage.getItem('accessToken');

  const textAlignCenter = {
    textAlign: 'center'
  };

  // async function totalPriceGet() {
  //   try {
  //     const response = await axios.get(`${TotalPriceUrl}/{expenditures_category}?expenditureCategory=${categoryFilter}&expenditureDate=${monthFilter}`,
  //     {headers: {
  //       Authorization: `Bearer ${userData}`
  //     }});
  //     setTotalPrice(response);
  //     console.log(response)
  //     console.log(totalPrice)
  //     console.log("총합계조회성공") 
  //   } catch (error) {
  //     console.log("총합계조회실패");
  //   }
  // }

  async function filterContentsGet() {
    try {
      const response = await axios.get(`${ExpenditureUrl}?expenditureCategory=${categoryFilter.current.value ? categoryFilter.current.value : categoryFilter.current}&expenditureDate=${monthFilter}`,
      {headers: {
        Authorization: `Bearer ${userData}`
      }});
      setExpenditureFilterContents(response.data);
      totalPriceHandler();
      console.log(expenditureFilterContents)
      console.log("지출내역조회성공")
      // totalPriceGet(); 
    } catch (error) {
      console.log(categoryFilter)
      console.log("지출내역조회실패");
    }
  }

  const totalPriceHandler = () => {
    console.log(expenditureFilterContents)
    var total = 0
    if (!expenditureFilterContents) {
      setTotalPrice(0)
    } else {
      console.log(expenditureFilterContents)
      expenditureFilterContents.map((content) => {
        return total += content.expenditurePrice
      })
      setTotalPrice(total)
    }
  }

  useEffect(() => {
    console.log(categoryFilter.current)
    filterContentsGet();
  }, []);

  const monthFilterHandler = (e) => {
    setMonthFilter(e.target.value);
    filterContentsGet();
    totalPriceHandler();
  };

  const categoryFilterHandler = (e) => {
    // setCategoryFilter(e.target.value);
    filterContentsGet();
    totalPriceHandler();
  };

  if (!expenditureFilterContents) {
    return null;
  }

  return (
    <div className='SpendingOfMonthpage'>
      <div className='SpendingOfMonthHeader'>
        <h3 className='my-3'>
          <span>
            <input id="monthFilter" type="month" className="me-3" style={textAlignCenter} onChange={monthFilterHandler} value={monthFilter}/>
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
          지출 금액은 총 {totalPrice}원 입니다.
        </h3>
      </div>
      <div>
        <ExpenditureInput baseDay={dayString}/>
      </div>
      <div>
        <ExpenditureTable contents={expenditureFilterContents}/>
      </div>
    </div>
  );
}


export default SpendingOfMonthpage;

