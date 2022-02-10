import { useState } from 'react';
import './ExpenditureInput.css';
import {numberWithCommas} from './NumberWithCommas';
import UpdateDeleteButtons from './UpdateDeleteButtons'
import UpdateForm from './UpdateForm'
import EachContent from './EachContent'

const ExpenditureTable = (props) => {
  const [isUpdating, setIsUpdating] = useState(false);//광범위한 state 없애고 개인 state 생성
  
  return (
    props.contents.map((content) => {
      return (
        <EachContent
        expenditureDate={content.expenditureDate}
        expenditureCategory={content.expenditureCategory}
        expenditureItem={content.expenditureItem}
        expenditurePrice={content.expenditurePrice}
        expenditureId={content.expenditureId}
        axiosGet={props.axiosGet}
        />
        // <div>
        //   {
        //     isUpdating === true
        //     ?
        //     <UpdateForm
        //     isUpdating={isUpdating}
        //     setIsUpdating={setIsUpdating}
        //     expenditureDate={content.expenditureDate}
        //     expenditureCategory={content.expenditureCategory}
        //     expenditureItem={content.expenditureItem}
        //     expenditurePrice={content.expenditurePrice}
        //     expenditureId={content.expenditureId}
        //     axiosGet={props.axiosGet}
        //     />
        //     :
        //     <div className="ExpenditureTable mt-2" id={content.expenditureId}> 
        //       <div className='ExpenditureDateCol'>
        //         {content.expenditureDate.substring(0,10)}
        //       </div>
        //       <div className='ExpenditureCategoryCol'>
        //         {content.expenditureCategory}
        //       </div>
        //       <div className='ExpenditureItemCol'>
        //         {content.expenditureItem}
        //       </div>
        //       <div className='ExpenditurePriceCol'>
        //         {numberWithCommas(content.expenditurePrice)} 원
        //       </div>
        //       <div className='ExpenditureEditButtonsCol'>
        //         {/* 수정 버튼 눌렀을때 handler에 Id 넘기기 */}
        //         <UpdateDeleteButtons axiosGet={props.axiosGet} expenditureId={content.expenditureId} setIsUpdating={setIsUpdating} isUpdating={isUpdating} type='update'/>
        //         <UpdateDeleteButtons axiosGet={props.axiosGet} expenditureId={content.expenditureId} type='delete'/>
        //       </div>
        //       <hr />
        //     </div>
        //   }
        // </div>
      )

    })
    
  );
}

export default ExpenditureTable;

