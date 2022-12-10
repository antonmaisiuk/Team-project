import React, {FC} from 'react';
import {StyledTextDiv, StyledValueDiv, StyledTransactionsItem} from "./style";
import {TileType} from "../../Tile/Tile";

type TransactionsItemType = {
  title: string;
  category: number;
  value: number;
}


const TransactionsItem:FC<TransactionsItemType> = (
  {
    title,
    category,
    value,
  }
) => {

  return (
    <StyledTransactionsItem>
      <StyledTextDiv>
        <h3 className={"transaction_title"}>{title}</h3>
        <p className={"transaction_category"}>Category id: {category}</p>
      </StyledTextDiv>
      <StyledValueDiv>
        <p className={"transaction_value"}>$ {value}</p>
      </StyledValueDiv>

    </StyledTransactionsItem>
  );
};

export default TransactionsItem;
