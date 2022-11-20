import Card from 'react-bootstrap/Card';
import "../style/Transaction.css";
import Button from 'react-bootstrap/Button';
import React, { useState, useEffect } from 'react'
import axios from 'axios'


function Transaction(props) {


  const onDelete = async () => {
    await axios.delete(`http://localhost:8000/transactions/${props.transaction.id}`)
    await props.updateTransactions()
    await props.updateBalance()
  };



  return (
    <Card className= {props.transaction.amount<0?'withdraw':'deposit'} style={{ width: '20rem' }}>
      <Card.Body>
        <Card.Title>{props.transaction.vendor}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{props.transaction.category}</Card.Subtitle>
        <Card.Text>
            {props.transaction.amount}
        </Card.Text>
        <Button onClick={onDelete} variant="primary">Delete</Button>
      </Card.Body>
    </Card>
  );
}

export default Transaction;