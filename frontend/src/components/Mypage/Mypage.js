import React from 'react';

const Mypage = (props) => {
  return (
    <div className="Mypage">
      마이페이지입니다
      { props.id }
    </div>
  );
}

export default Mypage;