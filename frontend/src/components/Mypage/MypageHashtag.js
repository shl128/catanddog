import React, { useState } from 'react';
import './MypageHashtag.css'
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const MypageHashtag = (props) =>{
  const hashTags = ['낭만','강아지']

  const rendering = () => {
    const result = [];
    for (let i = 0; i < hashTags.length; i++) {
      result.push(<span className='mypageHash' key={i}>{hashTags[i]}<span className='xButton'>  <FontAwesomeIcon icon={faTimes} size="1x" />
      </span></span>);
    }
    return result;
  };

  return (
    <div className='MypageHashtag-container'>
      <div className='TextForm-label'>
        {props.role}
      </div>
      <div className='TextForm-value'>
       {rendering()}
      </div>
    </div>
  )
}

export default MypageHashtag;
