import React, {useState} from 'react';
import './Cartoon.css'
import noImage from '../../components/image/이미지없음.png'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Cartoon = () => {

  const [Photo, setPhoto] = useState("");
  const [cartoonPhoto, setCartoonPhoto] = useState(null);
  const [imgBase64, setImgBase64] = useState(null); 

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
      setPhoto(e.target.files[0]);
      transBtn(e.target.files[0]);
    }

    
  }

  const transBtn = (petPhoto) => {
    let formData = new FormData();
    formData.append("file_type","image");
    formData.append("source",petPhoto);
    axios.post("https://master-white-box-cartoonization-psi1104.endpoint.ainize.ai/predict",
    formData,
    {
      responseType:'blob'
    })
    .then((response)=>{
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] } ));
      setCartoonPhoto(url);
      console.log(url);
    })
  }

  const downBtn = () =>{
    const a = document.createElement("a");
    a.href = cartoonPhoto;
    a.download = "cartoon.png";
    a.click();
    a.remove();
  }
  
  return (
      // <h3>내 반려동물의 사진을 카툰화 해보세요!</h3>
      <div className="Cartoonpage">
        <Container className='Cartoonpage-container'>
          <Row className=''>
            <Col id="">
              <div>
              <label className='h3'>
                Before
              </label>
              </div>
              { 
                imgBase64 == null 
                ? <img src={noImage} className="pet-image mt-2" alt="no" />
                : <img src={imgBase64} className="pet-image mt-2" alt="no" />
              }
              <div className="mt-1">
                <label className="button mt-2" for="input-file">카툰화 이미지 선택</label>
                <input type="file"
                  id="input-file" 
                  accept='image/*'
                  onChange={handleChangeFile}
                  style={{display:"none"}}
                />
              </div>
            </Col>
            <Col className="mt-5">
              <div className="mt-5">
                <br></br>
                <br></br>
                <br></br>
              </div>
                <label className='arrow right'></label>   
            </Col>
            <Col>
              <div>
                <label className='h3'>
                  After
                </label>
              </div>
              { 
                cartoonPhoto == null 
                ? <img src={noImage} className="pet-image mt-2" alt="no" />
                : <img src={cartoonPhoto} className="pet-image mt-2" alt="no" />
              }
              <div className='mt-1'>
                <label className="button mt-2" onClick={downBtn}>다운로드</label> 
              </div>  
            </Col>
          </Row>
        </Container> 
      </div>
    
  )
}

export default Cartoon