import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Modal,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { logout } from "../../actions/auth";
import { BsFillDoorOpenFill, BsFillDoorClosedFill } from "react-icons/bs";
import { getRoomStatus } from "../../actions/rooms";
import axios from "axios";

export class Dashboard extends Component {
  static PropTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired,
  };
  state = {
    rooms: [],
    show: false,
    selectedRoom: 0,
  };

  getRooms = async () => {
    // console.log("req sent");

    const res = await axios.get(`api/rooms/`);
    this.setState({
      ...this.state,
      rooms: res.data,
    });
    // console.log("res recieved");
  };

  allotRoom = async (roomNumber, rollNumber) => {
    const updatedRoomStatus = JSON.stringify({
      roll_number: rollNumber,
    });
    const updatedUserStatus = JSON.stringify({ isAlloted: "true" });
    // console.log(updatedRoomStatus);
    // console.log(updatedUserStatus);
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Token ${token}`;
    }
    await axios.patch(`api/allocate/${roomNumber + 1}/`, updatedRoomStatus, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    await axios
      .patch(`api/auth/update/${rollNumber}/`, updatedUserStatus, config)
      .then();
    window.location.reload();
  };

  componentDidMount = () => {
    // this.props.getRoomStatus();
    this.getRooms();
  };

  MyVerticallyCenteredModal = () => {
    const { user } = this.props.auth;
    const { rooms, selectedRoom } = this.state;
    return selectedRoom === 0 ? (
      <div></div>
    ) : (
      <Modal
        dialogClassName="modal-50w"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.state.show}
      >
        <Modal.Header className="text-center">
          <Modal.Title id="contained-modal-title-vcenter">
            {rooms[selectedRoom - 1].roll_number === "0"
              ? "This Room is Not Alloted to anyone yet"
              : rooms[selectedRoom - 1].roll_number === user.rollNumber
              ? "This Room is Alloted to you"
              : `This Room is Alloted to Roll Number: ${
                  rooms[selectedRoom - 1].roll_number
                }`}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {rooms[selectedRoom - 1].roll_number === "0" ? (
            <BsFillDoorOpenFill size="5em" className="text-black-50" />
          ) : rooms[selectedRoom - 1].roll_number === user.rollNumber ? (
            <BsFillDoorClosedFill size="5em" className="text-success" />
          ) : (
            <BsFillDoorClosedFill size="5em" className="text-danger" />
          )}

          <p className="pt-2">Room No. {this.state.selectedRoom}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              this.setState({
                ...this.state,
                show: false,
                selectedRoom: 0,
              });
            }}
            variant="outline-secondary"
          >
            Close
          </Button>
          {rooms[selectedRoom - 1].roll_number === "0" && !user.isAlloted ? (
            <Button
              onClick={() => {
                // console.log(`roomNumber is ${this.state.selectedRoom}`);
                this.allotRoom(this.state.selectedRoom, user.rollNumber);
                this.setState({
                  ...this.state,
                  show: false,
                  selectedRoom: 0,
                });
              }}
              variant="secondary"
            >
              Confirm Selection
            </Button>
          ) : (
            ""
          )}
        </Modal.Footer>
      </Modal>
    );
  };

  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { rooms } = this.state;
    return (
      <div style={{ minHeight: "100vh" }}>
        {this.MyVerticallyCenteredModal()}
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#">Room Allocation App</Navbar.Brand>
            <Navbar.Text className="ms-auto me-2">
              Signed in as:{" "}
              <strong>{user.first_name + " " + user.last_name}</strong>{" "}
            </Navbar.Text>
            <div class="d-flex" style={{ height: "2rem" }}>
              <div class="vr"></div>
            </div>
            <Nav className="ms-2">
              <Button
                variant="light"
                className="nav-link"
                onClick={this.props.logout}
              >
                Logout
              </Button>
            </Nav>
          </Container>
        </Navbar>
        <Container className="m-1 p-2">
          <Row>
            <h1>Student details</h1>
            <Col md={6}>
              <div>name : {user.first_name + " " + user.last_name} </div>
              <div>rollNumber: {user.rollNumber}</div>
            </Col>
            <Col md={6}>
              <div>phoneNumber: {user.phoneNumber} </div>
              <div>email: {user.email}</div>
            </Col>
            <Col md={12}>
              <div>
                isAlloted:{user.isAlloted ? "Alloted" : "Not yet Alloted"}{" "}
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            {rooms.map((room) => (
              <Col
                xs={6}
                sm={4}
                lg={2}
                className="d-flex flex-column justify-content-center align-items-center"
                key={room.id}
              >
                <div
                  className={
                    room.roll_number === "0"
                      ? "border border-dark rounded pt-2 px-5 px-lg-3 px-xl-5 my-3"
                      : room.roll_number === user.rollNumber
                      ? "border border-success rounded pt-2 px-5 px-lg-3 px-xl-5 my-3"
                      : "border border-danger rounded pt-2 px-5 px-lg-3 px-xl-5 my-3"
                  }
                >
                  {room.roll_number === "0" ? (
                    <BsFillDoorOpenFill
                      size="5em"
                      // color={"grey"}
                      className="text-black-50"
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          selectedRoom: room.room_number,
                          show: true,
                        });
                      }}
                    />
                  ) : room.roll_number === user.rollNumber ? (
                    <BsFillDoorClosedFill
                      size="5em"
                      className="text-success"
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          selectedRoom: room.room_number,
                          show: true,
                        });
                      }}
                    />
                  ) : (
                    <BsFillDoorClosedFill
                      size="5em"
                      className="text-danger"
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          selectedRoom: room.room_number,
                          show: true,
                        });
                      }}
                    />
                  )}
                  <p
                    className={
                      room.roll_number === "0"
                        ? "pt-2 text-body"
                        : room.roll_number === user.rollNumber
                        ? "pt-2 text-success"
                        : "pt-2 text-danger"
                    }
                  >
                    Room No. {room.room_number}
                  </p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateTOProps = (state) => ({
  auth: state.auth,
  // rooms: state.rooms.rooms,
});

export default connect(mapStateTOProps, { logout })(Dashboard);
