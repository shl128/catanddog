import React from 'react';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import './Petpage.css'

const Petpage = (props) => {
  return (
    <div className="Petpage">
      <h1>반려동물 정보</h1>
      <Container>
        <Row>  
        </Row>
      </Container>
      <div>
        <Table responsive="sm">
          <tbody>
            <tr>
              <td>이름</td>
              <td>텍스트 필드</td>
            </tr>
            <tr>
              <td>동물 종류</td>
              <td>셀렉트박스</td>
            </tr>
            <tr>
              <td>품종</td>
              <td>텍스트 필드</td>
            </tr>
            <tr>
              <td>생일</td>
              <td>캘린더</td>
            </tr>
            <tr>
              <td>성별</td>
              <td>라디오 버튼</td>
            </tr>
            <tr>
              <td>중성화 여부</td>
              <td>라디오 버튼</td>
            </tr>
            <tr>
              <td>예방 접종 여부</td>
              <td>라디오 버튼</td>
            </tr>
          </tbody>
        </Table>
      </div>           
    </div>
  );
}

export default Petpage;