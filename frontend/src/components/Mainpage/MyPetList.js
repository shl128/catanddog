import React from 'react'
import './MyPetList.css'
import MyPetListItem from './MyPetListItem'

function MyPetList(props) {
  return (
    <div>
      <h3>내 반려동물</h3>
      <div className="My-pet-list">
        {props.pets.map((pet) => {
          return <MyPetListItem key={pet.petId} pet={pet} />
        })}
      </div>
    </div>
  )
}

export default MyPetList