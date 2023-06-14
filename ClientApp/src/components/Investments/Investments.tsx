import React, {useEffect, useState} from 'react';
import Container, {ContainerType} from "../Container/Container";
import Layout, {LayoutType} from "../Layout/Layout";
import Tile, {TileType} from "../Tile/Tile";
import {InvestmentItem, InvestmentType} from "../../App";
import {Button} from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import {useNavigate} from "react-router-dom";
import {InvestingTypeInterface} from "../PopUp/PopUp";
import logoIcon from "../../assets/Icons/LogoIcon/pig.png";

// export interface InvestingTypeInterface{
//   id: number,
//   name: string,
// }

const Investments = () => {


  const [investStocksList, setInvestStocksList] = useState<InvestmentItem[]>([
    // {
    //   investInfo:{
    //     id: 2,
    //     image: "https://static.vecteezy.com/system/resources/thumbnails/008/505/801/small_2x/bitcoin-logo-color-illustration-png.png",
    //     name: "Apple"
    //   },
    //   amount: 20,
    //   investType: InvestmentType.stocks,
    //   pricePerPiece: 175.52,
    //   priceTotal: 3510.4,
    //   typeId: 2,
    // }
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

  const [investingTypes, setInvestingTypes] = useState<InvestingTypeInterface[]>([]);


  async function getInvestingSums() {
    const stocksResponse = await fetch('api/InvestmentStock/stocksSum');
    if (stocksResponse.ok){
      const data = await stocksResponse.json();
      setStocksSum(data);
    } else {
      alert("HTTP Error: " + stocksResponse.status)
    }

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

    const stockController = 'InvestmentStock';
    const stocksResponse = await fetch(`api/${stockController}/stocks`);
    if (stocksResponse.ok){
      const data = await stocksResponse.json();

      let sum = 0;
      const stocks = await Promise.all(data.map(async (item) => {
        const typeResponse = await fetch(`api/${stockController}/types`);
        if (typeResponse.ok) {
          const data = await typeResponse.json();
          const currentType = data.filter((typeItem: { id: number }) => typeItem.id === item.typeId);

          const url = `https://realstonks.p.rapidapi.com/${currentType[0].index}`;
          const options = {
            method: 'GET',
            headers: {
              'content-type': 'application/octet-stream',
              'X-RapidAPI-Key': 'b7f693bd5bmsh15d4fb4def8fb20p1cd336jsn6a66c0245a0c',
              'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
            }
          };
          try {
            const response = await fetch(url, options);
            const stockData = await response.json();

            sum += Number((item.amount * stockData.price).toFixed(2));
            return {
              typeId: item.typeId,
              investInfo: currentType[0],
              amount: item.amount,
              pricePerPiece: stockData.price.toFixed(2) || 0,
              priceTotal: Number((item.amount * stockData.price).toFixed(2)),
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          alert("HTTP Error: " + typeResponse.status)
        }
      }))
      // console.log('### stocks: ', stocks);
      setInvestStocksList(stocks);
      setStocksSum(sum);
    } else {
      alert("HTTP Error: " + stocksResponse.status)
    }

    const cryptoController = 'InvestmentCryptoCurrency';
    const cryptoResponse = await fetch(`api/${cryptoController}/crypto`);
    if (cryptoResponse.ok){
      const data = await cryptoResponse.json();

      let sum = 0;
      const crypto = await Promise.all(data.map(async (item) => {
        const typeResponse = await fetch(`api/${cryptoController}/types`);
        if (typeResponse.ok) {
          const data = await typeResponse.json();
          const currentType = data.filter((typeItem: { id: number }) => typeItem.id === item.typeId);

          try {
            const response = await fetch(`https://api.coinpaprika.com/v1/tickers/${currentType[0].index}`);
            const cryptoData = await response.json();

            sum += Number((item.amount * cryptoData.quotes.USD.price).toFixed(2));
            return {
              typeId: item.typeId,
              investInfo: currentType[0],
              amount: item.amount,
              pricePerPiece: cryptoData.quotes.USD.price.toFixed(2) || 0,
              priceTotal: Number((item.amount * cryptoData.quotes.USD.price).toFixed(2)),
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          alert("HTTP Error: " + typeResponse.status)
        }
      }))
      setInvestCryptoList(crypto);
      setCryptoSum(sum);
    } else {
      alert("HTTP Error: " + cryptoResponse.status)
    }

    const metalsController = 'InvestmentPreciousMetal';
    const metalsResponse = await fetch(`api/${metalsController}/metals`);
    if (metalsResponse.ok){
      const data = await metalsResponse.json();

      // console.log('### Metal Data: ', data);
      let sum = 0;
      const metals = await Promise.all(data.map(async (item) => {
        const typeResponse = await fetch(`api/${metalsController}/types`);
        if (typeResponse.ok) {
          const data = await typeResponse.json();
          // console.log('### Metal types: ', data);
          const currentType = data.filter((typeItem: { id: number }) => typeItem.id === item.typeId);

          try {
            // console.log('### Metal type: ', currentType[0].index);
            const response = await fetch(`https://api.currencybeacon.com/v1/latest?api_key=407ce20e80bde2fd714142bc8b5047bb&base=${currentType[0].index}&symbols=USD`);
            const metalsData = await response.json();

            sum += Number((item.amount * metalsData.response.rates.USD).toFixed(2));
            return {
              typeId: item.typeId,
              investInfo: currentType[0],
              amount: item.amount,
              pricePerPiece: metalsData.response.rates.USD.toFixed(2) || 0,
              priceTotal: Number((item.amount * metalsData.response.rates.USD).toFixed(2)),
            }
          } catch (error) {
            console.error(error);
          }
        } else {
          alert("HTTP Error: " + typeResponse.status)
        }
      }))
      setInvestMetalsList(metals);
      // console.log('### Metals: ', investMetalsList);
      setMetalsSum(sum);
      // console.log('### Metals sum: ', metalsSum);
    } else {
      alert("HTTP Error: " + metalsResponse.status)
    }
  }


  const navigate = useNavigate();

  useEffect(() => {
    getInvestingData();
    // getInvestingSums();
    // categoriesData();
  }, []);

    const logout = async () => {

        await fetch('api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
        })
        // setUserName('');

        navigate('/');
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
            setInvestingSum={setStocksSum}
            setInvesting={setInvestStocksList}
            type={TileType.investing_list}
            investingList={investStocksList}
          />
          <Tile
            className={"crypto_invest_list"}
            title={"Crypto balance"}
            type={TileType.investing_list}
            setInvestingSum={setCryptoSum}
            setInvesting={setInvestCryptoList}
            investType={InvestmentType.crypto}
            investingList={investCryptoList}
          />
          <Tile
            className={"metals_invest_list"}
            title={"Metals balance"}
            investType={InvestmentType.metals}
            setInvestingSum={setMetalsSum}
            setInvesting={setInvestMetalsList}
            type={TileType.investing_list}
            investingList={investMetalsList}
          />
        </Layout>
        <NavBar>
          <div>
            <img src={logoIcon} alt={'Logo'} width={'96px'}/>
          </div>
          <div>
            <Button onClick={() => navigate('/')}>Home</Button>
            <Button onClick={() => navigate('/transactions')} >Transactions</Button>
          </div>
          <div>
            <Button onClick={() => logout()} >Logout</Button>
          </div>

        </NavBar>
      </Container>
    </>
  );
};

export default Investments;

