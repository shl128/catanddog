import {useState} from 'react'
import axios from 'axios'

function MyProfile() {
  const [profile, setProfile] = useState([]);
  const url = "/myPage"
  axios.get(url)
  .then(function(response) {
    setProfile(response.data)
    console.log("회원정보 불러오기 성공")
  })
  .catch(function(error) {
    console.log("회원정보 불러오기 실패")
  })

  if (profile.length > 0) {
    return (
      <p>{profile}</p>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default MyProfile