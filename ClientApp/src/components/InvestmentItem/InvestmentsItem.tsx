import React, {Dispatch, FC, SetStateAction, useEffect, useState} from 'react';
import {StyledInvestmentItem, StyledTextDiv, StyledValueDiv} from "./styled";
import {InvestmentItem, InvestmentType} from "../../App";
import PopUp, {PopUpType} from "../PopUp/PopUp";
// import yahooFinance from 'yahoo-finance2';
// import {CategoryItem} from "../../Transactions/Transactions";

type InvestingType = {
  id: number,
  name: string,
  index: string,
  image: string,
}

export interface InvestItemDetailsInterface{
  invest: InvestmentItem,
  setInvestments: Dispatch<SetStateAction<InvestmentItem[]>>,
  setInvestingSum: Dispatch<SetStateAction<number>>,
}

type InvestmentsItemInterface = InvestItemDetailsInterface & InvestmentItem;


const InvestmentsItem:FC<InvestmentsItemInterface> = (
  {
    // active,
    // setActive,
    // typeId,
    // type,
    amount,
    investType,
    pricePerPiece,
    investInfo,
    invest,
    priceTotal,
    setInvestments = ()=>{},
    setInvestingSum = () => {},
    // investingList= [],
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
  const [isDetailsModalActive, setDetailsModalActive] = useState(false);


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

    console.log('### Controller: ', controller);
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


  // function renderDetails() {
  //   return (
  //
  //   )
  // }

  return (
    <><StyledInvestmentItem onClick={() => {
      setDetailsModalActive(true);
    }}>
      <StyledTextDiv>
        <h3 className={"investment_title"}>{investInfo.name}</h3>
        {/*<p className={"investment_type"}>{investType}</p>*/}
        <p className={"investment_count"}>{amount} {investType === InvestmentType.metals ? 'oz' : 'pcs'}</p>
        <p className={"investment_value"}>{pricePerPiece} {currency}</p>
      </StyledTextDiv>
      <StyledValueDiv>
        <p className={"investment_value"}>{Number(priceTotal).toFixed(2)} {currency}</p>

      </StyledValueDiv>

    </StyledInvestmentItem>
      <PopUp
      type={PopUpType.investDetails}
      active={isDetailsModalActive}
      setActive={setDetailsModalActive}
      // investingList={investingList}
      setInvestments={setInvestments}
      setInvestingSum={setInvestingSum}
      invest={invest}/></>
  );
};

export default InvestmentsItem;
