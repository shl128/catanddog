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
  const [imgBase64, setImgBase64] = useState(""); // 파일 base64
  const [imgFile, setImgFile] = useState(null);	//파일
  const [petName, setPetName] = useState("");
  const [typeOfPet, setTypeOfPet] = useState("");
  const [speciesOfPet, setSpeciesOfPet] = useState("");
  const [knowBirth, setKnowBirth] = useState(true);
  const [petBirthday, setPetBirthday] = useState(Date.now())
  const [gender, setGender] = useState("남자");
  const [neutering, setNeutering] = useState("Yes");
  const [vaccination, setVaccination] = useState("Yes");
  
  const handleChangeFile = (e) => {
    let reader = new FileReader();

    reader.onloadend = () => {
      // 2. 읽기가 완료되면 아래코드가 실행됩니다.
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString()); // 파일 base64 상태 업데이트
      }
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.
      setImgFile(e.target.files[0]); // 파일 상태 업데이트
    }
  }
  const handlePetName = (e) => {
    setPetName(e);
  }
  const handleTypeOfPet = () => {
    if (speciesOfPet == "강아지") {
      setTypeOfPet("고양이");  
    } else {
      setTypeOfPet("강아지");
    }
  }
  const handleSpeciesOfPet = (e) => {
    setSpeciesOfPet(e)
  }
  const handleKnowBirth = () => {
    setKnowBirth(!knowBirth);
  }
  const handlePetBirthday = () => {
    setPetBirthday();
  }
  const handleGender = () => {
    if (gender == "남자") {
      setGender("여자");  
    } else {
      setGender("남자");
    }
  }
  const handleNeutering = () => {
    if (neutering == "Yes") {
      setNeutering("No");  
    } else {
      setNeutering("Yes");
    }
  }
  const handleVaccination = () => {
    if (vaccination == "Yes") {
      setVaccination("No");  
    } else {
      setVaccination("Yes");
    }
  }

  const onSubmitHandler = (e) => {
    e.preventDefault()
    axios
      .post(
        SERVER.BASE_URL + SERVER.ROUTES.createPet,
        {
          ImgFile: imgFile,
          PetName: petName,
          TypeOfPet: typeOfPet,
          SpeciesOfPet: speciesOfPet,
          KnowBirth: knowBirth,
          PetBirthday: petBirthday,
          Gender: gender,
          Neutering: neutering,
          Vaccination: vaccination,
        }
      )
      .then(function (response) {
        if (response.status == 200) {
          alert('반려동물 추가가 정상적으로 완료되었습니다!');
        }
      })
      .catch(function (error) {
        alert('모든 항목을 체크했는지 확인하십시오.');
        console.log(petBirthday);
        //수정 console.log(error);
      });
  }

  return (
    <div className="Petpage">
      <h1>반려동물 정보</h1>
      <Container className="mt-5">
        <Row>
          <Col>
            { 
              imgFile == null 
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
                      <Form.Control className="w-75" type="text" placeholder="반려동물 이름" onChange={handlePetName}/>
                    </td>
                  </tr>
                  <tr>
                    <td>동물 종류</td>
                    <td>
                      <Form.Select className="w-75" aria-label="Default select example" onChange={handleTypeOfPet}>
                        <option>종류 선택</option>
                        <option value="1">강아지</option>
                        <option value="2">고양이</option>
                      </Form.Select>
                    </td>
                  </tr>
                  <tr>
                    <td>품종</td>
                    <td>
                      <Form.Control className="w-75" type="text" placeholder="반려동물 품종" onChange={handleSpeciesOfPet}/>
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
                              checked={knowBirth == true}
                              onChange={handleKnowBirth}
                            />
                            <Form.Check
                              inline
                              label="생일을 몰라요!"
                              name="group1"
                              type={type}
                              id={`birthday-${type}-2`}
                              checked={knowBirth == false}
                              onChange={handleKnowBirth}
                            />
                          </div>
                        ))}
                      </Form>
                      <ul className="no-left-padding">
                        <li class="item">
                          {
                            knowBirth == true
                            ? <input type="date" required onChange={handlePetBirthday}></input>
                            : <input type="month" required onChange={handlePetBirthday}></input>
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
                              checked={gender == "남자"}
                              onChange={handleGender}
                            />
                            <Form.Check
                              inline
                              label="여자"
                              name="group2"
                              type={type}
                              id={`gender-${type}-2`}
                              checked={gender == "여자"}
                              onChange={handleGender}
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
                              checked={neutering == "Yes"}
                              onChange={handleNeutering}
                            />
                            <Form.Check
                              inline
                              label="No"
                              name="group3"
                              type={type}
                              id={`neutering-${type}-2`}
                              checked={neutering == "No"}
                              onChange={handleNeutering}
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
                              checked={vaccination == "Yes"}
                              onChange={handleVaccination}
                            />
                            <Form.Check
                              inline
                              label="No"
                              name="group1"
                              type={type}
                              id={`inline-${type}-2`}
                              checked={vaccination == "No"}
                              onChange={handleVaccination}
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
      </Container>
      <Button className="create-pet" variant='danger' onClick={onSubmitHandler}>반려 동물 정보 추가</Button>
      
    </div>
  );
}


export default Petpage;

