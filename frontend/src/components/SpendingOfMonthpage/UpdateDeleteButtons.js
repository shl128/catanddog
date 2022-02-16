import axios from 'axios';
import DateCalculation from '../../components/PublicComponents/DateCalculation';
import SERVER from '../../API/server';

const UpdateDeleteButtons = (props) => {
    const ExpenditureUrl = SERVER.BASE_URL + SERVER.ROUTES.Expenditure
    const userData = localStorage.getItem('accessToken');

    const isUpdatingHandler = () => {
      if (props.isUpdating === false) {
        axios.get(
          `${ExpenditureUrl}One?expenditureId=${props.expenditureId}`,
          {headers: {
            Authorization: `Bearer ${userData}`
          }})
          .then((res) => {
            props.setExpenditureDate(DateCalculation(res.data[0].expenditureDate.substring(0,10),1))
            props.setExpenditureCategory(res.data[0].expenditureCategory)
            props.setExpenditureItem(res.data[0].expenditureItem)
            props.setExpenditurePrice(res.data[0].expenditurePrice)
          })
          .catch((err) => {
            console.log(err)
          })
        props.setIsUpdating(true);
      } else {
        if (!parseInt(props.expenditurePrice)) {
          alert("결제 금액에 숫자를 입력하십시오.")
        } else {
          axios.patch(
            `${ExpenditureUrl}?expenditureCategory=${props.expenditureCategory}&expenditureDate=${props.expenditureDate}&expenditureItem=${props.expenditureItem}&expenditurePrice=${props.expenditurePrice}&expenditureId=${props.expenditureId}`,
            {
              'expenditureDate':props.expenditureDate,
              'expenditureCategory':props.expenditureCategory,
              'expenditureItem':props.expenditureItem,
              'expenditurePrice':props.expenditurePrice,
              'expenditureId':props.expenditureId
            },
            {headers: {
              Authorization: `Bearer ${userData}`
            }})
            .then((res) => {
              console.log(res)
              props.axiosGet()
              props.setIsUpdating(false);
            })
            .catch((err) => {
              console.log(err)
            })
        }
        }  
      };

    const deleteHandler = () => {
        console.log(props.expenditureId)
        axios.delete(
          `${ExpenditureUrl}?expenditureId=${props.expenditureId}`,
          {headers: {
            Authorization: `Bearer ${userData}`
          }})
          .then((res) => {
            console.log(res)
            props.axiosGet()
          })
          .catch((err) => {
            console.log(err)
          })
      }


    return(
        <span>
            {
                props.type === 'update'
                ?
                <span className='me-2'>
                    {
                        props.isUpdating === false
                        ?
                        <button className='ExpenditureButton'>
                            <img src={process.env.PUBLIC_URL + '/image/edit.png'} alt="no" className='ExpenditureButton' onClick={isUpdatingHandler}/>
                        </button>
                        :
                        <button className='ExpenditureButton' onClick={isUpdatingHandler}>
                            Edit
                        </button>
                    }
                </span>
                :
                <span>
                    <button className='ExpenditureButton'>
                        <img src={process.env.PUBLIC_URL + '/image/delete.png'} alt="no" className='ExpenditureButton' onClick={deleteHandler}/>
                    </button>
                </span>
            }
        </span>
    )
}

export default UpdateDeleteButtons;