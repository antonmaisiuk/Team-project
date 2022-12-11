import React, {FC, HTMLAttributes, SyntheticEvent, useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import {StyledForm, StyledAuthContainer, StyledTitle, StyledFormGroup} from './style';
import {useNavigate} from "react-router-dom";


export enum AuthType{
  register,
  login
}

export interface AuthInterface {
  type: AuthType;
}

const Auth:FC<AuthInterface & HTMLAttributes<HTMLDivElement>> = ({
  type,
  className= 'auth'
}) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e:SyntheticEvent, type: AuthType) =>{
    e.preventDefault();

    // const url = type === AuthType.login ? 'api/Auth/login' : 'api/Auth/register' ;
    // const response = await fetch( url,
    //   type === AuthType.login ? {
    //     method: 'Post',
    //     headers: {'Content-Type' : 'application/json'},
    //     credentials: 'include',
    //
    //     body: JSON.stringify({
    //       name,
    //       password
    //     })
    //   } : {
    //     method: 'Post',
    //     headers: {'Content-Type' : 'application/json'},
    //     body: JSON.stringify({
    //       name,
    //       password
    //     })
    //   })
    // if (response){
    //   setRedirect(true);
    // }
  }
  const navigate = useNavigate();

  if (redirect){
    type === AuthType.login ? navigate( '/') : navigate( '/register');
  }
  return (

    <StyledAuthContainer className={className}>
      <StyledForm>
        <StyledTitle className="mb-3">
          {type === AuthType.login ? 'Login' : 'Registration'}
        </StyledTitle>

        <Form onSubmit={e => submit(e, type)}>
          <Form.Group className="mb-3" controlId="formBasicName" >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={e => setName(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>

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
