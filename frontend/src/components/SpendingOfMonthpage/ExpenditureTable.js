import './ExpenditureInput.css';
import EachContent from './EachContent'

const ExpenditureTable = (props) => {
  
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
      )

    })
    
  );
}

export default ExpenditureTable;

