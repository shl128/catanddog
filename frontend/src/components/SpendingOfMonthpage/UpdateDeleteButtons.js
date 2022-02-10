import EditExpenditure from '../image/수정버튼.png';
import DeleteExpenditure from '../image/삭제버튼.png';
import axios from 'axios';
import SERVER from '../../API/server';

const UpdateDeleteButtons = (props) => {
    const ExpenditureUrl = SERVER.BASE_URL + SERVER.ROUTES.Expenditure
    const userData = localStorage.getItem('accessToken');

    const isUpdatingHandler = () => {
        if (props.isUpdating === false) {
        // setIsUpdating을 개인 Id 항목의 value
          props.setIsUpdating(true);
        } else {
          props.setIsUpdating(false);
          axios.patch(
            `${ExpenditureUrl}/{expenditure_id} ?expenditureCategory=${props.expenditureCategory}&expenditureDate=${props.expenditureDate}&expenditureItem=${props.expenditureItem}&expenditurePrice=${props.expenditurePrice}&expenditureId=${props.expenditureId}`,
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
            })
            .catch((err) => {
              console.log(err)
            })
        }  
      };

    const deleteHandler = () => {
        console.log(props.expenditureId)
        axios.delete(
          `${ExpenditureUrl}/{expenditure_id}?expenditureId=${props.expenditureId}`,
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
                            <img src={EditExpenditure} alt="no" className='ExpenditureButton' onClick={isUpdatingHandler}/>
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
                        <img src={DeleteExpenditure} alt="no" className='ExpenditureButton' onClick={deleteHandler}/>
                    </button>
                </span>
            }
        </span>
    )
}

export default UpdateDeleteButtons;