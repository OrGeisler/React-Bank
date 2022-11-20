import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import './App.css';
import AppNav from './components/AppNav';
import Transaction from './components/Transaction';
import Operation from './components/Operation';
import Transactions from './components/Transactions';
import BreakDown from './components/BreakDown';

function App() {

  const [balance, setBalance] = useState('')


  useEffect(() => {
    axios.get('http://localhost:8000/balance').then((res) => {
      setBalance(res.data)
    })
  }, [])

  const updateBalance = () =>{
    axios.get('http://localhost:8000/balance').then((res) => {
      setBalance(res.data)
    })
  }

  return (
    <Router>
    <div className="App">
    <div id="home-background"></div>
    <AppNav balance = {balance}/>
    <Route path="/transactions" exact render={() => <Transactions updateBalance = {updateBalance}/>} />
    <Route path="/breakdown" exact render={() => <BreakDown></BreakDown>} />
    <Route path="/operations" exact render={() =><Operation updateBalance = {updateBalance} balance ={balance}/>} />
    </div>
    </Router>
  );
}

export default App;
