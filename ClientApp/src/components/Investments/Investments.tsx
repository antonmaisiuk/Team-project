import React, { Dispatch, FC, HTMLAttributes, SetStateAction, useEffect, useState } from 'react';
import Container, {ContainerType} from "../Container/Container";
import Layout, {LayoutType} from "../Layout/Layout";
import Tile, {TileType} from "../Tile/Tile";
import {InvestmentItem, InvestmentType} from "../../App";
import {Button} from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import {useNavigate} from "react-router-dom";

const Investments = () => {

  const [investStocksList, setInvestStocksList] = useState<InvestmentItem[]>([
    // {title:'Apple', investmentType: InvestmentType.stocks, count:5}
  ]);
  const [investCryptoList, setInvestCryptoList] = useState<InvestmentItem[]>([
    // {title:'Bitcoin', investmentType: InvestmentType.crypto, count:2}
  ]);
  const [investMetalsList, setInvestMetalsList] = useState<InvestmentItem[]>([
    // {title:'Gold', investmentType: InvestmentType.metals, count:1}
  ]);

  const [stocksSum, setStocksSum] = useState<number>(0);
  const [cryptoSum, setCryptoSum] = useState<number>(0);
  const [metalsSum, setMetalsSum] = useState<number>(0);


  async function getInvestingSums() {
    // const stocksResponse = await fetch('api/InvestmentStocks/stocksSum');
    // if (stocksResponse.ok){
    //   const data = await stocksResponse.json();
    //   setStocksSum(data);
    // } else {
    //   alert("HTTP Error: " + stocksResponse.status)
    // }

    const cryptoResponse = await fetch('api/InvestmentCryptoCurrency/cryptocurrenciesSum');
    if (cryptoResponse.ok){
      const data = await cryptoResponse.json();
      setCryptoSum(data);
    } else {
      alert("HTTP Error: " + cryptoResponse.status)
    }

    const metalsResponse = await fetch('api/InvestmentPreciousMetal/metalsSum');
    if (metalsResponse.ok){
      const data = await metalsResponse.json();
      setMetalsSum(data);
    } else {
      alert("HTTP Error: " + metalsResponse.status)
    }
  }

  async function getInvestingData() {
    // const stocksResponse = await fetch('api/InvestmentStocks/stocks');
    // if (stocksResponse.ok){
    //   const data = await stocksResponse.json();
    //
    //   setInvestStocksList(data);
    // } else {
    //   alert("HTTP Error: " + stocksResponse.status)
    // }

    const cryptoResponse = await fetch('api/InvestmentCryptoCurrency/crypto');
    if (cryptoResponse.ok){
      const data = await cryptoResponse.json();
      setInvestCryptoList(data);
    } else {
      alert("HTTP Error: " + cryptoResponse.status)
    }

    const metalsResponse = await fetch('api/InvestmentPreciousMetal/metals');
    if (metalsResponse.ok){
      const data = await metalsResponse.json();
      setInvestMetalsList(data);
    } else {
      alert("HTTP Error: " + metalsResponse.status)
    }
  }


  const navigate = useNavigate();

  useEffect(() => {
    getInvestingData();
    getInvestingSums();
    // categoriesData();
  }, []);

    const logout = async () => {

        await fetch('api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        // setUserName('');

        navigate('/login');
    }

  return (
    <>
      <Container type={ContainerType.transactions}>
        <Layout type={LayoutType.investments}>
          <Tile
            className={"stocks_invest"}
            title={"Stocks"}
            type={TileType.investing_sum}
            investingSum={stocksSum}
          />
          <Tile
            className={"crypto_invest"}
            title={"Crypto"}
            type={TileType.investing_sum}
            investingSum={cryptoSum}
          />
          <Tile
            className={"metals_invest"}
            title={"Metals"}
            type={TileType.investing_sum}
            investingSum={metalsSum}
          />
          <Tile
            className={"stocks_invest_list"}
            title={"Stocks balance"}
            investType={InvestmentType.stocks}
            type={TileType.investing_list}
            investingList={investStocksList}
          />
          <Tile
            className={"crypto_invest_list"}
            title={"Crypto balance"}
            type={TileType.investing_list}
            investType={InvestmentType.crypto}
            investingList={investCryptoList}
          />
          <Tile
            className={"metals_invest_list"}
            title={"Metals balance"}
            investType={InvestmentType.metals}
            type={TileType.investing_list}
            investingList={investMetalsList}
          />
        </Layout>
        <NavBar>
                  <Button onClick={() => navigate('/')}>Home</Button>
                  <Button onClick={() => navigate('/transactions')} >Transactions</Button>
                  <Button onClick={() => logout()} >Logout</Button>
        </NavBar>
      </Container>
    </>
  );
};

export default Investments;

