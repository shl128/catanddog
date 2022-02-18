import React from 'react'
import './MyPetListItem.css'
import { Link } from 'react-router-dom'

// 반려동물 개별 항목 함수
function MyPetListItem({pet}) {
  const currentYear = new Date().getFullYear()
  const birthYear = Number(pet.petBirthday.substr(0, 4))
  const age = currentYear - birthYear + 1
  return (
    <div className="My-pet-list-item">
      <Link to="/petpage" state={{pageType:'read', petId: pet.petId}}>
        <img className="My-pet-img" alt="사진" src={'data:image/png;base64,' + pet.petPhoto}/>
      </Link>
      <div className="My-pet-list-item-content">
        <div>{pet.petName}</div>
        <div>{pet.petBreed}/{age}살</div>
      </div>
    </div>
  )
}

export default MyPetListItem