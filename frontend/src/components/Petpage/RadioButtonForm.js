import Form from 'react-bootstrap/Form'
import RadioButton from './RadioButton'
const RadioButtonForm = (props) => {
    const checkedConditionTrue = true
    const checkedConditionFalse = false

    return(
        <span>
            {
                props.pageType === 'create'
                ?
                <Form>
                    {['radio'].map((type) => (
                    <div key={`birthday-${type}`} className="mb-3">
                        <RadioButton
                        label={props.label[0]}
                        type={type}
                        idName={props.idName}
                        idNum='1'
                        checkedCondition={props.checkedCondition}
                        checkedConditionBool={checkedConditionTrue}
                        change={props.change}
                        pageType={props.pageType}
                        />
                        <RadioButton
                        label={props.label[1]}
                        type={type}
                        idName={props.idName}
                        idNum='2'
                        checkedCondition={props.checkedCondition}
                        checkedConditionBool={checkedConditionFalse}
                        change={props.change}
                        pageType={props.pageType}
                        />
                    </div>
                    ))}
                </Form>
                :
                <Form>
                    {['radio'].map((type) => (
                    <div key={`birthday-${type}`} className="mb-3">
                        <RadioButton
                        label={props.label[0]}
                        type={type}
                        idName={props.idName}
                        idNum='1'
                        checkedCondition={props.checkedCondition}
                        checkedConditionBool={checkedConditionTrue}
                        readKnowBirthData={props.readKnowBirthData}
                        initialKnowBirth={props.initialKnowBirth}
                        change={props.change}
                        pageType={props.pageType}
                        />
                        <RadioButton
                        label={props.label[1]}
                        type={type}
                        idName={props.idName}
                        idNum='2'
                        checkedCondition={props.checkedCondition}
                        checkedConditionBool={checkedConditionFalse}
                        readKnowBirthData={!props.readKnowBirthData}
                        initialKnowBirth={props.initialKnowBirth}
                        change={props.change}
                        pageType={props.pageType}
                        />
                    </div>
                    ))}
                </Form>
            }
        </span>
       
    )
}

export default RadioButtonForm;