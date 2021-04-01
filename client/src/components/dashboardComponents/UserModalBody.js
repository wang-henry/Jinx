import yitian from "assets/img/users/yitian.png";
import React from "react";
import {Col, Form, FormGroup, FormText, Input, Label} from "reactstrap";

class UserModalBody extends React.Component {
  render() {
    const {email, password, name, handleChange} = this.props;

    return (
      <Form>
        <FormGroup row>
          <Label for="exampleName" sm={2}>
            Profile
          </Label>
          <Col sm={10}>
            <img
              src={yitian}
              alt="Avatar"
              style={{borderRadius: "50%", width: "50px"}}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleName" sm={2}>
            Name
          </Label>
          <Col sm={10}>
            <Input
              type="name"
              name="name"
              placeholder="Yitian Bitian"
              value={name}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="exampleEmail" sm={2}>
            Email
          </Label>
          <Col sm={10}>
            <Input
              type="email"
              name="email"
              placeholder="yz@email.com"
              value={email}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>

        <FormGroup row>
          <Label for="examplePassword" sm={2}>
            Password
          </Label>
          <Col sm={10}>
            <Input
              type="password"
              name="password"
              placeholder="Windsor is cool"
              value={password}
              onChange={handleChange}
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleText" sm={2}>
            Bio
          </Label>
          <Col sm={10}>
            <Input type="textarea" name="text"/>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleFile" sm={2}>
            Resume
          </Label>
          <Col sm={10}>
            <Input type="file" name="file"/>
            <FormText color="muted">Add a new resume for this user.</FormText>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

export default UserModalBody;
