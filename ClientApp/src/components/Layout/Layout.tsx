import React, {FC, HTMLAttributes} from 'react';
import {StyledLayout} from './style';

export enum LayoutType {
  transactions,
  investments,
  main_screen,
}

export interface ContainerInterface {
  type: LayoutType;
  children: React.ReactNode;
}

const Layout: FC<HTMLAttributes<HTMLDivElement> & ContainerInterface> = ({children, type}) => {
  return (
    <StyledLayout type={type}>
      {children}
    </StyledLayout>
  );
};

export default Layout;
