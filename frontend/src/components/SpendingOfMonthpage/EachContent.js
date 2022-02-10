// import { useState } from 'react';
// import './ExpenditureInput.css';
// import {numberWithCommas} from './NumberWithCommas';
// import UpdateDeleteButtons from './UpdateDeleteButtons'

// const ExpenditureTable = (props) => {
//   const [isUpdating, setIsUpdating] = useState(false);

//   return (
//         <div className="ExpenditureTable mt-2" id={props.expenditureId}> 
//             <div className='ExpenditureDateCol'>
//                 {
//                     isUpdating === false
//                     ?
//                     props.expenditureDate.substring(0,10)
//                     :
//                     <DatePicker type='date' style={textAlignCenter} change={dateHandler} baseDay={props.expenditureDate}/>
//                 }
//             </div>
//             <div className='ExpenditureCategoryCol'>
//                 {content.expenditureCategory}
//             </div>
//             <div className='ExpenditureItemCol'>
//                 {content.expenditureItem}
//             </div>
//             <div className='ExpenditurePriceCol'>
//                 {numberWithCommas(content.expenditurePrice)} 원
//             </div>
//             <div className='ExpenditureEditButtonsCol'>
//                 {/* 수정 버튼 눌렀을때 handler에 Id 넘기기 */}
//                 <UpdateDeleteButtons axiosGet={props.axiosGet} expenditureId={content.expenditureId} setIsUpdating={setIsUpdating} isUpdating={isUpdating} type='update'/>
//                 <UpdateDeleteButtons axiosGet={props.axiosGet} expenditureId={content.expenditureId} type='delete'/>
//             </div>
//             <hr />
//         </div>
//   );
// }

// export default ExpenditureTable;

