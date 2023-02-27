import styled from 'styled-components';
import {TileBaseInterface, TileType} from "./Tile";

export const StyledTile = styled.div<TileBaseInterface>`
  //display: grid;
  //grid-template-rows: 1fr auto;
  
  ${props => props.type === TileType.spending_sum && `
    margin-bottom: 34px;
    // max-height: 30%;
    grid-row: 1 / 1 ;
  `}
  ${props => props.type === TileType.categories_list && `
    // margin-bottom: 10px;
    max-height: 68%;
    grid-row: 1 / 1 ;
  `}
  ${props => props.type === TileType.transactions_list && `
    // margin-bottom: 10px;
    height: auto;
    grid-row: 1 / 4 ;
  `}
  
  break-inside: avoid;

  background-color: white;
  padding: 20px 30px;
  
  border-radius: 18px;

  

  //max-width: 652px;
`;

export const StyledInvestTile = styled.div<TileBaseInterface>`
`;

export const StyledTileTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  h2{
    font-family: "'Inter', sans-serif", sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 35px;
    line-height: 42px;
    color: #000;
  }  
  padding-bottom: 8px;
  border-bottom: 1px solid #C7C7C7;
`;

export const StyledInvestingSum = styled.div`
  
`;

export const StyledSum = styled.div`
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
export const StyledList = styled.div<TileBaseInterface>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  //padding-right: 15px;
  ${props => props.type === TileType.transactions_list && `
    max-height: 300px;
  `}
  ${props => props.type === TileType.categories_list && `
    max-height: 100px;
  `}
  
  overflow-y: scroll;
  margin-top: 20px;
`;

export const StyledLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 1px;
  background-color: #C7C7C7;
  
`;





