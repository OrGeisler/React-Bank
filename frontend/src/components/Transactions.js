import Card from 'react-bootstrap/Card';
import "../style/Transaction.css";
import Button from 'react-bootstrap/Button';
import Transaction from './Transaction';
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function Transactions(props) {

  const [transactions, setTransactions] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/transactions').then((res) => {
      setTransactions(res.data)
    })
  }, [])

  const updateTransactions = () =>{
    axios.get('http://localhost:8000/transactions').then((res) => {
      setTransactions(res.data)
    })
  }

  return (
    <div>
        {transactions==''?null:transactions.map(trans => <Transaction updateBalance = {props.updateBalance} updateTransactions={updateTransactions} transaction={trans} key={trans.id}/>)}
    </div>
  );
}

export default Transactions;