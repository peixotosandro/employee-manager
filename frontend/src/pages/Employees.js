import React, { Component } from "react";
import io from "socket.io-client";
import Dialog from "react-bootstrap-dialog";
import { Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

import api from "../services/api";
import "./Employees.css";

class Employees extends Component {
  state = {
    employees: []
  };

  async componentDidMount() {
    this.listenToSocket();

    try {
      const response = await api.request.get("employee");

      this.setState({ employees: response.data });
    } catch (error) {
      if (error.response) {
        this.handleError(error.response.data.error);
      } else if (error.request) {
        this.handleError("ERRO: Sem conexão com o servidor.");
      }
    }

    Dialog.setOptions({
      defaultCancelLabel: "Não"
    });
  }

  listenToSocket = () => {
    const socket = io(api.baseURL);

    socket.on("employeeRegistered", employee => {
      this.setState({
        employees: [...this.state.employees, employee]
      });
    });

    socket.on("employeeDeleted", id => {
      this.setState({
        employees: this.state.employees.filter(employee => {
          return id !== employee.id;
        })
      });
    });

    socket.on("employeeUpdated", async id => {
      const response = await api.request.get(`employee/${id}`);

      this.setState({
        employees: this.state.employees.map(employee => {
          if (id === employee.id) {
            employee = response.data;
          }
          return employee;
        })
      });
    });
  };

  handleDelete = (id, name) => {
    this.dialog.show({
      title: `Deletar ${name}`,
      body: "Você tem certeza?",
      actions: [
        Dialog.CancelAction(),
        Dialog.Action(
          "Sim",
          async () => {
            try {
              await api.request.delete(`/employee/${id}`);
            } catch (error) {
              if (error.response) {
                this.handleError(error.response.data.error);
              } else if (error.request) {
                this.handleError("ERRO: Sem conexão com o servidor.");
              }
            }
          },
          "btn-danger"
        )
      ],
      bsSize: "small",
      onHide: dialog => {
        dialog.hide();
      }
    });
  };

  handleError = error => {
    this.dialog.showAlert(error);
  };

  render() {
    return (
      <section id="employee-list">
        <Dialog
          ref={component => {
            this.dialog = component;
          }}
        />
        <Container>
          {this.state.employees.map(employee => (
            <Row key={employee.id}>
              <Col sm={3}>
                <span>{employee.name}</span>
              </Col>
              <Col sm={3}>
                <span>{employee.email}</span>
              </Col>
              <Col sm={3}>
                <span>{employee.departament}</span>
              </Col>
              <Col sm={2}>
                <Button
                  variant="danger"
                  onClick={() => this.handleDelete(employee.id, employee.name)}
                >
                  Deletar
                </Button>
              </Col>
              <Col sm={1}>
                <Link to={`/edit/${employee.id}`}>
                  <Button variant="success">Alterar</Button>
                </Link>
              </Col>
            </Row>
          ))}
        </Container>
      </section>
    );
  }
}

export default Employees;
