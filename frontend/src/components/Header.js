import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./Header.css";

export default function Header() {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/" className="nounderline">
          <h3>Colaboradores</h3>
        </Link>
        <Link to="/new">
          <Button variant="primary">Adicionar</Button>
        </Link>
      </div>
    </header>
  );
}
