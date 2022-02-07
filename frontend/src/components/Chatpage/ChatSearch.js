import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import './ChatSearch.css'
import { SearchRoomByTag, SearchRoomByTitle, SearchHashByTag, SearchHashByTitle } from './ChatAxios'

function ChatSearch() {
  const searchType = useRef()
  const [target, setTarget] = useState('')
  const [words, setWords] = useState([])

  function ChangeTarget(event) {
    setTarget(event.target.value)
  }

  function FindTarget() {
    if (target === "") {
      setWords([])
    }
    else if (searchType.current.value === 'title') {
      SearchHashByTitle(target)
      .then(response => {
        console.log(response.data)
        setWords(response.data)
      })
    } else {
      SearchHashByTag(target)
      .then(response => {
        console.log(response.data)
        setWords(response.data)
      })
    }
  }

  function SelectWord(word) {
    setTarget(word)
    setWords([])
  }

  function CancelSearch() {
    setTarget('')
    setWords([])
  }

  function SearchRooms() {
    if (searchType.current.value === 'title' && target) {
      SearchRoomByTitle(target)
      .then(response => {
        console.log("제목으로 조회 성공", response.data)
      })
      .catch(() =>{
        alert("제목으로 조회 실패")
      })
    } else if (searchType.current.value === 'tag' && target){
      SearchRoomByTag(target)
      .then(response => {
        console.log("해시태그로 조회 성공", response.data)
      })
      .catch(() =>{
        alert("해시태그로 조회 실패")
      })
    } else {
      alert("단어가 없으면 검색할 수 없습니다")
    }
  }

  return (
    <div className="Search-chat">
      <Form.Select className="Search-type" ref={searchType}>
        <option value="title">제목</option>
        <option value="tag">해시태그</option>
      </Form.Select>
      <div className="Search-content">
        <input placeholder="검색하기" value={target} onChange={ChangeTarget} onKeyUp={FindTarget}/>
        <button className={"Search-cancel-" + (target.length > 0 ? "on" : "off") }onClick={CancelSearch}>x</button>
        {words.map((word, idx) => 
        <div key={idx} onClick={() => SelectWord(word)}>
          {word}
        </div>)}
      </div>
      <button className="Search-button" onClick={SearchRooms}>찾기</button>
    </div>
  )
}

export default ChatSearch