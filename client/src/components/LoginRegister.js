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
import { register, login } from "../utils/api";

function Register({ setUserId, setIsLogin }) {
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const { name, weight, height, age, gender } = e.target.elements;

      const response = await register({
        name: name.value,
        weight: weight.value,
        height: height.value,
        age: age.value,
        gender: gender.value,
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
          <Label for="name" sm={2}>
            Name
          </Label>
          <Col>
            <Input type="text" name="name" id="name" placeholder="John Smith" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="weight" sm={2}>
            Weight (lbs)
          </Label>
          <Col>
            <Input type="number" name="weight" id="weight" placeholder="150" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="height" sm={2}>
            Height (inches)
          </Label>
          <Col>
            <Input type="number" name="height" id="height" placeholder="60" />
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
            <Button onClick={() => setIsLogin(true)}>Go Back to Login</Button>
          </Col>
        </FormGroup>
      </Form>
    </Row>
  );
}

function Login({ setUserId, setIsLogin }) {
  const [message, setMessage] = useState("");

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      const response = await login({ id: e.target.elements.id.value });
      if (response.status !== 200) {
        setMessage(response.message);
      } else {
        setMessage("");
        setUserId(response.id);
      }
    },
    [setUserId]
  );

  return (
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
          <Label for="id" sm={2}>
            ID
          </Label>
          <Col>
            <Input type="text" name="id" id="id" placeholder="0" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="text-center">
            <Button type="submit">Login</Button>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Col className="text-center">
            <Button onClick={() => setIsLogin(false)}>Sign Up</Button>
          </Col>
        </FormGroup>
      </Form>
    </Row>
  );
}

function LoginRegister({ setUserId }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Container>
      <Col sm={{ size: 10, offset: 4 }} className="mb-4">
        <div className="d-flex flex-wrap align-items-center mb-4 ml-5">
          <h1 className="d-inline-block mb-0 mt-3 mr-auto pr-3 justify-content-center ml-3">
            {isLogin ? "Login" : "Sign Up"}
          </h1>
        </div>
        {isLogin ? (
          <Login setUserId={setUserId} setIsLogin={setIsLogin} />
        ) : (
          <Register setUserId={setUserId} setIsLogin={setIsLogin} />
        )}
      </Col>
    </Container>
  );
}

export default LoginRegister;
