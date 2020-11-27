import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

interface ILogin {
  email: string;
  password: string;
}

export default function Login() {
  const [loginValues, setLoginValues] = useState<ILogin>({ email: '', password: '' });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Session creation values: ", loginValues);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginValues({ ...loginValues, [name]: value })
  }

  return (
    <Container>
      <Row>
        <Col className="mx-auto mt-5" md="6">
          <Card>
            <Card.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={loginValues.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={loginValues.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}