import React, {Dispatch, FC, HTMLAttributes, SetStateAction, useEffect, useState} from 'react';
import Container, {ContainerType} from "../Container/Container";
import NavBar from "../NavBar/NavBar";
import Layout from "../Layout/Layout";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";

export interface HomeInterface {
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>
}

const Home:FC<HomeInterface & HTMLAttributes<HTMLDivElement>> = ({
  userName,
  setUserName = () => {}
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!userName) navigate('/login')
  })


  const logout = async () =>{

    const response = await fetch('api/logout',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
    setUserName('');

    navigate('/login');
  }

  return (
    <Container type={ContainerType.home}>
      <Layout>
        {userName ? 'Hi '+ userName : 'You are not logged('}
      </Layout>
      <NavBar>
        <Button onClick={() => navigate('/transactions')} >Transactions</Button>
        <Button onClick={() => navigate('/login')} >Login</Button>
        <Button onClick={() => logout()} >Logout</Button>
      </NavBar>
    </Container>
  );
};

export default Home;
