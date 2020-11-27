import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";

interface IAccountCreation {
  name: string;
  owner_email: string;
  owner_password: string;
  owner_password_confirmation: string;
}

export default function Login() {
  const [accountValues, setAccountValues] = useState<IAccountCreation>({
    name: '',
    owner_email: '',
    owner_password: '',
    owner_password_confirmation: ''
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Account creation values: ", accountValues);
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setAccountValues({ ...accountValues, [name]: value })
  }

  return (
    <Container>
      <Row>
        <Col className="mx-auto mt-5" md="6">
          <Card>
            <Card.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Account name</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Enter account name"
                    value={accountValues.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="owner_email"
                    type="email"
                    placeholder="Enter email"
                    value={accountValues.owner_email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="owner_password"
                    type="password"
                    placeholder="Password"
                    value={accountValues.owner_password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password confirmation</Form.Label>
                  <Form.Control
                    name="owner_password_confirmation"
                    type="password"
                    placeholder="Password confirmation"
                    value={accountValues.owner_password_confirmation}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Create account
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}