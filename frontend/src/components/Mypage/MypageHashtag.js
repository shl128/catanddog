import React, { useEffect, useState } from 'react';
import './MypageHashtag.css'
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SERVER from '../../API/server'
import axios from 'axios';


const MypageHashtag = (props) =>{
  const [addTag, setAddTag] = useState('')
  const [nowTags, setNowTags] = useState(props.tags)
  const userData = localStorage.getItem('accessToken')
  const onAddTagHandle = (e) => {
    setAddTag(e.target.value)
  }

  useEffect(() =>{

  }, [nowTags])
  
  const onAddTagRequest = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      if (nowTags.length > 4) {
        alert('5개 이상 해쉬태그 설정은 불가능 합니다.')
      }
      else if(addTag === ''){
        alert('값을 입력하셔야합니다.')
      }
      else{
        axios.post(SERVER.BASE_URL + SERVER.ROUTES.tag + '/{user_tag_name}?userTagName=' + String(addTag), {},    
        {headers: {
          Authorization: `Bearer ${userData}`
          }})
          .then(res => {
            // 태그 추가가 성공하면 그에 해당하는 태그 id 등등의 정보 필요
            console.log(res)
  
            axios.get(SERVER.BASE_URL + SERVER.ROUTES.tag,
              {headers: {
                Authorization: `Bearer ${userData}`
              }})
              .then(res => {
                setNowTags(res.data.reverse())
                setAddTag('')
                
              })
              .catch(err => {
                console.log(err)
              })
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  }
  
  const removeTagRequest = (id, e) => {
    e.preventDefault()
    axios.delete(SERVER.BASE_URL + SERVER.ROUTES.tag + '/{user_tag_id}?userTagId=' + parseInt(id),   
    {headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }})
      .then(res => {
        setNowTags(nowTags.filter(tag => tag.userTagId !== id));
        // console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const rendering = () => {
    const result = [];
    for (let i = 0; i < nowTags.length; i++) {
      result.push(<span className='mypageHash' key={i}>{nowTags[i].userTagName}<span className='xButton'>  <FontAwesomeIcon onClick={(e) => removeTagRequest(nowTags[i].userTagId, e)} icon={faTimes} size="1x" />
      </span></span>);
    }
    return result;
  };

  return (
    <div className='MypageHashtag-container'>
      <div className='TextForm-label'>
        {props.role}
        <br></br>
        (5개 제한)
      </div>
      <div className='TextForm-value'>
       {rendering()}
       {
         props.update 
         && <div className='tagsAddform'> <input className='tagsInput' value={addTag} onChange={onAddTagHandle} onKeyPress={onAddTagRequest}/> <button onClick={onAddTagRequest}>추가</button></div>  
       }
       
      </div>
    </div>
  )
}

export default MypageHashtag;
