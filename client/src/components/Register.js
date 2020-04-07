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
        firstName,
        weight,
        height,
        age,
        gender,
        lastName,
      } = e.target.elements;

      const response = await register({
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
      <Col sm={{ size: 10, offset: 4 }} className="mb-4">
        <div className="d-flex flex-wrap align-items-center mb-4 ml-5">
          <h1 className="d-inline-block mb-0 mt-3 mr-auto pr-3 justify-content-center ml-3">
            Sign Up
          </h1>
        </div>
        <Row>
          <Form onSubmit={async (e) => handleSubmit(e)}>
            {message.length > 0 && (
              <FormGroup row>
                <Col className="text-center">
                  <Alert color="danger">{message}</Alert>
                </Col>
              </FormGroup>
            )}
            <FormGroup row>
              <Label for="firstName" sm={2}>
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
              <Label for="lastName" sm={2}>
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
              <Label for="weight" sm={2}>
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
              <Label for="height" sm={2}>
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
              <Label for="age" sm={2}>
                Age (years)
              </Label>
              <Col>
                <Input type="number" name="age" id="age" placeholder="25" />
              </Col>
            </FormGroup>
            <FormGroup row>
              <Label for="gender" sm={2}>
                Gender
              </Label>
              <Col sm={10}>
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
