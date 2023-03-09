import styled from 'styled-components';
import {ContainerInterface, LayoutType} from "./Layout";


export const StyledLayout = styled.div<ContainerInterface>`
  //display: flex;
  //justify-content: space-between;
  //flex-wrap: wrap;
  //display: grid;
  ${props => props.type === LayoutType.investments &&`
    display:grid;
    grid-template-columns: 30% 30% 30%;
    grid-template-rows: 30% 60%;
    justify-content: space-between;
    gap: 3.33%;
  `}

  ${props => props.type === LayoutType.transactions &&`
    grid-template-columns: auto auto;
    column-count: 2;
    column-gap: 34px;
    //padding: 82px 51px 35px 51px;
    margin-bottom: 30px;
    height: calc(100% - 150px);
  `}
  
  height: 100%;
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
  //background: linear-gradient(116.82deg, #50489D 0%, #58AD60 100%);

`;
