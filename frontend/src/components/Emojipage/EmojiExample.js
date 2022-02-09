import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import beforeImg from '../image/쫑이.jpg'
import afterImg from '../image/쫑이_after.png'
import './EmojiExample.css'

function EmojiExample() {
  return (
    <div className="Example">
      <div>
        <h3>Before</h3>
        <img className="Example-img" alt="변경 전 이미지" src={beforeImg}/>
      </div>
      <FontAwesomeIcon 
        icon={faLongArrowAltRight}
        size="9x"
      />
      <div>
        <h3>After</h3>
        <img className="Example-img" alt="변경 후 이미지" src={afterImg}/>
      </div>
    </div>
  )
}

export default EmojiExample