import Form from 'react-bootstrap/Form'

const RadioButton = (props) => {
    return(
        <span>
            {
                props.pageType === 'create'
                ?
                <Form.Check
                inline
                label={props.label}
                type={props.type}
                id={`${props.idName}-${props.type}-${props.idNum}`}
                checked={props.checkedCondition === props.checkedConditionBool}
                onChange={props.change}
                />
                :
                <Form.Check
                inline
                label={props.label}
                type={props.type}
                id={`${props.idName}-${props.type}-${props.idNum}`}
                checked={
                    props.initialKnowBirth === true
                    ? props.readKnowBirthData : props.checkedCondition === props.checkedConditionBool
                }
                onChange={props.change}
                />
            }
        </span>
        
    )
}

export default RadioButton;