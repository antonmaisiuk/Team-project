import React, {useEffect, useState} from 'react';
import { Route } from 'react-router';
import Tile, {TileType} from "./components/Tile/Tile";
import Container, {ContainerType} from "./components/Container/Container";
import {Home} from "./components/Home";
import {Counter} from "./components/Counter";

// const transactionsList = [
//   {title: 'First transaction', category: 'Eat', value: 766.2},
//   {title: 'Second transaction', category: 'Car', value: 1520.2},
//   {title: 'Third transaction', category: 'Shopping', value: 30},
// ];


type TransactionItem ={
  title: string;
  category: string;
  value: number
}

const App = () => {


  const [transactionsList, setTransactions] = useState<TransactionItem[]>([
    //{title: 'First transaction', category: 'Eat', value: 766.2},
    //{title: 'Second transaction', category: 'Car', value: 1520.2},
    //{title: 'Third transaction', category: 'Shopping', value: 30},
  ]);

  async function populateWeatherData() {
    const response = await fetch('api/transaction');
    const data = await response.json();
    console.log(data);
    setTransactions(data);
  }

  useEffect(() => {
    // fetch("GET").then((value) => console.log(value))
    populateWeatherData();
  }, []);
  // setTransactions(prevTransaction => [
  //   ...prevTransaction,
  //   {title: 'First transaction', category: 'Eat', value: 766.2}
  // ])

  return (
    <Container type={ContainerType.transactions}>

        <Tile title={"Spending"} type={TileType.spending_sum} spend_sum={2043.31}/>
        <Tile title={"Transactions"} type={TileType.transactions_list} transactionsList={transactionsList}/>

      {/*<Route path='/counter' component={Counter} />*/}
      {/*<Route path='/fetch-data' component={FetchData} />*/}

      {/*<StyledTile className={"tile_spending"} title={"Spending"}>*/}
      {/*  <StyledTileTitle title={"sdsa"}/>*/}
      {/*</StyledTile>*/}
    </Container>
  );


};

export default App;
