import React, {FC} from 'react';
import {StyledTextDiv, StyledValueDiv} from "./styled";
import {InvestmentItem, InvestmentType} from "../../App";
import { StyledInvestmentItem } from './styled';
// import {CategoryItem} from "../../Transactions/Transactions";

// type TransactionsItemType = {
//   title: string;
//   investmentId: number;
//   count: number;
// }


const InvestmentsItem:FC<InvestmentItem> = (
  {
    title,
    investmentId,
    count,
  }
) => {

  let investType = '';
  switch (investmentId){
    case InvestmentType.stocks:
      investType = 'Stocks';
      break;
    case InvestmentType.crypto:
      investType = 'Crypto';
      break;
    case InvestmentType.metals:
      investType = 'Metals';
      break;
    default:
      investType = 'No type';
      break;
  }

  return (
    <StyledInvestmentItem>
      <StyledTextDiv>
        <h3 className={"investment_title"}>{title}</h3>
        <p className={"investment_type"}>{investType}</p>
      </StyledTextDiv>
      <StyledValueDiv>
        <p className={"investment_count"}>$ {count}</p>
      </StyledValueDiv>
    </StyledInvestmentItem>
  );
};

export default InvestmentsItem;
