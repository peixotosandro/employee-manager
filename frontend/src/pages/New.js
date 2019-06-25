import React, { Component } from "react";
import { Button, Form } from "react-bootstrap";
import Dialog from "react-bootstrap-dialog";

import api from "../services/api";
import "./New.css";

class New extends Component {
  state = {
    name: "",
    email: "",
    departament: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmmit = async e => {
    e.preventDefault();

    try {
      await api.request.post("employee", this.state);

      this.props.history.push("/");
    } catch (error) {
      if (error.response) {
        this.handleError(error.response.data.error);
      } else if (error.request) {
        this.handleError("ERRO: Sem conexão com o servidor.");
      }
    }
  };

  handleError = error => {
    this.dialog.showAlert(error);
  };

  render() {
    return (
      <div className="new-employee">
        <Dialog
          ref={component => {
            this.dialog = component;
          }}
        />
        <Form onSubmit={this.handleSubmmit}>
          <Form.Group controlId="employee.name">
            <Form.Label>Nome</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={this.handleChange}
              value={this.state.name}
              required="required"
              pattern="^(?!\s*$).+"
            />
          </Form.Group>
          <Form.Group controlId="employee.email">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              onChange={this.handleChange}
              value={this.state.email}
              required="required"
            />
          </Form.Group>
          <Form.Group controlId="employee.departament">
            <Form.Label>Departamento</Form.Label>
            <Form.Control
              type="text"
              name="departament"
              onChange={this.handleChange}
              value={this.state.departament}
              required="required"
              pattern="^(?!\s*$).+"
            />
          </Form.Group>
          <div className="buttons">
            <Button variant="primary" type="submit">
              Adicionar
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => this.props.history.push("/")}
            >
              Voltar
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default New;
