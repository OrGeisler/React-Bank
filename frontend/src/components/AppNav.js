import "../style/AppNav.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function AppNav(props) {

  const [balance, setBalance] = useState('')


  useEffect(() => {
    axios.get('http://localhost:8000/balance').then((res) => {
      setBalance(res.data)
    })
  }, [])



  return (
    <Navbar className='nav' bg="dark" variant="dark">
    <Container >
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Nav className="me-auto">
        <Nav.Link href="/transactions">Transactions</Nav.Link>
        <Nav.Link href="/operations">Operations</Nav.Link>
        <Nav.Link href="/breakdown">Breakdown</Nav.Link>
      </Nav>
      <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Balance: {balance.sum}
          </Navbar.Text>
        </Navbar.Collapse>
    </Container>
  </Navbar>
  );
}

export default AppNav;