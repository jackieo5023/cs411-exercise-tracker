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
import { login } from "../utils/api";

function Login({ setUserId }) {
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
        localStorage.setItem("userId", response.id);
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
                <h1>Login</h1>
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
                <Link to="/register">
                  <Button>Sign Up</Button>
                </Link>
              </Col>
            </FormGroup>
          </Form>
        </Row>
      </Col>
    </Container>
  );
}

export default Login;
