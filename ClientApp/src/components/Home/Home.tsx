import React, {Dispatch, FC, HTMLAttributes, SetStateAction, useState} from 'react';
import Container, {ContainerType} from "../Container/Container";
import NavBar from "../NavBar/NavBar";
import Layout, {LayoutType} from "../Layout/Layout";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import logoIcon from '../../assets/Icons/LogoIcon/pig.png';
import Tile, {TileType} from "../Tile/Tile";
import Cookies from 'js-cookie';
import {PopUpType} from "../PopUp/PopUp";
import {StyledLogoWithText} from "./style";

export interface HomeInterface {
  setIsLogged: Dispatch<SetStateAction<boolean>>
  isLogged: boolean,
}

const Home:FC<HomeInterface & HTMLAttributes<HTMLDivElement>> = ({
  setIsLogged,
  isLogged
}) => {
  const navigate = useNavigate();
  console.log('isLogged: ', isLogged);
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
    setIsLogged(false);
    console.log('### logout',);
    // setUserName('');

    navigate('/');
  }



  return (

    <Container type={ContainerType.home}>
      <Layout type={LayoutType.main_screen} >
        <Tile
          type={TileType.main_sreen}
        />
      </Layout>
      <NavBar>
        <StyledLogoWithText className={'main_screen-logoWithName'}>
          <img src={logoIcon} alt={'Logo'} width={'96px'}/>
          <h2>Elaborate™</h2>
        </StyledLogoWithText>

        <div>
          since 2023
        </div>
        {/*<div>*/}
        {/*  <Button onClick={() => navigate('/transactions')} >Transactions</Button>*/}
        {/*  <Button onClick={() => navigate('/investments')} >Investments</Button>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*  {isLogged ?*/}
        {/*    <Button onClick={() => logout()} >Logout</Button> :*/}
        {/*    <Button onClick={() => navigate('/login')} >Login</Button>*/}
        {/*  }*/}
        {/*</div>*/}
      </NavBar>
    </Container>
  );
};

export default Home;
