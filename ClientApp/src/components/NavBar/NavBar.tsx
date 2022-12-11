import React, {FC} from 'react';
import { StyledNavBar } from './style';
import {ContainerType} from "../Container/Container";

export interface NavBarInterface {
  // type: ContainerType;
  children: React.ReactNode;
}

const NavBar:FC<NavBarInterface> = ({
  children
}) => {
  return (
    <StyledNavBar>
      {children}
    </StyledNavBar>
  );
};

export default NavBar;
