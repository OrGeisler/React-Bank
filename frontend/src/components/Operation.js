import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../style/Operation.css";
import React, { useState } from "react";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function Operation(props) {
  const [inputs, setInputs] = useState({
    amount: "",
    vendor: "",
    category: "",
    deposit: false,
    withdraw: false,
  });

  const [valid, setValid] = useState({
    type: "",
    messege: "",
  });

  const [open, setOpen] = React.useState(false);

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
    userInputs["amount"] = "";
    userInputs["vendor"] = "";
    userInputs["category"] = "";
    userInputs["deposit"] = false;
    userInputs["withdraw"] = false;
    setInputs(userInputs);
  };

  const validate = () => {
    const isValid = { ...valid };

    if (inputs.amount == "" || inputs.category == "" || inputs.vendor == "") {
      isValid["type"] = false;
      isValid["messege"] = "please fill all the fields";
      setValid(isValid);
      return [false, "please fill all the fields"];
    } else if (inputs.deposit == inputs.withdraw) {
      isValid["type"] = false;
      isValid["messege"] = "checkbox values are invalid";
      setValid(isValid);
      return [false, "checkbox values are invalid"];
    } else if (
      inputs.withdraw == true &&
      props.balance.sum < parseInt(inputs.amount)
    ) {
      isValid["type"] = false;
      isValid["messege"] = "you dont have enough money!";
      setValid(isValid);
      return [false, "you dont have enough money!"];
    } else {
      isValid["type"] = true;
      isValid["messege"] = "success!";
      setValid(isValid);
      return [true, "success"];
    }
  };

  const onSubmit = async () => {
    const [isvalid, _] = validate();
    if (isvalid) {
      const transaction = {
        amount: parseInt(
          inputs.deposit === true ? inputs.amount : `-${inputs.amount}`
        ),
        category: inputs.category,
        vendor: inputs.vendor,
      };
      await axios.post("http://localhost:8000/transactions", transaction);
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
      <div className="form" style={{ width: "20rem", height: "27rem" }}>
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
        <Button variant="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={valid["type"] ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {valid["messege"]}
        </Alert>
      </Snackbar>
    </div>
  );
}
export default Operation;
