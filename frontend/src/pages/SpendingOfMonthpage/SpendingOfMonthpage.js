import React, {useState} from 'react';
import './SpendingOfMonthpage.css'
import ExpenditureInput from '../../components/SpendingOfMonthpage/ExpenditureInput'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SERVER from '../../API/server';

const SpendingOfMonthpage = () => {

  return (
    <div className='SpendingOfMonthpage'>
      <div className='SpendingOfMonthHeader'>
        <h2>n월 지출 내역 입니다.</h2>
        <h5 className='my-3'>
          n월 n일 현재까지
          <span>
            <select className='filter mx-1'>
              <option value="전체">전체</option>
              <option value="병원">병원</option>
              <option value="용품">용품</option>
              <option value="사료간식">사료/간식</option>
              <option value="기타">기타</option>
            </select> 
          </span> 
          지출 금액은 총 n원 입니다.</h5>
      </div>
      <div className='SpendingOfMonthBody'>
        <ExpenditureInput />
      </div>

    
      
      {/* <Container>
        
        <Row>
          <Col className="mt-5">
           
          </Col>
          <Col md="8" className="mt-5">
            <Table className="w-50" responsive="sm">
            <tbody>
            </tbody>
            </Table>
          </Col>
        </Row>
        <Row>
        </Row>
      </Container>  */}
    </div>
  );
}


export default SpendingOfMonthpage;

