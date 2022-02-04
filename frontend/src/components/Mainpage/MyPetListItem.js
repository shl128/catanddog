import React from 'react'
import './MyPet.css'
import { Link } from 'react-router-dom'

// 반려동물 개별 항목 함수
function MyPetListItem(pets) {
  return pets.map((pet) => {
    // const age = 2022-Number(pet.petBirthday.substring(0, 4))
    return (
      <div key={pet.petId}>
        <Link to="/petpage">
          <button className="My-pet-list-item">
            <img className="My-pet-img" alt="사진" src="img/냥과함개로고.png" />
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