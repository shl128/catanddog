import React from 'react'
import './MyPet.css'
import { Link } from 'react-router-dom'

// 반려동물 개별 항목 함수
function MyPetListItem(pets) {
  return pets.map((pet) => {

    return (
      <div key={pet.petId}>
        <Link to="/petpage">
          <button className="My-pet-list-item">
            <img className="My-pet-img" alt="사진" src={'data:image/png;base64,' + pet.petPhoto}/>
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