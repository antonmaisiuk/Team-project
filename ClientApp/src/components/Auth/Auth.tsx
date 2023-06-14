import React, {Dispatch, FC, HTMLAttributes, SetStateAction, SyntheticEvent, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Button, Form} from "react-bootstrap";
import {StyledForm, StyledAuthContainer, StyledTitle, StyledFormGroup} from './style';
import {useNavigate} from "react-router-dom";
import {Link} from 'react-router-dom';


export enum AuthType {
  register,
  login
}

export interface AuthInterface {
  type: AuthType;
  setIsLogged: Dispatch<SetStateAction<boolean>>

}

const Auth: FC<AuthInterface & HTMLAttributes<HTMLDivElement>> = ({
  type,
  setIsLogged,
  className = 'auth'
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showEmailSentAlert, setShowEmailSentAlert] = useState(false);

  const navigate = useNavigate();

  const submit = async (e: SyntheticEvent, type: AuthType) => {
    e.preventDefault();

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
      console.log('### Success login',);
      if (type !== AuthType.login) {
        setShowEmailSentAlert(true);
      }
      setIsLogged(true);
      setRedirect(true);
      // window.location.reload();
    } else {
      const errorMsg = JSON.parse(await response.text());
      setErrorMsg(errorMsg.message);
      console.log(errorMsg.message);
    }
  }

  useEffect(() => {
    if (redirect) {
      type === AuthType.login ? navigate('/') : navigate('/login');
    }
  });

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
                <Form.Control type="text" required placeholder="Enter name" onChange={e => setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type={"phone"} required placeholder="Enter your phone" onChange={e => setPhone(e.target.value)}/>
              </Form.Group>
            </> : ``}

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" required placeholder="Enter your email" onChange={e => setEmail(e.target.value)}/>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" required placeholder="Password" onChange={e => setPassword(e.target.value)}/>
          </Form.Group>

          {errorMsg ?
            <>
              <Alert key={'danger'} variant={'danger'}>
                {errorMsg}
              </Alert>
            </> : ``}

          {showEmailSentAlert &&
              <Alert key={'success'} variant={'success'}>
                  Wiadomość została wysłana na adres {showEmailSentAlert}
              </Alert>
          }

          {/*<Form.Group className="mb-3 errorMsg">*/}
          {/*  <Form.Label className="danger">{errorMsg}</Form.Label>*/}
          {/*</Form.Group>*/}

          <StyledFormGroup className="mb-3" controlId="formBasicButtons" type={type}>
            {type === AuthType.login ?
              <>

                  <div className={'auth-buttons'}>
                    <Button variant="primary" type="submit">Login</Button>
                    <Button variant="primary" onClick={() => navigate('/register')}>Registration</Button>
                  </div>
                  <div>
                    <Link to="/forgot-password" className="btn btn-link">
                      Forgot Password?
                    </Link>
                  </div>

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
