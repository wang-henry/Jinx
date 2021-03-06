import React from "react";
import {Button, Input} from "reactstrap";
import {edit, getCurrentUser, getUsers, logout} from "components/authComponents/authFunctions";
import "styles/dashboard.css";

class Applicant extends React.Component {
  state = {
    // States to store inputs
    name: "",
    email: "",
    phone: "",
    role: "",
    userID: "",
    app: this.props.app,

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
    let value = null;
    let logoutFlag = false;
    let refreshFlag = false;
    if (param === "/name") {
      value = this.state.name;
      refreshFlag = true
    } else if (param === "/email") {
      value = this.state.email;
      refreshFlag = true
    } else if (param === "/phone") {
      value = this.state.phone;
      refreshFlag = true
    } else if (param === "/role") {
      value = this.state.role;

      if (value === "applicant") {
        this.setState({
          isAdmin: false,
        });
        logoutFlag = true;
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
          })
          if (logoutFlag) {
            logout(this.props.app)
          }
        }
      }
    });

    // Check if we need to refresh to update the top right card name
    if (refreshFlag) {
      this.props.history.go(0)
    }
  };

  render() {
    // If the user is an admin
    if (this.state.isAdmin) {
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
              <select
                name="role"
                className="dropDownSelect"
                value={this.state.role}
                onChange={this.handleInputChange}
              >
                <option value="admin">admin</option>
                <option value="applicant">applicant</option>
              </select>
              <Button className="editButton" onClick={this.edit("/role")}>
                Edit
              </Button>
              <div className="statusText">
                <p>{this.state.roleMsg}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
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
                <p>{this.state.roleMsg}</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Applicant;
