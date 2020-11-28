import React, { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/authentication';

interface IAccountCreation {
  name: string;
  owner_name: string;
  owner_email: string;
  owner_password: string;
  owner_password_confirmation: string;
}

interface IAccountCreationResponse {
  id: string;
  name: string;
  owner_name: string;
  owner_email: string;
}

interface IAccountCreationError {
  error: string;
}

export default function Login() {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [accountValues, setAccountValues] = useState<IAccountCreation>({
    name: '',
    owner_name: '',
    owner_email: '',
    owner_password: '',
    owner_password_confirmation: ''
  });

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('http://localhost:3000/accounts', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ account: accountValues })
    }).then((response: Response) => {
      if (!response.ok) { throw response; }

      const jwtToken = response.headers.get('Authorization')!.split(' ')[1];
      authContext.login(jwtToken)
      return response.json()
    }).then((data: IAccountCreationResponse) => history.push(`/accounts/${data.id}`))
      .catch((error: Response) => (
        error.json().then((errorData: IAccountCreationError) => setFormErrorMessage(errorData.error))
      ));
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setAccountValues({ ...accountValues, [name]: value })
  }

  return (
    <Container>
      <Row>
        <Col className="mx-auto mt-5" md="6">
          {formErrorMessage &&(
             <Alert variant='danger'>{formErrorMessage}</Alert>
          )}

          <Card>
            <Card.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                  <Form.Label>Account name</Form.Label>
                  <Form.Control
                    name="name"
                    placeholder="Enter account name"
                    value={accountValues.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="owner_name"
                    placeholder="Enter your name"
                    value={accountValues.owner_name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="owner_email"
                    type="email"
                    placeholder="Enter email"
                    value={accountValues.owner_email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="owner_password"
                    type="password"
                    placeholder="Password"
                    value={accountValues.owner_password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
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