import React from "react";
import {Button, Input} from "reactstrap";
import {edit, getCurrentUser, getUsers} from "components/authComponents/authFunctions";
import "styles/dashboard.css";

class Applicant extends React.Component {
  state = {
    // States to store inputs
    name: "",
    email: "",
    phone: "",
    role: "",
    userID: "",

    // Flag for whether the user is admin
    isAdmin: this.props.isAdmin,

    // Update Messages
    nameMsg: "Press Edit to update Name",
    emailMsg: "Press Edit to update Email",
    phoneMsg: "Press Edit to update Phone",
    roleMsg: "Press Edit to update Role (Admin Only)",
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
    // Load current user data
    getCurrentUser().then((res) => this.setState({
      name: res.name,
      email: res.email,
      phone: res.phone,
      role: res.role,
      userID: res._id,
    }));
  }

  // Save edits to the db
  edit = (param) => (event) => {
    event.preventDefault();
    console.log(this.state.name)
    let value = null;
    if (param === "/name") {
      value = this.state.name;
    } else if (param === "/email") {
      value = this.state.email;
    } else if (param === "/phone") {
      value = this.state.phone;
    } else if (param === "/role") {
      value = this.state.role;

      if (value === "applicant") {
        this.setState({
          isAdmin: false,
        });
        window.location.href = "/";
      }
    }

    const result = edit(this.state.userID, "replace", param, value);
    // Get result of the promise
    result.then((a) => {
      if (!a) {
        if (param === "/name") {
          this.setState({
            nameMsg: "Please enter valid inputs!",
          });
        } else if (param === "/email") {
          this.setState({
            emailMsg: "Please enter valid inputs!",
          });
        } else if (param === "/phone") {
          this.setState({
            phoneMsg: "Please enter valid inputs!",
          });
        } else if (param === "/role") {
          this.setState({
            roleMsg: "Please enter valid inputs!",
          });
        }
      } else {
        if (param === "/name") {
          this.setState({
            nameMsg: "Successfully Updated!",
          });
        } else if (param === "/email") {
          this.setState({
            emailMsg: "Successfully Updated!",
          });
        } else if (param === "/phone") {
          this.setState({
            phoneMsg: "Successfully Updated!",
          });
        } else if (param === "/role") {
          this.setState({
            roleMsg: "Successfully Updated!",
          });
        }
      }
    });
  };

  render() {
    // If the user is an admin
    return (
      <div className="adminSpacer">
        <h1>Your profile</h1>
        <div className="applicantProfile">
          <div className="applicantFieldSpacer">
            <h2>Name</h2>
            <Input
              type="name"
              name="name"
              className="inputText"
              value={this.state.name}
              onChange={this.handleInputChange}
            />
            <Button className="editButton" onClick={this.edit("/name")}>
              Edit
            </Button>
            <div className="statusText">
              <p>{this.state.nameMsg}</p>
            </div>
          </div>
          <div className="applicantFieldSpacer">
            <h2>Email</h2>
            <Input
              type="email"
              name="email"
              className="inputText"
              value={this.state.email}
              onChange={this.handleInputChange}
            />
            <Button className="editButton" onClick={this.edit("/email")}>
              Edit
            </Button>
            <div className="statusText">
              <p>{this.state.emailMsg}</p>
            </div>
          </div>
          <div className="applicantFieldSpacer">
            <h2>Phone</h2>
            <Input
              type="phone"
              name="phone"
              className="inputText"
              value={this.state.phone}
              onChange={this.handleInputChange}
            />
            <Button className="editButton" onClick={this.edit("/phone")}>
              Edit
            </Button>
            <div className="statusText">
              <p>{this.state.phoneMsg}</p>
            </div>
          </div>
          <div className="applicantFieldSpacer">
            <h2>Role</h2>
            <Input
              type="role"
              name="role"
              className="inputText"
              value={this.state.role}
            />
            <div className="statusText">
              <p></p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Applicant;
