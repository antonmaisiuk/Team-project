import React, {FC} from 'react';
import {StyledTextDiv, StyledValueDiv, StyledTransactionsItem} from "./style";
import {TileType} from "../../Tile/Tile";
import {CategoryItem} from "../../Transactions/Transactions";

type TransactionsItemType = {
  title: string;
  category: CategoryItem;
  value: number;
}


const TransactionsItem:FC<TransactionsItemType> = (
  {
    title,
    category,
    value,
  }
) => {
  console.log('CURR CAT: ', category)
  return (
    <StyledTransactionsItem>
      <StyledTextDiv>
        <h3 className={"transaction_title"}>{title}</h3>
        <p className={"transaction_category"}>Category: {category.name}</p>
      </StyledTextDiv>
      <StyledValueDiv>
        <p className={"transaction_value"}>$ {value}</p>
      </StyledValueDiv>

    </StyledTransactionsItem>
  );
};

export default TransactionsItem;
