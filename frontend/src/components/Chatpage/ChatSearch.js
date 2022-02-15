import React, { useRef, useState } from 'react'
import { Form } from 'react-bootstrap'
import './ChatSearch.css'
import { SearchRoomByTag, SearchRoomByTitle, SearchHashByTag, SearchHashByTitle, AllRoom } from './ChatAxios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import SearchList from './SearchList'

function ChatSearch(props) {
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
        props.setRooms(response.data)
        console.log("제목으로 조회 성공", response.data)
      })
      .catch(() =>{
        alert("제목으로 조회 실패")
      })
    } else if (searchType.current.value === 'tag' && target){
      SearchRoomByTag(target)
      .then(response => {
        props.setRooms(response.data)
        console.log("해시태그로 조회 성공", response.data)
      })
      .catch(() =>{
        alert("해시태그로 조회 실패")
      })
    } else {
      alert("단어가 없으면 검색할 수 없습니다")
    }
  }

  function AllRooms() {
    AllRoom()
    .then(response => {
      props.setRooms(response.data)
      console.log("전체 채팅방 조회 성공", response.data)
    })
    .catch(error => {
      console.log("전체 채팅방 조회 실패", error)
    })
  }

  return (
    <div className="Search-chat">
      <div className="Search-type">
        <Form.Select ref={searchType}>
          <option value="title">제목</option>
          <option value="tag">해시태그</option>
        </Form.Select>
      </div>
      <div className="Search-content">
        <input className="Search-input" placeholder="검색하기" value={target} onChange={ChangeTarget} onKeyUp={FindTarget}/>
        <button className={"Search-cancel-" + (target.length > 0 ? "on" : "off") }onClick={CancelSearch}>X</button>
        <div className="Search-word-list">
          {words.length >=1 && <SearchList words={words} SelectWord={SelectWord}/>}
        </div>
        <button onClick={SearchRooms}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <button className="Search-refresh" onClick={AllRooms}>새로고침</button>
    </div>
  )
}

export default ChatSearch