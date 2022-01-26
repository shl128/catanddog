import React from 'react';
import ReactDom from 'react-dom';

function Welcome(props) {
  return (
    <div>
      <h1>{props.name}님, 안녕하세요!</h1>
      <h3>냥과함개와 반려동물 케어를 함께 할 준비가 되셨나요?</h3>
    </div>
  );
}

function Main() {
  return (
    <div>
      <Welcome name="진용" />
    </div>
  )
}

ReactDom.render(
  <Main />,
  document.getElementById('root')
)

export default Main;
