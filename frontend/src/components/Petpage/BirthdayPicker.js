import Form from 'react-bootstrap/Form'

const BirthdayPicker = (props) => {
    return(
        <Form.Group controlId="duedate">
            <Form.Control
                type={props.type}
                placeholder="Due date"
                id={props.idName}
                required onChange={props.change}
                value={props.baseDay}
            />
        </Form.Group>   
    )
}

export default BirthdayPicker;