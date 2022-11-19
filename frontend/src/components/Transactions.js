import Card from 'react-bootstrap/Card';
import "../style/Transaction.css";
import Button from 'react-bootstrap/Button';
import Transaction from './Transaction';

function Transactions(props) {
  return (
    <div>
        {props.transactions==''?null:props.transactions.map(trans => <Transaction transaction={trans} key={trans.id}/>)}
    </div>
  );
}

export default Transactions;