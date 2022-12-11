import React, {SyntheticEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, Form} from "react-bootstrap";
import {StyledForm, StyledRegisterContainer, StyledTitle } from './style';
import {Navigate, redirect, useNavigate} from "react-router-dom";

const Register = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [redirect, setRedirect] = useState(false);

  const submit = async (e:SyntheticEvent) =>{
    e.preventDefault();

    // const response = await fetch('api/register', {
    //   method: 'Post',
    //   headers: {'Content-Type' : 'application/json'},
    //   body: JSON.stringify({
    //     name,
    //     password
    //   })
    // })
    setRedirect(true);

    // const content = await response.json();
    //
    // console.log(response);
  }
  const navigate = useNavigate();

  if (redirect){
    navigate( '/login');
  }

  return (
    // {redirect && (
    //   navigate( '/login')
    // )}


  <StyledRegisterContainer>
      <StyledForm>
        <StyledTitle className="mb-3">Register</StyledTitle>
        <Form onSubmit={e => submit(e)}>
            <Form.Group className="mb-3" controlId="formBasicName" >
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" placeholder="Enter name" onChange={e => setName(e.target.value)} />
            {/*<Form.Text className="text-muted">*/}
            {/*  We'll never share your email with anyone else.*/}
            {/*</Form.Text>*/}
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          </Form.Group>
          {/*<Form.Group className="mb-3" controlId="formBasicCheckbox">*/}
          {/*  <Form.Check type="checkbox" label="Check me out" />*/}
          {/*</Form.Group>*/}
          <Button variant="primary" type="submit"> Register </Button>
        </Form>
      </StyledForm>
    </StyledRegisterContainer>


  );
};

export default Register;
