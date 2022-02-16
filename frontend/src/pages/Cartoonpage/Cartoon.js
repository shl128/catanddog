import React, {useState} from 'react';
import './Cartoon.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const Cartoon = () => {

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
    <div>
      <div className="Cartoon">
        <div className="Cartoon-content">
          <label className="Cartoon-label">Before</label>
          {imgBase64 == null 
            ? <img className="Cartoon-img" src={process.env.PUBLIC_URL + '/image/noimage.png'} alt="no" />
            : <img className="Cartoon-img" src={imgBase64} alt="no" />
          }
          <div>
            <label className="Cartoon-button" for="input-file">이미지 선택</label>
            <input type="file"
              id="input-file" 
              accept='image/*'
              onChange={handleChangeFile}
              style={{display:"none"}}
              />
          </div> 
        </div>
        <FontAwesomeIcon className="Cartoon-arrow" icon={faLongArrowAltRight} size="6x" style={{color: '#ff8767'}} />
        <div className="Cartoon-content">
          <label className="Cartoon-label">After</label>
          {cartoonPhoto == null 
            ? <img className="Cartoon-img" src={process.env.PUBLIC_URL + '/image/noimage.png'} alt="no" />
            : <img className="Cartoon-img" src={cartoonPhoto} alt="no" />
          }
          <div>
          <label className="Cartoon-button" onClick={downBtn}>다운로드</label> 
            </div>  
          </div>
        </div>
    </div>
  )
}

export default Cartoon