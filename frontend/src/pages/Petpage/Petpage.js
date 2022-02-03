import React, {useState} from 'react';
import './Petpage.css'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SERVER from '../../API/server';

const Petpage = () => {
  const [imgBase64, setImgBase64] = useState(""); // 미리보기 파일 string 형태
  const [petPhoto, setPetPhoto] = useState(null);	// 이미지 파일
  const [petName, setPetName] = useState(null);
  const [petKind, setPetKind] = useState(null);
  const [petBreed, setPetBreed] = useState(null);
  const [knowBirth, setKnowBirth] = useState(true);
  const [petBirthday, setPetBirthday] = useState("2022-01-01");
  const [petGender, setPetGender] = useState("남자");
  const [petNeutering, setPetNeutering] = useState(true);
  const [petVaccination, setPetVaccination] = useState(true);
  const userData = localStorage.getItem('accessToken');
  
  const handleChangeFile = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setPetPhoto(e.target.files[0]); // 파일 상태 업데이트
    }
  }
  const handlePetName = () => {
    setPetName(document.getElementById('petName').value);
    // console.log(petName)
  }
  const handlePetKind = () => {
    if (petKind === "강아지") {
      setPetKind("고양이");  
    } else {
      setPetKind("강아지");
    }
    // console.log(petKind)
  }
  const handlePetBreed = () => {
    setPetBreed(document.getElementById('petBreed').value);
    // console.log(petBreed)
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

  const onSubmitHandler = () => {
    console.log(userData)
    console.log(petPhoto)
    console.log(petName)
    console.log(petKind)
    console.log(petBreed)
    console.log(petBirthday)
    console.log(petGender)
    console.log(petNeutering)
    console.log(petVaccination)
    axios
      .post(
        SERVER.BASE_URL + SERVER.ROUTES.createPet,
        {
          'petPhoto': petPhoto,
          'petName': petName,
          'petKind': petKind,
          'petBreed': petBreed,
          'petBirthday': petBirthday,
          'petGender': petGender,
          'petNeutering': petNeutering,
          'petVaccination': petVaccination,
        },
        {headers: {
          Authorization: `Bearer ${userData}`
        }}
      )
      .then(function (response) {
        console.log(response)
        alert('반려동물 추가가 정상적으로 완료되었습니다!');
      })
      .catch(function (error) {
        console.log(error);
        alert('모든 항목을 체크했는지 확인하십시오.');
      });
  }

  return (
    <div className="Petpage">
      <h1>반려동물 정보</h1>
      <Container className="mt-5">
        <Row>
          <Col>
            { 
              petPhoto == null 
              ? <img src="/noPetImage.png" className="pet-image" alt="no" style={{"width":"300px", "height":"400px"}} />
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
          <Col md="8">
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
                        <option>종류 선택</option>
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
                            ? <input type="date" id="petBirthDate" required onChange={handlePetBirthday}></input>
                            : <input type="month" id="petBirthMonth" required onChange={handlePetBirthday}></input>
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
  );
}


export default Petpage;

