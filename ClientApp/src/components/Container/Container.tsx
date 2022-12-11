import React, {FC} from 'react';
import {StyledTileTitle} from "../Tile/style";
import {StyledContainer} from './style';

export enum ContainerType {
  transactions,
  login,
  register,
  home,
}

export interface ContainerInterface {
  type: ContainerType;
  children: React.ReactNode;
}

const Container: FC<ContainerInterface> = ({type, children}) => {
  return (
    <StyledContainer>
      {children}
    </StyledContainer>
  );
};

export default Container;
