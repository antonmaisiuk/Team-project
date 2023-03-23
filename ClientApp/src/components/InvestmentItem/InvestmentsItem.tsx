import React, {FC, useEffect, useState} from 'react';
import {StyledTextDiv, StyledValueDiv} from "./styled";
import {InvestmentItem, InvestmentType} from "../../App";
import { StyledInvestmentItem } from './styled';
// import {CategoryItem} from "../../Transactions/Transactions";

type InvestingType = {
  id: number,
  name: string,
  image: string,
}


const InvestmentsItem:FC<InvestmentItem> = (
  {
    typeId,
    amount,
    investType,
  }
) => {
  const [investingType, setInvestingType] = useState<InvestingType>({
    id: 0,
    name: 'Inne',
    image: ''
  });

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

    // const typeResponse = await fetch(`api/${controller}/types`);
    // if (typeResponse.ok) {
    //   const data = await typeResponse.json();
    //   console.log('### data: ', data);
    //   // setInvestingTypes(data);
    //   console.log('### typeId: ', typeId);
    //   const currentType = data.filter((item: { id: number; }) => item.id === typeId);
    //   console.log('### currentType: ', currentType);
    //   setInvestingType(currentType[0]);
    // } else {
    //   alert("HTTP Error: " + typeResponse.status)
    // }
  }


  useEffect(() => {
    getInvestingTypes();
  }, []);
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
        <h3 className={"investment_title"}>{investingType.name}</h3>
        <p className={"investment_type"}>{investType}</p>
      </StyledTextDiv>
      <StyledValueDiv>
        <p className={"investment_count"}>{amount} psc</p>
      </StyledValueDiv>
    </StyledInvestmentItem>
  );
};

export default InvestmentsItem;
