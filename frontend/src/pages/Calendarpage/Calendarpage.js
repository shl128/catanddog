import React, {useState} from 'react';
import './Calendarpage.css'
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import SERVER from '../../API/server';

const Calendarpage = () => {

  return (
    <div className="Calendarpage">
      <Container>
        <h2>캘린더 입니다.</h2>
        
        {/* <Row>
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
        </Row> */}
      </Container> 
    </div>
  );
}


export default Calendarpage;

