import styled from 'styled-components';
import {TileInterface, TileType} from "./Tile";

export const StyledTile = styled.div<TileInterface>`
  //display: grid;
  //grid-template-rows: 1fr auto;
  
  ${props => props.type === TileType.spending_sum && `
    margin-bottom: 10px;
    grid-row: 1 / 1 ;
  `}
  ${props => props.type === TileType.transactions_list && `
    // margin-bottom: 10px;
    grid-row: 1 / 4 ;
  `}
  
  break-inside: avoid;

  background-color: white;
  padding: 20px 30px;
  
  border-radius: 18px;

  

  max-width: 652px;
`;

export const StyledTileTitle = styled.h2`
  
  

  font-family: "'Inter', sans-serif", sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 35px;
  line-height: 42px;
  color: #000;
  padding-bottom: 8px;
  border-bottom: 1px solid #C7C7C7;
`;

export const StyledSendingSum = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  max-height: 223px;
  

  h2 {
    margin: 30px 0 15px 0;
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 50px;
    line-height: 61px;
  }
`;
export const StyledTransactionsList = styled.div`
  display: flex;
  flex-direction: column;
  
  max-height: 300px;
  overflow-y: scroll;
  
`;

export const StyledLine = styled.span`
  width: 100%;
  height: 1px;
  background-color: #C7C7C7;
  
`;



