import React, { Component } from "react";
import { Form, Button, Container, Card, Row, Col } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";
import "./AuthScreen.css";

export class AuthScreen extends Component {
  state = {
    email: "",
    password: "",
  };

  static propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
  };

  onSubmit = (e) => {
    e.preventDefault();
    // console.log("submit");
    this.props.login(this.state.email, this.state.password);
  };

  onChange = (e) =>
    this.setState({
      [e.target.name]: e.target.value,
    });

  render() {
    const { email, password } = this.state;
    if (this.props.isAuthenticated) {
      return <Navigate to="/" />;
    }
    return (
      <Container fluid className="loginContainer">
        <Row
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Col md={8} lg={6}>
            <Card className="m-1 p-4 loginContainer__loginCard">
              <div className="loginContainer__loginCard__topImg rounded-circle">
                <img
                  src="https://brandeps.com/logo-download/I/IIT-Kharagpur-logo-vector-01.svg"
                  alt="..."
                />
              </div>

              <Card.Title className="text-center mt-5">
                Room Allocation portal Auth
              </Card.Title>
              <Card.Body>
                <Form onSubmit={this.onSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      onChange={this.onChange}
                      name="email"
                      value={email}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      onChange={this.onChange}
                      name="password"
                      value={password}
                    />
                  </Form.Group>
                  <div className="d-flex flex-column justify-content-center">
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                    <p className="mt-2">
                      Don't have an account?{" "}
                      <Link to="/register">Register</Link>
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

export default connect(mapStateToProps, { login })(AuthScreen);
