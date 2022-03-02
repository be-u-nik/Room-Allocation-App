import React, { Component } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";
import { createMessage } from "../../actions/messages";
import "./RegisterScreen.css";

export class ResgisterScreen extends Component {
  state = {
    first_name: "",
    last_name: "",
    email: "",
    rollNumber: "",
    phoneNumber: "",
    password: "",
    password2: "",
  };

  static propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const {
      first_name,
      last_name,
      email,
      rollNumber,
      phoneNumber,
      password,
      password2,
    } = this.state;
    if (password !== password2) {
      this.props.createMessage({
        passwordsdoNotMatch: "Passwords do not match",
      });
    } else {
      const newUser = {
        first_name,
        last_name,
        email,
        rollNumber,
        phoneNumber,
        password,
      };
      this.props.register(newUser);
    }
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  render() {
    const {
      first_name,
      last_name,
      email,
      rollNumber,
      phoneNumber,
      password,
      password2,
    } = this.state;
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    return (
      <Container fluid className="registerContainer">
        <Row
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Col md={8} lg={6}>
            <Card className="m-1 p-4 registerContainer__registerCard">
              <div className="loginContainer__loginCard__topImg rounded-circle">
                <img
                  src="https://brandeps.com/logo-download/I/IIT-Kharagpur-logo-vector-01.svg"
                  alt="..."
                />
              </div>
              <Card.Title className="text-center mt-5">
                Room Allocation portal Register
              </Card.Title>
              <Card.Body>
                <Form onSubmit={this.onSubmit}>
                  <div className="d-flex flex-row justify-content-between">
                    <Form.Group className="mb-3 me-2 w-100">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter First name"
                        onChange={this.onChange}
                        name="first_name"
                        value={first_name}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Last name"
                        onChange={this.onChange}
                        name="last_name"
                        value={last_name}
                      />
                    </Form.Group>
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={this.onChange}
                      name="email"
                      value={email}
                    />
                  </Form.Group>
                  <div className="d-flex flex-row justify-content-between">
                    <Form.Group className="mb-3 me-2 w-100">
                      <Form.Label>Roll Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Roll Number"
                        onChange={this.onChange}
                        name="rollNumber"
                        value={rollNumber}
                      />
                    </Form.Group>
                    <Form.Group className="mb-3 w-100">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Phone Number"
                        onChange={this.onChange}
                        name="phoneNumber"
                        value={phoneNumber}
                      />
                    </Form.Group>
                  </div>

                  <Form.Group className="mb-3">
                    <Form.Label>Create Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={this.onChange}
                      name="password"
                      value={password}
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Confirm Password"
                      onChange={this.onChange}
                      name="password2"
                      value={password2}
                    />
                  </Form.Group>

                  <div className="d-flex flex-column justify-content-center">
                    <Button variant="primary" type="submit">
                      Register
                    </Button>
                    <p className="mt-2">
                      Go to <Link to="/login">Login page?</Link>
                    </p>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  register,
  createMessage,
})(ResgisterScreen);
