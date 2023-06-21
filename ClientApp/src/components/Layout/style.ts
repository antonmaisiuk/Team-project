import styled from 'styled-components';
import {ContainerInterface, LayoutType} from "./Layout";


export const StyledLayout = styled.div<ContainerInterface>`
  //display: flex;
  //justify-content: space-between;
  //flex-wrap: wrap;
  //display: grid;
  ${props => props.type === LayoutType.investments &&`
    display:grid;
    
    grid-template:
    [main-left] "stocksSum cryptoSum metalsSum3" 200px [main-right]
    [footer-left] "stocksList cryptoList metalsList" [footer-right]
    / 30% 30% 30%;
    
    // grid-template-columns: 30% 30% 30%;
    // grid-template-rows: 30% 60%;
    justify-content: space-between;
    gap: 3.33%;
    height: 80%;
  `}

  ${props => props.type === LayoutType.transactions &&`
    display:grid;
    grid-template:
    [main-left] "sum  trans" 200px [main-right]
    [footer-left] "cat  trans" [footer-right]
    / 40% 56%;
    justify-content: space-between;
    gap: 3.33%;
    height: 80%;
  `}
  
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap');
  //background: linear-gradient(116.82deg, #50489D 0%, #58AD60 100%);

`;
