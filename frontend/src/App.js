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

  const [transactions, setTransactions] = useState('')

  useEffect(() => {
    axios.get('http://localhost:8000/transactions').then((res) => {
      setTransactions(res.data)
    })
  }, [])

  return (
    <Router>
    <div className="App">
    <div id="home-background"></div>
    <AppNav/>
    <Route path="/transactions" exact render={() => <Transactions transactions = {transactions}/>} />
    <Route path="/breakdown" exact render={() => <BreakDown></BreakDown>} />
    <Route path="/operations" exact render={() =><Operation/>} />
    </div>
    </Router>
  );
}

export default App;
