import React, {FC} from 'react';
import {StyledTextDiv, StyledValueDiv} from "./styled";
import {InvestmentItem, InvestmentType} from "../../App";
import { StyledInvestmentItem } from './styled';
// import {CategoryItem} from "../../Transactions/Transactions";

// type TransactionsItemType = {
//   title: string;
//   investmentType: number;
//   count: number;
// }


const InvestmentsItem:FC<InvestmentItem> = (
  {
    typeId,
    amount,
    investType,
  }
) => {

  async function getInvestingTypes() {
    let controller;
    switch (investType){
      case InvestmentType.stocks:
        controller = 'InvestmentStock';
        break;
      case InvestmentType.crypto:
        controller = 'InvestmentCryptoCurrency';
        break;
      case InvestmentType.metals:
        controller = 'InvestmentPreciousMetal';
        break;
    }

    const typeResponse = await fetch(`api/${controller}/types`);
    if (typeResponse.ok) {
      const data = await typeResponse.json();
      console.log('### data: ', data);
      // setInvestingTypes(data);
    } else {
      alert("HTTP Error: " + typeResponse.status)
    }
  }

  // let investType = '';
  // switch (typeStockId){
  //   case InvestmentType.stocks:
  //     investType = 'Stocks';
  //     break;
  //   case InvestmentType.crypto:
  //     investType = 'Crypto';
  //     break;
  //   case InvestmentType.metals:
  //     investType = 'Metals';
  //     break;
  //   default:
  //     investType = 'No type';
  //     break;
  // }

  return (
    <StyledInvestmentItem>
      <StyledTextDiv>
        <h3 className={"investment_title"}>{typeId}</h3>
        <p className={"investment_type"}>{investType}</p>
      </StyledTextDiv>
      <StyledValueDiv>
        <p className={"investment_count"}>$ {amount}</p>
      </StyledValueDiv>
    </StyledInvestmentItem>
  );
};

export default InvestmentsItem;
