import React, {useState} from 'react'
import './MyPet.css'
import { Link } from 'react-router-dom'
import SERVER from '../../API/server'

const petUrl = SERVER.BASE_URL + "petPage/pets/image/petPhoto"
const userData = localStorage.getItem('accessToken')

// 반려동물 개별 항목 함수
function MyPetListItem(pets) {
  console.log("pets");
  console.log(pets);
  return pets.map((pet) => {
    //console.log(pet);
  //    console.log(pet.petPhotoImg)
  //   let data = new FormData();
  //   data.append('petPhoto', pet.petPhoto);
  //   let xhr = new XMLHttpRequest();
  //   xhr.open('POST',petUrl,true);
  //   xhr.setRequestHeader('Authorization','Bearer' + userData);
  //   xhr.responseType = 'blob';
  //   xhr.send(data);
  //   xhr.onreadystatechange = function(){
  //   if(this.readyState === 4 && this.status === 200){
  //     let url = window.URL || window.webkitURL;
  //     console.log(this.response)
  //     let imgsrc = url.createObjectURL(this.response);
  //     setPetImg(imgsrc);
  //     console.log(petImg);
  //   }
  // }
    return (
      <div key={pet.petId}>
        <Link to="/petpage">
          <button className="My-pet-list-item">
            <img className="My-pet-img" alt="사진" src={pet.petPhotoImg}/>
            <span>
              <p>{pet.petName}</p>
              <p>{pet.petBreed}/살</p>
            </span>
          </button>
        </Link>
      </div>
    )
  })
}

export default MyPetListItem