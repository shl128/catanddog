import Form from 'react-bootstrap/Form';


const SelectBox = (props) => {
  function pushSelectOptionItems(data) {
     
    let selectEl = document.querySelector("#select"); 
    var plusOption = document.createElement("option"); 
    for (let i = 0; i < selectEl.length; i++) {
      selectEl.options.remove()
    }
    for (const item of data) {
      plusOption.text = item; 
      plusOption.value = item; 
      selectEl.options.add(plusOption); 
    }
  }



  return (
    <Form.Select id="select" style={props.style} onChange={props.change} data={props.data}>
    </Form.Select>
    // <Form.Select aria-label="Default select example" style={props.style} onChange={props.change}>
    //     <option value="병원">병원</option>
    //     <option value="용품">용품</option>
    //     <option value="사료/간식">사료/간식</option>
    //     <option value="기타">기타</option>
    // </Form.Select>
  );
}


export default SelectBox;

