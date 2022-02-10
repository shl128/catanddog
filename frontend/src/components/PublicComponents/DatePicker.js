import Form from 'react-bootstrap/Form';


const DatePicker = (props) => {

  return (
    <Form.Group controlId="duedate">
        <Form.Control
        style={props.style}
        type={props.type}
        onChange={props.change}
        value={props.baseDay}
        />
    </Form.Group>
  );
}


export default DatePicker;

