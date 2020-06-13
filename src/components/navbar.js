import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

function FinalNavbar() {
  return (
    <Navbar expand="lg" className="navbar navbar-dark bg-dark">
      <Navbar.Brand href="/">Exercise-Tracker</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/add-exercise">Add Exercise</Nav.Link>
          <Nav.Link href="/exercises">Exercises</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default FinalNavbar;
