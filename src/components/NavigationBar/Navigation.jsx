import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Navigation = () => {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="primary"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand className="fs-3">Stay-Sync</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto">
            <Nav.Link as={NavLink} to={"/checkin"}>
              CheckIn
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/ledge"}>
              Ledge
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/allguests"}>
              All Guests
            </Nav.Link>
            <Nav.Link as={NavLink} to={"/review"} disabled={true}>
              Review
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
