import React, {useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import VideoRoomComponent from '../../components/VideoChat/VideoRoomComponent';
import './Chatting.css'
import SERVER from '../../API/server'
import axios from 'axios';


function Chatting () {
    let chatroomId = useParams().chatroomId;
    const [nickname, setNickName] = useState('');
    const userData =  localStorage.getItem('accessToken')

    useEffect(() => {
    axios.get(SERVER.BASE_URL + SERVER.ROUTES.mypage,
      {headers: {
        Authorization: `Bearer ${userData}`
      }})
      .then(res => {
        setNickName(res.data.userNickname)
        // console.log(res.data.userNickname)
      })
      .catch(err => {
        console.log(err)
      })
    }, []);

    return (
        <div className='Chatting'>
            {
                nickname !== '' 
                && <VideoRoomComponent chatroomId={chatroomId} nickname={nickname} want={true}/>
            }
            
        </div>
    )
}
export default Chatting;