import React, { ChangeEvent, FormEvent, useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from "react-bootstrap";
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../contexts/authentication';

interface ISignup {
  account_id: number | null;
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

interface ISignupResponse {
  id: string;
  name: string;
  email: string;
  account_id: string;
}

interface ISignupError {
  error: string;
}

interface IAccount {
  id: number;
  name: string;
}

export default function Signup() {
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [accounts, setAccounts] = useState<IAccount[]>([]);
  const [formErrorMessage, setFormErrorMessage] = useState<string | null>(null);
  const [signupValues, setSignupValues] = useState<ISignup>({
    account_id: null,
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({ user: signupValues })
    }).then((response: Response) => {
      if (!response.ok) { throw response; }

      const jwtToken = response.headers.get('Authorization')!.split(' ')[1];
      authContext.login(jwtToken);
      return response.json();
    }).then((data: ISignupResponse) => history.push(`/accounts/${data.account_id}`))
      .catch((error: Response) => (
        error.json().then((errorData: ISignupError) => setFormErrorMessage(errorData.error))
      ));
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setSignupValues({ ...signupValues, [name]: value })
  }

  useEffect(() => {
    fetch('http://localhost:3000/accounts', {
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }
    }).then((response: Response) => {
      if (!response.ok) { throw response; }
      return response.json();
    }).then((data: IAccount[]) => setAccounts(data))
      .catch((error: Response) => console.log(error));
  }, [])

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
                  <Form.Label>Account</Form.Label>
                  <Form.Control as="select"
                    name="account_id"
                    // placeholder="Enter email"
                    value={signupValues.account_id || undefined}
                    onChange={handleInputChange}
                    custom
                  >
                    <option value={undefined}>Select an account</option>
                    {accounts.map((account: IAccount) =>(
                      <option key={account.id} value={account.id}>{account.name}</option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    placeholder="Enter name"
                    value={signupValues.name}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="Enter email"
                    value={signupValues.email}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={signupValues.password}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password confirmation</Form.Label>
                  <Form.Control
                    name="password_confirmation"
                    type="password"
                    placeholder="Password confirmation"
                    value={signupValues.password_confirmation}
                    onChange={handleInputChange}
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Signup
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}