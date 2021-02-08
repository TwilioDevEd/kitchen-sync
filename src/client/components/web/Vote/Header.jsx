import React from 'react';
import Navbar from 'react-bootstrap/Navbar';

export default function Header() {
  return (
    <Navbar
      bg="white"
      expand="lg"
      fixed="top"
      className="shadow-sm border-bottom"
    >
      <Navbar.Brand>Kitchen Sync</Navbar.Brand>
    </Navbar>
  );
}
