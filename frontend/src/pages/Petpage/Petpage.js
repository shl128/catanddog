import React, {useState} from 'react';
import './Petpage.css'
import noImage from '../../components/image/이미지없음.png'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SERVER from '../../API/server';

const Petpage = () => {
  const [imgBase64, setImgBase64] = useState(null); 
  const [petPhoto, setPetPhoto] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petKind, setPetKind] = useState("강아지");
  const [petBreed, setPetBreed] = useState(null);
  const [knowBirth, setKnowBirth] = useState(true);
  const [petBirthday, setPetBirthday] = useState(null);
  const [petGender, setPetGender] = useState("남자");
  const [petNeutering, setPetNeutering] = useState(true);
  const [petVaccination, setPetVaccination] = useState(true);
  const userData = localStorage.getItem('accessToken');
  
  const handleChangeFile = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); 
      }
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); 
      setPetPhoto(e.target.files[0]);
      // setPetPhoto(reader); 
      // console.log(e.target.files[0])
    }
  }
  const handlePetName = () => {
    setPetName(document.getElementById('petName').value);
  }
  const handlePetKind = () => {
    if (petKind === "강아지") {
      setPetKind("고양이");  
    } else {
      setPetKind("강아지");
    }
    console.log(petKind)
  }
  const handlePetBreed = () => {
    setPetBreed(document.getElementById('petBreed').value);
  }
  const handleKnowBirth = () => {
    setKnowBirth(!knowBirth);
  }
  const handlePetBirthday = () => {
    if (knowBirth === true) {
      setPetBirthday(document.getElementById('petBirthDate').value)
    } else {
      setPetBirthday(document.getElementById('petBirthMonth').value)
    }
    console.log(petBirthday);
  }
  const handlePetGender = () => {
    if (petGender === "남자") {
      setPetGender("여자");  
    } else {
      setPetGender("남자");
    }
  }
  const handlePetNeutering = () => {
    if (petNeutering === true) {
      setPetNeutering(false);  
    } else {
      setPetNeutering(true);
    }
  }
  const handlePetVaccination = () => {
    if (petVaccination === true) {
      setPetVaccination(false);  
    } else {
      setPetVaccination(true);
    }
  }

  const onSubmitHandler = async () => {
    // const array = {petPhoto, petName, petKind, petBreed, petBirthday, petGender, petNeutering, petVaccination}
    let formData = new FormData();
    formData.append('petPhoto', petPhoto);
    formData.append('petKind', petKind);
    formData.append('petBreed', petBreed);
    formData.append('petBirthday', petBirthday);
    formData.append('petGender', petGender);
    formData.append('petNeutering', petNeutering);
    formData.append('petVaccination', petVaccination);
    
    console.log(userData)
    console.log(formData)
    console.log(petName)
    console.log(petKind)
    console.log(petBreed)
    console.log(petBirthday)
    console.log(petGender)
    console.log(petNeutering)
    console.log(petVaccination)
    if (petName === null && petBreed !== null && petBirthday !== null) {
      alert('반려동물 이름을 입력해주세요.');
      return;
    }
    if (petName !== null && petBreed === null && petBirthday !== null) {
      alert('반려동물 품종을 입력해주세요.');
      return;
    }
    if (petName !== null && petBreed !== null && petBirthday === null){
      alert('반려동물 생일을 입력해주세요.');
      return;
    }
    if (petName === null && petBreed === null && petBirthday !== null){
      alert('반려동물 이름과 품종을 입력해주세요.');
      return;
    }
    if (petName === null && petBreed !== null && petBirthday === null){
      alert('반려동물 이름과 생일을 입력해주세요.');
      return;
    }
    if (petName !== null && petBreed === null && petBirthday === null){
      alert('반려동물 품종과 생일을 입력해주세요.');
      return;
    }
    if (petName === null && petBreed === null && petBirthday === null){
      alert('반려동물 이름, 품종, 생일을 입력해주세요.');
      return;
    }
    axios
      .post(
        SERVER.BASE_URL + SERVER.ROUTES.createPet,
        formData,
        {headers: {
          Authorization: `Bearer ${userData}`,
          "Content-Type": "multipart/form-data",
        }}
      )
      .then(function (
        response) {
        console.log(petPhoto)
        // console.log(response)
        alert('반려동물 추가가 정상적으로 완료되었습니다!');
      })
      .catch(function (error) {
        console.log(error);
        console.log(petPhoto)
        console.log(formData)
        alert('오류가 발생하였습니다.');
      });
  }

  return (
    <div>
      <h3>반려동물 정보</h3>
      <div className="Petpage">
        <Container>
          <Row>
            <Col className="mt-5">
              { 
                imgBase64 == null 
                ? <img src={noImage} className="pet-image" alt="no" style={{"width":"300px", "height":"400px"}} />
                : <img src={imgBase64} className="pet-image" alt="no" style={{"width":"300px", "height":"400px"}} />
              }
              <div className="mt-1">
                <label className="button" for="input-file">프로필 사진 변경</label>
                <input type="file"
                  name="input-file" id="input-file" 
                  accept='image/*'
                  onChange={handleChangeFile}
                  style={{display:"none"}}
                />
              </div>
            </Col>
            <Col md="8" className="mt-5">
              <div>
                <Table className="w-50" responsive="sm">
                  <tbody>
                    <tr>
                      <td>이름</td>
                      <td>
                        <Form.Control id="petName" className="w-75" type="text" placeholder="반려동물 이름" onChange={handlePetName}/>
                      </td>
                    </tr>
                    <tr>
                      <td>동물 종류</td>
                      <td>
                        <Form.Select className="w-75" aria-label="Default select example" onChange={handlePetKind}>
                          <option value="1">강아지</option>
                          <option value="2">고양이</option>
                        </Form.Select>
                      </td>
                    </tr>
                    <tr>
                      <td>품종</td>
                      <td>
                        <Form.Control id="petBreed" className="w-75" type="text" placeholder="반려동물 품종" onChange={handlePetBreed}/>
                      </td>
                    </tr>
                    <tr>
                      <td>생일</td>
                      <td>
                        <Form>
                          {['radio'].map((type) => (
                            <div key={`birthday-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                label="생일을 알아요!"
                                name="group1"
                                type={type}
                                id={`birthday-${type}-1`}
                                checked={knowBirth === true}
                                onChange={handleKnowBirth}
                              />
                              <Form.Check
                                inline
                                label="생일을 몰라요!"
                                name="group1"
                                type={type}
                                id={`birthday-${type}-2`}
                                checked={knowBirth === false}
                                onChange={handleKnowBirth}
                              />
                            </div>
                          ))}
                        </Form>
                        <ul className="no-left-padding">
                          <li className="item">
                            {
                              knowBirth === true
                              ?
                              <Form.Group controlId="duedate">
                                <Form.Control
                                  type="date"
                                  placeholder="Due date"
                                  id="petBirthDate"
                                  required onChange={handlePetBirthday}
                                  // value={date}
                                  // onChange={(e) => setDate(e.target.value)}
                                />
                              </Form.Group>
                              :
                              <Form.Group controlId="duedate">
                                <Form.Control
                                  type="month"
                                  placeholder="Due date"
                                  id="petBirthMonth"
                                  required onChange={handlePetBirthday}
                                  // value={date}
                                  // onChange={(e) => setDate(e.target.value)}
                                />
                              </Form.Group>
                              // ? <input type="date" id="petBirthDate" required onChange={handlePetBirthday}></input>
                              // : <input type="month" id="petBirthMonth" required onChange={handlePetBirthday}></input>
                                  
                            }
                          </li>
                        </ul>
                      </td>
                    </tr>
                    <tr>
                      <td>성별</td>
                      <td>
                        <Form>
                          {['radio'].map((type) => (
                            <div key={`gender-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                label="남자"
                                name="group2"
                                type={type}
                                id={`gender-${type}-1`}
                                checked={petGender === "남자"}
                                onChange={handlePetGender}
                              />
                              <Form.Check
                                inline
                                label="여자"
                                name="group2"
                                type={type}
                                id={`gender-${type}-2`}
                                checked={petGender === "여자"}
                                onChange={handlePetGender}
                              />
                            </div>
                          ))}
                        </Form>
                      </td>
                    </tr>
                    <tr>
                      <td>중성화 여부</td>
                      <td>
                        <Form>
                          {['radio'].map((type) => (
                            <div key={`neutering-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                label="Yes"
                                name="group3"
                                type={type}
                                id={`neutering-${type}-1`}
                                checked={petNeutering === true}
                                onChange={handlePetNeutering}
                              />
                              <Form.Check
                                inline
                                label="No"
                                name="group3"
                                type={type}
                                id={`neutering-${type}-2`}
                                checked={petNeutering === false}
                                onChange={handlePetNeutering}
                              />
                            </div>
                          ))}
                        </Form>
                      </td>
                    </tr>
                    <tr>
                      <td>예방 접종 여부</td>
                      <td>
                        <Form>
                          {['radio'].map((type) => (
                            <div key={`default-${type}`} className="mb-3">
                              <Form.Check
                                inline
                                label="Yes"
                                name="group1"
                                type={type}
                                id={`inline-${type}-1`}
                                checked={petVaccination === true}
                                onChange={handlePetVaccination}
                              />
                              <Form.Check
                                inline
                                label="No"
                                name="group1"
                                type={type}
                                id={`inline-${type}-2`}
                                checked={petVaccination === false}
                                onChange={handlePetVaccination}
                              />
                            </div>
                          ))}
                        </Form>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>           
            </Col>
          </Row>
          <Row>
            <Col>
            </Col>
            <Col md="3">
              <Button className="create-pet" variant='danger' onClick={onSubmitHandler}>반려 동물 정보 추가</Button>
            </Col>
          </Row>
        </Container> 
      </div>
    </div>
  );
}


export default Petpage;

