import React, {useState} from 'react';
import './Cartoon.css'
import noImage from '../../components/image/이미지없음.png'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SERVER from '../../API/server';

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
    }
  }

  const transBtn = () => {
    let formData = new FormData();
    formData.append("file_type","image");
    formData.append("source",Photo);
    axios.post("https://master-white-box-cartoonization-psi1104.endpoint.ainize.ai/predict",
    formData,
    {
      responseType:'blob'
    })
    .then((response)=>{
      const url = window.URL.createObjectURL(new Blob([response.data], { type: response.headers['content-type'] } ));
      setCartoonPhoto(url);
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
    <div>
      <h3>카툰화</h3>
      <div className="Cartoonpage">
        <Container>
          <Row>
            <Col className="mt-5">
              { 
                imgBase64 == null 
                ? <img src={noImage} className="pet-image" alt="no" />
                : <img src={imgBase64} className="pet-image" alt="no" />
              }
              <div className="mt-1">
                <label className="button" for="input-file">카툰화 이미지 선택</label>
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
                
              </div>
                <Button className="button mt-5" variant='danger' onClick={transBtn}>변환</Button>   
            </Col>
            <Col className="mt-5">
            { 
                cartoonPhoto == null 
                ? <img src={noImage} className="pet-image" alt="no" />
                : <img src={cartoonPhoto} className="pet-image" alt="no" />
            }
            <div className='mt-1'>
            <Button className="button" variant='danger' onClick={downBtn}>다운로드</Button> 
              </div>  
            </Col>
          </Row>
        </Container> 
      </div>
    </div>
  )
}

export default Cartoon