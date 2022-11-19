import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../style/Operation.css";
import React, { useState } from "react";
import axios from 'axios'

function Operation() {
  const [inputs, setInputs] = useState({
    amount: "",
    vendor: "",
    category: "",
    deposit: "false",
    withdraw: "false"
  });

  const handleInput = (e) => {
    const userInputs = { ...inputs };
    let value;
    let name = e.target.attributes.name.value;
    if (e.target.type == "checkbox") {
      value = e.target.checked;
    } else {
      value = e.target.value;
    }
    userInputs[name] = value;
    return setInputs(userInputs);
  };

  const validate =() => {
    if (inputs.amount == "" || inputs.category == "" || inputs.vendor == "") {
        return [false,"please fill all the fields"]
    }
    else if(inputs.deposit == inputs.withdraw){
        return [false,"checkbox values are invalid"]
    }
    else{
        return [true,'succses']
    }
  }


  const onSubmit = () => {
    const [isvalid,messege] = validate()
    if (!isvalid) {
        alert(messege)
    }
    else{
        const transaction = {'amount':parseInt(inputs.amount), 'category': inputs.category, 'vendor':inputs.vendor,'type': inputs.deposit ===true?'deposit':'withdraw'}
        axios.post('http://localhost:8000/transactions', transaction)
    }
  };


  return (
    <Form className="form" style={{ width: "20rem", height: "27rem" }}>
      <Form.Label>Insert Transactions</Form.Label>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Text className="text-muted">
          We'll never share your info with anyone else.
        </Form.Text>
        <Form.Label>Transaction Amount</Form.Label>
        <Form.Control
          name="amount"
          onChange={handleInput}
          className="input"
          style={{ width: "19rem" }}
          value={inputs.amount}
          type="number"
          placeholder="Amount"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Transaction Vendor</Form.Label>
        <Form.Control
          name="vendor"
          onChange={handleInput}
          className="input"
          style={{ width: "19rem" }}
          value={inputs.vendor}
          type="vendor"
          placeholder="Vendor"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Transaction Category</Form.Label>
        <Form.Control
          name="category"
          onChange={handleInput}
          className="input"
          style={{ width: "19rem" }}
          value={inputs.category}
          type="category"
          placeholder="Category"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          name="deposit"
          onChange={handleInput}
          className="input"
          style={{ width: "19rem" }}
          type="checkbox"
          label="Deposit"
        />
        <Form.Check
          name="withdraw"
          onChange={handleInput}
          className="input"
          style={{ width: "19rem" }}
          type="checkbox"
          label="Withdraw"
        />
      </Form.Group>
      <Button variant="primary" type="submit" onClick={onSubmit}>
        Submit
      </Button>
    </Form>
  );
}

export default Operation;
