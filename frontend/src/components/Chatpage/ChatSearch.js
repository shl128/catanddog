import React, { useRef, useState } from 'react'
import './ChatSearch.css'
import { SearchHashByTag, SearchHashByTitle } from './ChatAxios'
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
      props.setWord(target)
      props.setType("title")
      props.setPage(1)
      setTarget("")
    } else if (searchType.current.value === 'tag' && target){
      props.setWord(target)
      props.setType("tag")
      props.setPage(1)
      setTarget("")
    } else {
      alert("단어가 없으면 검색할 수 없습니다")
    }
  }

  function AllRooms() {
    props.setType("all")
    props.setTrigger(!props.trigger)
    props.setPage(1)
    setTarget("")
  }

  return (
    <div className="Search-chat">
      <div className="Search-group">
        <select className="Search-type" ref={searchType}>
          <option value="title">제목</option>
          <option value="tag">해시태그</option>
        </select>
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
      </div>
      <button className="Search-refresh" onClick={AllRooms}>새로고침</button>
    </div>
  )
}

export default ChatSearch