const DateCalculation = (sDate, nNum) => {
  var yyyy = parseInt(sDate.substring(0, 4));
  var mm = parseInt(sDate.substring(5, 7));
  var dd = parseInt(sDate.substring(8, 10));

  var temp = new Date(yyyy, mm-1, dd + nNum);
  
  yyyy = temp.getFullYear();
  mm = temp.getMonth() + 1; mm = (mm < 10) ? '0' + mm : mm;
  dd = temp.getDate(); dd = (dd < 10) ? '0' + dd : dd;
  return yyyy + '-' +  mm  + '-' + dd;
}

export default DateCalculation;