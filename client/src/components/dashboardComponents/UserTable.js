import yitian from "assets/img/users/yitian.png";
import axios from "axios";
import ENV from "config.js";
import React from "react";
import {
  Button,
  Card,
  CardHeader,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";
import {removeUser, signup} from "../authComponents/authFunctions";
import UserModalBody from "./UserModalBody";
import UserRow from "./UserRow";
import Applicant from "./Applicant";

class UserTable extends React.Component {
  state = {
    modal: false,
    modal_backdrop: false,
    modal_nested_parent: false,
    modal_nested: false,
    backdrop: true,

    email: "",
    password: "",
    name: "",
    phone: "",
    role: "",
    statusMsg: "",
    users: [],
  };

  getUsers = () => {
    const API_HOST = ENV.api_host;
    const app = this.props.app;
    axios
      .post(`${API_HOST}/users/all`, {id: app.state.id})
      .then((res) => {
        this.setState({
          users: res.data.user,
        });
      })
      .catch((err) => console.log(err));
  };

  toggle = (modalType) => () => {
    // Remove status msg
    this.setState({
      statusMsg: "",
    });

    if (!modalType) {
      this.setState({
        modal: !this.state.modal,
      });
    }

    this.setState({
      [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
    });
  };

  removeUser = param => (event) => {
    event.preventDefault()

    const result = removeUser(this.props.app, param)
    // Get result of the promise
    result.then((a) => {
      // Update the display again
      this.getUsers();
    });
  }

  // Save the changes to the db
  saveChanges = (event) => {
    event.preventDefault();
    const credentials = {
      email: this.state.email,
      password: this.state.password,
      name: this.state.name,
      role: this.state.role,
    };

    if (this.state.phone) {
      credentials.phone = this.state.phone;
    }

    const result = signup(credentials, this.props.app);
    // Get result of the promise
    result.then((a) => {
      if (!a) {
        this.setState({
          statusMsg: "Please enter valid inputs!",
        });
      } else {
        this.setState({
          statusMsg: "User created!",
        });
        // Update the users table again
        this.getUsers();
      }
    });
    window.location.href = "/";
  };

  // Handle input changes
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  componentDidMount() {
    // Initialize the table
    this.getUsers();
  }

  render() {
    if (this.props.app.state.role === "admin") {
      return (
        <div>
          <Applicant name={this.props.app.state.name}
                     email={this.props.app.state.email}
                     role={this.props.app.state.role}
                     userID={this.props.app.state.id}
                     isAdmin={true}
          />
          <Card>
            <CardHeader>
              User Table{""}
              <small className="text-muted text-capitalize">2020-2021</small>
              <Button style={{float: "right"}} onClick={this.toggle()}>
                Add User
              </Button>
            </CardHeader>
            <Table striped>
              <thead>
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Delete</th>
              </tr>
              </thead>
              <tbody>
              {this.state.users.map((user) => {
                return (
                  <UserRow
                    key={user._id}
                    avatar={yitian}
                    name={user.name}
                    email={user.email}
                    role={user.role}
                    userID={user._id}
                    handleRemove={this.removeUser}
                  />
                );
              })}
              </tbody>
            </Table>
            <Modal
              isOpen={this.state.modal}
              toggle={this.toggle()}
              className={this.props.className}
            >
              <ModalHeader toggle={this.toggle()}>User</ModalHeader>
              <ModalBody>
                <UserModalBody
                  email={this.state.email}
                  password={this.state.password}
                  name={this.state.name}
                  phone={this.state.phone}
                  handleChange={this.handleInputChange}
                />
              </ModalBody>
              <p style={{textAlign: "center"}}>{this.state.statusMsg}</p>
              <ModalFooter>
                <Button color="primary" onClick={this.saveChanges}>
                  Save Changes
                </Button>{" "}
                <Button color="secondary" onClick={this.toggle()}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
          </Card>
        </div>
      );
    }
    // Applicant, do not render admin table
    else {
      return (
        <Applicant name={this.props.app.state.name}
                   email={this.props.app.state.email}
                   role={this.props.app.state.role}
                   userID={this.props.app.state.id}
                   isAdmin={false}
        />
      )
    }
  }
}

export default UserTable;
