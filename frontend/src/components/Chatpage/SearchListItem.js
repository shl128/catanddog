import React from 'react'
import './SearchListItem.css'

function SearchListItem({ word, SelectWord }) {
  return (
    <div className="Search-list-item">
      <div onClick={() => SelectWord(word)}>{word}</div>
    </div>
  )
}

export default SearchListItem