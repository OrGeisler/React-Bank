import Card from 'react-bootstrap/Card';
import "../style/Transaction.css";
import Button from 'react-bootstrap/Button';
import Transaction from './Transaction';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import consts from "../model/consts"

function Transactions(props) {

  const [transactions, setTransactions] = useState('')

  useEffect(() => {
    axios.get(consts.TRANSACTION_URL).then((res) => {
      setTransactions(res.data)
    })
  }, [])

  const updateTransactions = () =>{
    axios.get(consts.TRANSACTION_URL).then((res) => {
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