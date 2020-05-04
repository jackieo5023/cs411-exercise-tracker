import React, { useCallback, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import { register } from "../utils/api";

function Register({ setUserId }) {
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const {
        username,
        password,
        firstName,
        weight,
        height,
        age,
        gender,
        lastName,
      } = e.target.elements;

      const response = await register({
        username: username.value,
        password: password.value,
        firstName: firstName.value,
        weight: weight.value,
        height: height.value,
        age: age.value,
        gender: gender.value,
        lastName: lastName.value,
      });
      if (response.status !== 201) {
        setMessage(response.message);
      } else {
        setMessage("");
        setUserId(response.id);
      }
    },
    [setUserId]
  );

  return (
    <Container>
      <Col sm={{ size: 10, offset: 3 }}>
        <Row>
          <Form onSubmit={async (e) => handleSubmit(e)}>
            <FormGroup row>
              <Col className="text-center">
                <h1>Sign Up</h1>
              </Col>
            </FormGroup>
            {message.length > 0 && (
              <FormGroup row>
                <Col className="text-center">
                  <Alert color="danger">{message}</Alert>
                </Col>
              </FormGroup>
            )}
            <FormGroup row>
              <Label for="username" sm={3}>
                Username
              </Label>
              <Col>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="johnnyappleseed"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="firstName" sm={3}>
                Password
              </Label>
              <Col>
                <Input type="password" name="password" id="password" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="firstName" sm={3}>
                First Name
              </Label>
              <Col>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  placeholder="Johnny"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="lastName" sm={3}>
                Last Name
              </Label>
              <Col>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  placeholder="Appleseed"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="weight" sm={3}>
                Weight (lbs)
              </Label>
              <Col>
                <Input
                  type="number"
                  name="weight"
                  id="weight"
                  placeholder="150"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="height" sm={3}>
                Height (inches)
              </Label>
              <Col>
                <Input
                  type="number"
                  name="height"
                  id="height"
                  placeholder="60"
                />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="age" sm={3}>
                Age (years)
              </Label>
              <Col>
                <Input type="number" name="age" id="age" placeholder="25" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="gender" sm={3}>
                Gender
              </Label>
              <Col sm={9}>
                <Input type="select" name="gender" id="gender">
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Input>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col className="text-center">
                <Button type="submit">Sign Up</Button>
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col className="text-center">
                <Link to="/login">
                  <Button>Go Back to Login</Button>
                </Link>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Col>
    </Container>
  );
}

export default Register;
