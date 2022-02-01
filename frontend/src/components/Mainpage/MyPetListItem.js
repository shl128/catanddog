import React from 'react'
import './MyPet.css'
import { Link } from 'react-router-dom'

// 반려동물 개별 항목 함수
function MyPetListItem(pets) {
  return pets.map((pet) => {
    const age = 2022-Number(pet.pet_birthday.substring(0, 4))
    return (
      <div key={pet.pet_id}>
        <Link to="/petpage">
          <button className="My-pet-list-item">
            <img className="My-pet-img" alt="사진" src="img/냥과함개로고.png" />
            <span>
              <p>{pet.pet_name}</p>
              <p>{pet.pet_breed}/{age}살</p>
            </span>
          </button>
        </Link>
      </div>
    )
  })
}

export default MyPetListItem