import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../style/Operation.css";
import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import consts from "../model/consts";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

function Operation(props) {

  const [inputs, setInputs] = useState({
    amount: consts.INIT_STRING,
    vendor: consts.INIT_STRING,
    category: consts.INIT_STRING,
    type: "deposit",
  });

  const [valid, setValid] = useState({
    type: consts.INIT_STRING,
    messege: consts.INIT_STRING,
  });

  const [open, setOpen] = React.useState(false);

  const transactionTypeChange = (e) => {
    const userInputs = { ...inputs };
    userInputs["type"] = e.target.value;
    setInputs(userInputs);
  };

  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

  const clearForm = () => {
    const userInputs = { ...inputs };
    userInputs["amount"] = consts.INIT_STRING;
    userInputs["vendor"] = consts.INIT_STRING;
    userInputs["category"] = consts.INIT_STRING;
    setInputs(userInputs);
  };

  const validate = () => {
    const isValid = { ...valid };
    isValid["type"] = false;
    if (
      inputs.amount == consts.INIT_STRING ||
      inputs.category == consts.INIT_STRING ||
      inputs.vendor == consts.INIT_STRING
    ) {
      isValid["messege"] = "please fill all the fields";
      setValid(isValid);
      return false;
    } else if (
      inputs.type == "withdraw" &&
      props.balance.sum < parseInt(inputs.amount)
    ) {
      isValid["messege"] = "you dont have enough money!";
      setValid(isValid);
      return false;
    } else {
      isValid["type"] = true;
      isValid["messege"] = "success!";
      setValid(isValid);
      return true;
    }
  };

  const onSubmit = async () => {
    const isvalid = validate();
    if (isvalid) {
      const transaction = {
        amount: parseInt(
          inputs.type === "deposit" ? inputs.amount : `-${inputs.amount}`
        ),
        category: inputs.category,
        vendor: inputs.vendor,
      };
      await axios.post(consts.TRANSACTION_URL, transaction);
      await props.updateBalance();
    }
    clearForm();
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <div>
      <div className="form" style={{ width: "20rem", height: "31rem" }}>
        <Form.Label className="titel">Insert Transactions</Form.Label>
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
        <Form.Group>
          <Form.Label id="demo-controlled-radio-buttons-group">
            Transaction type
          </Form.Label>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={inputs["type"]}
            onChange={transactionTypeChange}
            style={{ marginLeft: "1rem" }}
          >
            <FormControlLabel
              value="deposit"
              control={<Radio />}
              label="Deposit"
            />
            <FormControlLabel
              value="withdraw"
              control={<Radio />}
              label="Withdraw"
            />
          </RadioGroup>
        </Form.Group>
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={valid["type"] ? consts.SUCCESS : consts.ERROR}
          sx={{ width: "100%" }}
        >
          {valid["messege"]}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default Operation;
