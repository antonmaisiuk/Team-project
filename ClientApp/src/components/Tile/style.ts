import React from 'react';
import styled from 'styled-components';
import Tile from "./Tile";

export const StyledTile = styled.div`
  background-color: white;
  padding: 20px 30px;
  border-radius: 18px;

  width: 45%;
  max-width: 652px;
`;

export const StyledTileTitle = styled.h2`
  margin: 0;
  padding: 0;

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
  
`;

export const StyledLine = styled.span`
  width: 100%;
  height: 1px;
  background-color: #C7C7C7;
  
`;



