import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
// import { Nav } from 'react-bootstrap'
import './Petpage.css'
import { useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
import RadioButtonForm from '../../components/Petpage/RadioButtonForm'
import BirthdayPicker from '../../components/Petpage/BirthdayPicker'
import axios from 'axios';
import SERVER from '../../API/server';

const Petpage = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const [pageType, setPageType] = useState(location.state.pageType);
  var prePageType = pageType;
  const [imgBase64, setImgBase64] = useState(null); 
  const [petPhoto, setPetPhoto] = useState(null);
  const [petName, setPetName] = useState(null);
  const [petKind, setPetKind] = useState("강아지");
  const [petBreed, setPetBreed] = useState(null);
  const [knowBirth, setKnowBirth] = useState(true);
  const [petBirthday, setPetBirthday] = useState(null);
  const [petGender, setPetGender] = useState("남자");
  const [genderBool, setGenderBool] = useState(true);
  const [petNeutering, setPetNeutering] = useState(true);
  const [petVaccination, setPetVaccination] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false)
  const [readKnowBirthData, setKnowBirthData] = useState(true)
  const [initialKnowBirth, setInitialKnowBirth] = useState(true)
  const [noUpdateImg, setNoUpdateImg] = useState(true)
  const userData = localStorage.getItem('accessToken');
  const knowBirthLabels = ['생일을 알아요!','생일을 몰라요!']
  const genderLabels = ['남자','여자']
  const neuteringLabels = ['Yes','No']
  const vaccinLabels = ['Yes','No']
  const commonObject = {
    'petName':petName, 
    'petKind':petKind, 
    'petBreed':petBreed, 
    'petBirthday':petBirthday, 
    'petGender':petGender, 
    'petNeutering':petNeutering, 
    'petVaccination':petVaccination,
  }

  if (prePageType === 'read' && location.state.pageType === 'create') {
    setPageType(location.state.pageType)
    setImgBase64(null)
  }

  if (prePageType === 'update' && location.state.pageType === 'create') {
    setPageType(location.state.pageType)
  }

  const handleChangeFile = (e) => {
    let reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;
      if (base64) {
        setImgBase64(base64.toString());
        console.log() 
      }
    }
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); 
      setPetPhoto(e.target.files[0]);
      setNoUpdateImg(false)
    }
    setIsUpdating(true)
  }

  const handlePetName = (e) => {
    setPetName(e.target.value);
  }

  const handlePetKind = () => {
    if (petKind === "강아지") {
      setPetKind("고양이");
    } else {
      setPetKind("강아지");
    }
  }

  const handlePetBreed = (e) => {
    setPetBreed(e.target.value);
  }

  const handleKnowBirth = () => {
    setKnowBirth(!knowBirth);
    setInitialKnowBirth(false);
    
  }

  const handlePetBirthday = () => {
    if (knowBirth === true) {
      setPetBirthday(document.getElementById('petBirthDate').value)
    } else {
      setPetBirthday(document.getElementById('petBirthMonth').value)
    }
  }

  const handlePetGender = () => {
    if (genderBool === true) {
      setPetGender("여자");
      setGenderBool(false);  
    } else {
      setPetGender("남자");
      setGenderBool(true);
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

  const axiosGet = () => {
    axios
      .get(
        SERVER.BASE_URL + SERVER.ROUTES.Petpage + location.state.petId,
        {headers: {
          Authorization: `Bearer ${userData}`,
        }}
      )
      .then((res) => {
        if (res.data.petBirthday.length === 10) {
          setKnowBirthData(true)
        } else {
          setKnowBirthData(false)
        }
        setImgBase64(res.data.petPhoto)
        setPetPhoto(res.data.petPhoto)
        setPetName(res.data.petName)
        setPetKind(res.data.petKind)
        setPetBreed(res.data.petBreed)
        setPetBirthday(res.data.petBirthday)
        setPetGender(res.data.petGender)
        setPetNeutering(res.data.petNeutering)
        setPetVaccination(res.data.petVaccination)
      })
      .catch((error) => {
        console.log(error);
        alert('반려동물 정보 불러오기 실패');
      });
  }

  const updateHandler = () => {
    setPageType('update')
  }

  const updateDoneHandler = () => {
    setIsUpdating(false)
    
    var param = null;
  
    if (noUpdateImg === true) {
      param = null;
    } else {
      param = petPhoto;
      setNoUpdateImg(true)
    }

    let formData = new FormData();

    const object = Object.assign(commonObject, { 'pet_photo':param, 'pet_id':location.state.petId });

    for (const data in object) {
      formData.append(data, object[data])
    }

    axios
      .patch(
        SERVER.BASE_URL + SERVER.ROUTES.Petpage + location.state.petId,
        formData,
        {headers: {
          Authorization: `Bearer ${userData}`,
          "Content-Type": "multipart/form-data",
        }}
      )
      .then(() => {
        axiosGet();
        setPageType('read');
      })
      .catch(() => { alert('수정 오류 발생')} )
  }

  const updateCancelHandler = () => {
    setPageType('read');
    axiosGet();
  }

  const onSubmitHandler = () => {
    let formData = new FormData();

    const object = Object.assign(commonObject, { 'petPhoto':petPhoto });

    for (const data in object) {
      formData.append(data, object[data])
    }

    axios
      .post(
        SERVER.BASE_URL + SERVER.ROUTES.Petpage,
        formData,
        {headers: {
          Authorization: `Bearer ${userData}`,
          "Content-Type": "multipart/form-data",
        }}
      )
      .then((res) => {
        console.log(res)
        navigate('/')
      })
      .catch((err) => {
        console.log(err)
        alert('오류가 발생하였습니다.');
      });
  }

  useEffect(() => { 
    if (pageType === 'read') { axiosGet() } 
    if (location.state.pageType === 'create') {
      console.log(petPhoto)
      console.log(petName)
      console.log(petBreed)
      console.log(petBirthday)
    }
  }, [])

  return (
    // <h3>반려동물 정보</h3>
    <div className="Petpage">
    {pageType === 'create' && 
      <div className="Petpage-left">
        { 
          imgBase64 == null 
          ? <img className="Petpage-img" src={process.env.PUBLIC_URL + '/image/noimage.png'} alt="no" />
          : <img className="Petpage-img" src={imgBase64} alt="alt" />
        }
        <label className="Petpage-img-choice" for="input-file">프로필 사진 변경</label>
        <input type="file"
          id="input-file" 
          accept='image/*'
          onChange={handleChangeFile}
          style={{display:"none"}}
        />
      </div>
    }
    {pageType === 'read' && <img className="Petpage-img" src={'data:image/png;base64,' + imgBase64} alt="no" />}
    {pageType === 'update' && 
      <div className="Petpage-left">
        { 
          isUpdating === false 
          ? <img className="Petpage-img" src={'data:image/png;base64,' + imgBase64} alt="no" />
          : <img className="Petpage-img" src={imgBase64} alt="alt" />
        }
        <label className="Petpage-img-choice" for="input-file">프로필 사진 변경</label>
        <input type="file"
          id="input-file" 
          accept='image/*'
          onChange={handleChangeFile}
          style={{display:"none"}}
        />
      </div>
    }
      <div className="Petpage-right">
        <div className="Petpage-item">
          <div className="Petpage-item-tag">이름</div>
          <div className="Petpage-item-value">
            {pageType === 'create' && <Form.Control type="text" placeholder="반려동물 이름" onChange={handlePetName}/>}
            {pageType === 'read' && <div>{petName}</div>}
            {pageType === 'update' && <Form.Control type="text" placeholder="반려동물 이름" onChange={handlePetName} value={petName}/>}
          </div>
        </div>
        <div className="Petpage-item">
          <div className="Petpage-item-tag">동물 종류</div>
          <div className="Petpage-item-value">
            {pageType === 'create' &&
            <Form.Select aria-label="Default select example" onChange={handlePetKind}>
              <option value="강아지">강아지</option>
              <option value="고양이">고양이</option>
            </Form.Select>}
            {pageType === 'read' && <div>{petKind}</div>}
            {pageType === 'update' &&
            <Form.Select aria-label="Default select example" onChange={handlePetKind} value={petKind}>
              <option value="강아지">강아지</option>
              <option value="고양이">고양이</option>
            </Form.Select>}
          </div>
        </div>
        <div className="Petpage-item">
          <div className="Petpage-item-tag">품종</div>
          <div className="Petpage-item-value">
            {pageType === 'create' && <Form.Control type="text" placeholder="반려동물 품종" onChange={handlePetBreed}/>}
            {pageType === 'read' && <div>{petBreed}</div>}
            {pageType === 'update' && <Form.Control type="text" placeholder="반려동물 품종" onChange={handlePetBreed} value={petBreed}/>}
          </div>
        </div>
        <div className="Petpage-item">
          <div className="Petpage-item-tag">생일</div>
          <div className="Petpage-item-value">
            {pageType === 'create' && 
            <div>
              <RadioButtonForm label={knowBirthLabels} change={handleKnowBirth} idName="birthday" checkedCondition={knowBirth} pageType={pageType}/>
              {
                knowBirth === true
                ?
                <BirthdayPicker type="date" idName="petBirthDate" change={handlePetBirthday}/>
                :
                <BirthdayPicker type="month" idName="petBirthMonth" change={handlePetBirthday}/>  
              }
            </div>
            }
            {pageType === 'read' && <div>{petBirthday}</div>}
            {pageType === 'update' && 
            <div>
              <RadioButtonForm label={knowBirthLabels} change={handleKnowBirth} idName="birthday" checkedCondition={knowBirth} readKnowBirthData={readKnowBirthData} initialKnowBirth={initialKnowBirth} pageType={pageType}/>
              {
                initialKnowBirth === true
                ?
                <div>
                  {
                    readKnowBirthData === true
                    ?
                    <BirthdayPicker type="date" idName="petBirthDate" change={handlePetBirthday} baseDay={petBirthday}/>
                    :
                    <BirthdayPicker type="month" idName="petBirthMonth" change={handlePetBirthday} baseDay={petBirthday}/>
                  }
                </div>
                :
                <div>
                  {
                    knowBirth === true
                    ?
                    <BirthdayPicker type="date" idName="petBirthDate" change={handlePetBirthday} baseDay={petBirthday}/>
                    :
                    <BirthdayPicker type="month" idName="petBirthMonth" change={handlePetBirthday} baseDay={petBirthday}/>  
                  }
                </div>
              }
            </div>
            }
          </div>
        </div>
        <div className="Petpage-item">
          <div className="Petpage-item-tag">성별</div>
          <div className="Petpage-item-value">
            {pageType === 'create' && <RadioButtonForm label={genderLabels} change={handlePetGender} idName="gender" checkedCondition={genderBool}/>}
            {pageType === 'read' && <div>{petGender}</div>}
            {pageType === 'update' && <RadioButtonForm label={genderLabels} change={handlePetGender} idName="gender" checkedCondition={genderBool} value={petGender}/>}
          </div>
        </div>
        <div className="Petpage-item">
          <div className="Petpage-item-tag">중성화 여부</div>
          <div className="Petpage-item-value">
            {pageType === 'create' && <RadioButtonForm label={neuteringLabels} change={handlePetNeutering} idName="neutering" checkedCondition={petNeutering}/>}
            {pageType === 'read' && 
              <div>
                {
                  petNeutering === true ? <div>Yes</div> : <div>No</div>
                }
              </div>
            }
            {pageType === 'update' && <RadioButtonForm label={neuteringLabels} change={handlePetNeutering} idName="neutering" checkedCondition={petNeutering} value={petNeutering}/>}

          </div>
        </div>
        <div className="Petpage-item">
          <div className="Petpage-item-tag">예방 접종 여부</div>
          <div className="Petpage-item-value">
            {pageType === 'create' && <RadioButtonForm label={vaccinLabels} change={handlePetVaccination} idName="vaccin" checkedCondition={petVaccination}/>}
            {pageType === 'read' && 
              <div>
                {
                  petVaccination === true ? <div>Yes</div> : <div>No</div>
                }
              </div>
            }
            {pageType === 'update' && <RadioButtonForm label={vaccinLabels} change={handlePetVaccination} idName="vaccin" checkedCondition={petVaccination} value={petVaccination}/>}
          </div>
        </div>         
        { pageType === 'create' &&
          <div className="Petpage-button-list">
            {
              (petPhoto === null && petName === null && petBreed === null && petBirthday === null) ||
              (petPhoto === null && petName === '' && petBreed === null && petBirthday === null) ||
              (petPhoto === null && petName === null && petBreed === '' && petBirthday === null) ||
              (petPhoto === null && petName === null && petBreed === null && petBirthday === '') ||
              (petPhoto === null && petName === '' && petBreed === '' && petBirthday === null) ||
              (petPhoto === null && petName === '' && petBreed === null && petBirthday === '') ||
              (petPhoto === null && petName === null && petBreed === '' && petBirthday === '') ||
              (petPhoto === null && petName === '' && petBreed === '' && petBirthday === '')
              ?
              <button className="Petpage-button-none">반려 동물 정보 추가</button>
              :
              <button className="Petpage-button" onClick={onSubmitHandler}>반려 동물 정보 추가</button>
            }
          </div> 
        }
        { pageType === 'read' && 
          <div className="Petpage-button-list">
            <button className="Petpage-button" onClick={updateHandler}>수정하기</button>
          </div>
        }
        { pageType === 'update' && 
          <div className="Petpage-button-list">
            <button className="Petpage-button" onClick={updateDoneHandler}>수정완료</button>
            <button className="Petpage-button" onClick={updateCancelHandler}>수정취소</button>
          </div>
        }
      </div>
    </div>
  );
}

export default Petpage;