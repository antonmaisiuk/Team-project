import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {StyledTextDiv, StyledValueDiv} from "./styled";
import {InvestmentItem, InvestmentType} from "../../App";
import { StyledInvestmentItem } from './styled';
// import yahooFinance from 'yahoo-finance2';
// import {CategoryItem} from "../../Transactions/Transactions";

type InvestingType = {
  id: number,
  name: string,
  index: string,
  image: string,
}


const InvestmentsItem:FC<InvestmentItem> = (
  {
    typeId,
    amount,
    investType,
    pricePerPiece,
    investInfo,
    priceTotal,
  }
) => {
  const [investingType, setInvestingType] = useState<InvestingType>({
    id: 0,
    name: 'Inne',
    index: 'AAPL',
    image: '',
  });
  const [currentPrice, setCurrentPrice] = useState(0);
  const [currency, setCurrency] = useState('USD');

  async function getInvestingTypes() {
    let controller;
    switch (investType) {
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
    //   const currentType = data.filter((item: { id: number }) => item.id === typeId);
    //   setInvestingType(currentType[0]);
    //
    //   // LBDPC773MDRPJ3YB
    //   const response = await fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${investingType.index}&apikey=LBDPC773MDRPJ3YB`);
    //   const stockData = await response.json();
    //   setCurrentPrice(Number(stockData['Global Quote']['05. price']));
    // } else {
    //   alert("HTTP Error: " + typeResponse.status)
    // }

  }


  useEffect(() => {
    // getInvestingTypes();
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
        <h3 className={"investment_title"}>{investInfo.name}</h3>
        {/*<p className={"investment_type"}>{investType}</p>*/}
        <p className={"investment_count"}>{amount} psc</p>
        <p className={"investment_value"}>{pricePerPiece} {currency}</p>
      </StyledTextDiv>
      <StyledValueDiv>
        <p className={"investment_value"}>{Number(priceTotal).toFixed(2)} {currency}</p>

      </StyledValueDiv>
    </StyledInvestmentItem>
  );
};

export default InvestmentsItem;
