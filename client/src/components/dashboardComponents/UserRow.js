import {edit, getCurrentUser, logout} from "components/authComponents/authFunctions";
import Avatar from "components/Avatar";
import React from "react";
import {Button, Input} from "reactstrap";
import "styles/dashboard.css";

class UserRow extends React.Component {
  // Get states from props
  state = {
    name: this.props.name,
    email: this.props.email,
    phone: this.props.phone,
    role: this.props.role,
    userID: this.props.userID,

    // App
    app: this.props.app,
    // Current Admin's id
    adminID: "",


    // Update Messages
    nameMsg: "",
    emailMsg: "",
    roleMsg: "",
    phoneMsg: "",
  };

  componentDidMount() {
    // Load current user data
    getCurrentUser().then((res) => this.setState({
      adminID: res._id,
    }));
  }

  // Handle input changes
  handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  };

  // Save edits to the db
  edit = (param) => (event) => {
    event.preventDefault();

    let value = null;
    let logoutFlag = false;
    let refreshFlag = false;
    if (param === "/name") {
      value = this.state.name;
      if(this.state.userID === this.state.adminID){
        refreshFlag = true
      }
    } else if (param === "/email") {
      value = this.state.email;
      if(this.state.userID === this.state.adminID){
        refreshFlag = true
      }
    } else if (param === "/phone") {
      value = this.state.phone;
      if(this.state.userID === this.state.adminID){
        refreshFlag = true
      }
    } else if (param === "/role") {
      value = this.state.role;

      // If the user demotes themselves force logout
      if (this.state.userID === this.state.adminID && value === "applicant") {
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
          });
          if (logoutFlag) {
            logout(this.props.app)
          }
        }
      }
    });

    // Force refresh to update card
    if(refreshFlag){
      this.props.history.go(0)
    }
  };

  render() {
    const {name, handleRemove} = this.props;

    return (
      <tr>
        <td>
          <Avatar name={name}/>
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
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
        </td>
        <td>
          <Button onClick={handleRemove(this.state.userID)}>Remove</Button>
        </td>
      </tr>
    );
  }
}

export default UserRow;
