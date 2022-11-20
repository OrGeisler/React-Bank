import Card from 'react-bootstrap/Card';
import "../style/BreakDown.css";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react'
import axios from 'axios'


function BreakDown(props) {

    const [breakdown, setBreakdown] = useState('')

    useEffect(() => {
      axios.get('http://localhost:8000/breakdown').then((res) => {
        setBreakdown(res.data)
      })
    }, [])

    return (
      <Card className='breakdown' style={{ width: '20rem' }}>
        <Card.Body>
          <Card.Title className='title'>BreakDown</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">Summary of your expenses </Card.Subtitle>
          {breakdown==''?null:breakdown.map((value,key) => <Card.Text key = {key} className='category'>{value['category']} : {value['amount']} </Card.Text>)}
        </Card.Body>
      </Card>
    );
  }
  
  export default BreakDown;