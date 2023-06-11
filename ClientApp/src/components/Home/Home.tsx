import React, {Dispatch, FC, HTMLAttributes, SetStateAction, useEffect, useState} from 'react';
import Container, {ContainerType} from "../Container/Container";
import NavBar from "../NavBar/NavBar";
import Layout from "../Layout/Layout";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import LogoIcon from '../../assets/Icons/LogoIcon/LogoIcon';

// export interface HomeInterface {
//   userName: string;
//   setUserName: Dispatch<SetStateAction<string>>
// }

const Home:FC<HTMLAttributes<HTMLDivElement>> = ({
}) => {
  const navigate = useNavigate();

  // const [userName, setUserName] = useState('');
  // const [userId, setUserId] = useState(0);
  //
  // useEffect(() => {
  //   (
  //     async () => {
  //       const response = await fetch('api/user',{
  //         headers: {'Content-Type': 'application/json'},
  //         credentials: 'include',
  //       })
  //       if (response.ok){
  //         const content = await response.json();
  //         setUserName(content.name);
  //         setUserId(content.id);
  //       } else {
  //         navigate('/login');
  //       }
  //
  //     }
  //   )();
  // });


  const logout = async () =>{

    const response = await fetch('api/logout',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      credentials: 'include',
    })
    // setUserName('');

    navigate('/login');
  }

  return (
    <Container type={ContainerType.home}>
      {/*<Layout > */}
      {/*  /!*{userName ? 'Hi '+ userName : 'You are not logged('}*!/*/}
      {/*</Layout>*/}
      <NavBar>
        <div>
          <h1>Elaborate</h1>
        </div>
        <div>
          <Button onClick={() => navigate('/transactions')} >Transactions</Button>
          <Button onClick={() => navigate('/investments')} >Investments</Button>
        </div>
        <div>
          <Button onClick={() => navigate('/login')} >Login</Button>
          <Button onClick={() => logout()} >Logout</Button>
        </div>
      </NavBar>
    </Container>
  );
};

export default Home;
