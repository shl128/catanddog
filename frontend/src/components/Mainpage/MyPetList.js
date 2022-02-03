import React from 'react'
import './MyPet.css'
import MyPetListItem from './MyPetListItem'
// import { MyPet } from './MainAxios'

function MyPetList(props) {
  return (
    <div className="My-pet">
      {/* <MyPet /> */}
      <h3>내 반려동물</h3>
      <div className="My-pet-list">
        {MyPetListItem(props.pets)}
      </div>
    </div>
  )
}

export default MyPetList