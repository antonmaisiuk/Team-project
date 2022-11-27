import React, {FC, HTMLAttributes} from 'react';
import {StyledLayout} from './style';

// export enum ContainerType {
//   transactions,
//   main_screen,
// }

// export interface ContainerInterface {
//   type: ContainerType;
//   children: React.ReactNode;
// }

const Layout: FC<HTMLAttributes<HTMLDivElement>> = ({children}) => {
  return (
    <StyledLayout>
      {children}
    </StyledLayout>
  );
};

export default Layout;
