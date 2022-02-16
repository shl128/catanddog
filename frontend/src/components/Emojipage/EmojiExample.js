import React from 'react'
import CustomImageEditor from "./CustomImageEditor"
import "./EmojiExample.css"
import './EmojiExample.css'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function MyVerticallyCenteredModal(props) {
  return (
    <Modal dialogClassName="Emoji-example"
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          간단 가이드
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="Example">
        <div>
          <img className="Example-img" alt="변경 전 이미지" src={process.env.PUBLIC_URL + '/image/tie.gif'}/>
        </div>
      </div>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}


function EmojiExample() {
  const [modalShow, setModalShow] = React.useState(true);
  return (
    <div class="emojidiv">
    {/* <Button variant="primary" onClick={() => setModalShow(true)}>
      간단 가이드
    </Button> */}
      <div className="emojiexample"><CustomImageEditor /></div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      
    </div>

  )
}

export default EmojiExample;