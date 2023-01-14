import React, {FC, HTMLAttributes, SyntheticEvent, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, Form} from "react-bootstrap";
import {StyledForm, StyledAuthContainer, StyledTitle, StyledFormGroup} from './style';
import {useNavigate} from "react-router-dom";


export enum AuthType {
  register,
  login
}

export interface AuthInterface {
  type: AuthType;
}

const Auth: FC<AuthInterface & HTMLAttributes<HTMLDivElement>> = ({
                                                                    type,
                                                                    className = 'auth'
                                                                  }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const submit = async (e: SyntheticEvent, type: AuthType) => {
    e.preventDefault();

    setEmail('anton@gmail.com');
    setPhone('375336315100')

    const url = type === AuthType.login ? 'api/login' : 'api/register';
    const response = await fetch(url,
      type === AuthType.login ? {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        credentials: 'include',

        body: JSON.stringify({
          email,
          password
        })
      } : {
        method: 'Post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          name,
          phone,
          email,
          password,
        })
      })
    if (response.ok) {
      setRedirect(true);
    } else {
      const errorMsg = JSON.parse(await response.text());
      setErrorMsg(errorMsg.message);
      console.log(errorMsg.message);
    }
  }
  const navigate = useNavigate();

  if (redirect) {
    type === AuthType.login ? navigate('/transactions') : navigate('/login');
  }
  return (

    <StyledAuthContainer className={className}>
      <StyledForm>
        <StyledTitle className="mb-3">
          {type === AuthType.login ? 'Login' : 'Registration'}
        </StyledTitle>

        <Form onSubmit={e => submit(e, type)}>


          {type === AuthType.register ?
            <>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name" onChange={e => setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="phone" placeholder="Enter your phone" onChange={e => setPhone(e.target.value)}/>
              </Form.Group>
            </> : ``}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </Form.Group>

          {errorMsg ?
            <>
              <Alert key={'danger'} variant={'danger'}>
                {errorMsg}
              </Alert>
            </> : ``}

          {/*<Form.Group className="mb-3 errorMsg">*/}
          {/*  <Form.Label className="danger">{errorMsg}</Form.Label>*/}
          {/*</Form.Group>*/}

          <StyledFormGroup className="mb-3" controlId="formBasicButtons" type={type}>
            {type === AuthType.login ?
              <>
                <Button variant="primary" type="submit"> Login </Button>
                <Button variant="primary" onClick={() => navigate('/register')}> Registration </Button>
              </>
              :
              <>
                <Button variant="primary" type="submit"> Register </Button>
              </>}
          </StyledFormGroup>
        </Form>
      </StyledForm>
    </StyledAuthContainer>
  );
};

export default Auth;
