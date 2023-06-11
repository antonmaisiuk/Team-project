import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import {StyledTextDiv, StyledValueDiv, StyledTransactionsItem} from "./style";
import {TileType} from "../../Tile/Tile";
import {CategoryItem, TransactionItem} from "../../Transactions/Transactions";
import PopUp, {PopUpType} from "../../PopUp/PopUp";
import {InvestmentItem} from "../../../App";

type TransactionsItemType = {
  transaction: TransactionItem,
  // title: string;
  // category: CategoryItem;
  // value: number;
}

export interface TransItemDetailsInterface{
  // transaction: TransactionItem,
  setTransactions: Dispatch<SetStateAction<TransactionItem[]>>,
  setSpendingSum: Dispatch<SetStateAction<number>>,
  categoriesList: CategoryItem[],
}

type TransItemInterface = TransItemDetailsInterface & TransactionsItemType;


const TransactionsItem:FC<TransItemInterface> = (
  {
    transaction,
    setTransactions= ()=>{},
    setSpendingSum = ()=>{},
    // title,
    categoriesList,
    // value,
  }
) => {

  const [isDetailsModalActive, setDetailsModalActive] = useState(false);


  return (
    <>
      <StyledTransactionsItem onClick={() => {
        setDetailsModalActive(true);
      }}>
        {/*<div className={'transaction_img'}>*/}
        {/*  <img  src={(categoriesList.find(cat => cat.id === transaction.transCategoryId) || {name: 'Inne'}).image} alt={'logo'}/>*/}
        {/*</div>*/}
        <StyledTextDiv>
          <h3 className={"transaction_title"}>{transaction.title}</h3>
          <p className={"transaction_category"}>Category: {(categoriesList.find(cat => cat.id === transaction.transCategoryId) || {name: 'Other'}).name}</p>
        </StyledTextDiv>
        <StyledValueDiv>
          <p className={"transaction_value"}>$ {transaction.value}</p>
        </StyledValueDiv>
      </StyledTransactionsItem>
      <PopUp
        type={PopUpType.transDetails}
        active={isDetailsModalActive}
        setActive={setDetailsModalActive}
        setTransactions={setTransactions}
        setSpendingSum={setSpendingSum}
        transaction={transaction}
        categoriesList={categoriesList}
      />
    </>
  );
};

export default TransactionsItem;
