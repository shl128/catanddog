import React from 'react'
import './MyPet.css'
import MyPetListItem from './MyPetListItem'

function MyPetList(props) {
  return (
    <div className="My-pet">
      <h3>내 반려동물</h3>
      <div className="My-pet-list">
        {MyPetListItem(props.pets)}
      </div>
    </div>
  )
}

export default MyPetList