import React from 'react'
import SearchListItem from './SearchListItem'
import './SearchList.css'

function SearchList({ words, SelectWord }) {
  return (
    <div className="Search-list">
      {words.map((word, idx) => {
        return <SearchListItem key={idx} word={word} SelectWord={SelectWord} />
      })}
    </div>
  )
}

export default SearchList