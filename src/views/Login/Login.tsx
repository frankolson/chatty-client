import React, { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/authentication';
import { login, ILogin } from '../../utils/api';

interface ISessionCreationResponse {
  id: string;
  name: string;
  email: string;
  account_id: string;
}

interface ISessionCreationError {
  error: string;
}

export default function Login() {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [loginValues, setLoginValues] = useState<ILogin>({ email: '', password: '' });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    login(loginValues).then((response: Response) => {
      if (!response.ok) { throw response; }

      const jwtToken = response.headers.get('Authorization')!.split(' ')[1];
      authContext.login(jwtToken);
      return response.json();
    }).then((data: ISessionCreationResponse) => history.push(`/accounts/${data.account_id}`))
      .catch((error: Response) => (
        error.json().then((errorData: ISessionCreationError) => setFormErrorMessage(errorData.error))
      ));
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setLoginValues({ ...loginValues, [name]: value })
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