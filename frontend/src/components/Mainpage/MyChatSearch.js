import React from 'react'
import { Form } from 'react-bootstrap'

function MyChatSearch(props) {
  if (window.location.pathname === '/main') {
    return (
      <form>
        <label>
          <Form.Select>
            <option>제목</option>
            <option>해시태그</option>
          </Form.Select>
        </label>
          <input></input>
          <button>검색</button>
      </form>
    )
  } else {
    return (
      <div></div>
    )
  }
}

export default MyChatSearch