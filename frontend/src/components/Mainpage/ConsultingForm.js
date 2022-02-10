import React, { useRef } from 'react'
import { Modal, Form } from 'react-bootstrap'
import './ConsultingForm.css'

function ConsultingForm(props) {
  const inputName = useRef()
  const inputKind = useRef()
  const inputSymptom = useRef()

  function submitForm() {
    
    if (inputKind.current.value && inputSymptom.current.value && inputName.current.value) {
      props.setFindDocterDialog(true)
      props.setConsultingDialog(false)
      const inputData = {
        petName: inputName.current.value,
        petKind: inputKind.current.value,
        petContent: inputSymptom.current.value
      }
      props.setConsultingData(inputData)
    } else {
      alert("이름, 종, 증상을 모두 입력하세요")
    }
  }

  return (
    <>
      <Modal dialogClassName="Consulting" show={props.consultingDialog} onHide={() => props.setConsultingDialog(false)} centered="true">
        <Modal.Header>
          내용을 입력하시면 더 좋은 상담을 진행할 수 있어요
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>이름을 입력하세요</Form.Label>
              <Form.Control ref={inputName} type="text" placeholder="예: 쫑이 / 쿠키" />
            </Form.Group>
            <Form.Group>
              <Form.Label>종을 입력하세요</Form.Label>
              <Form.Control ref={inputKind} type="text" placeholder="예: 스피츠 / 코리안 숏 헤어" />
            </Form.Group>
            <Form.Group>
              <Form.Label>증상을 입력하세요</Form.Label>
              <Form.Control ref={inputSymptom}as="textarea" placeholder="예: 다리를 절뚝거려요"/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="Consulting-accept" onClick={submitForm}>수의사 찾기</button>
          <button className="Consulting-cancel" onClick={() => props.setConsultingDialog(false)}>
            취소하기
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ConsultingForm