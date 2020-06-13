import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

function AddUserForm() {
  const [username, setUsername] = useState("");

  const handleChange = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = { name: username };
    axios({
      method: "post",
      url: "http://localhost:5000/add-user",
      data: user,
    })
      .then((res) => {
        console.log(res);
        if (res.data == "Error on creating user(server.js)") alert("Error");
        else {
          alert("User Added!");
        }
      })
      .catch((err) => console.error(err.response));
    setUsername("");
  };

  return (
    <div className="container">
      <h1>Add New User:</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            onChange={handleChange}
            value={username}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}

export default AddUserForm;
