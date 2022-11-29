import React, {useEffect, useState} from 'react';
import { Route } from 'react-router';
import Tile, {TileType} from "./components/Tile/Tile";
import Layout from "./components/Layout/Layout";
import {Home} from "./components/Home";
import {Counter} from "./components/Counter";
import NavBar from "./components/NavBar/NavBar";
import Container, {ContainerType} from "./components/Container/Container";

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
    {title: 'First transaction', category: 'Eat', value: 766.2},
    {title: 'Second transaction', category: 'Car', value: 1520.2},
    {title: 'Third transaction', category: 'Shopping', value: 30},
    {title: 'First transaction', category: 'Eat', value: 766.2},
    {title: 'Second transaction', category: 'Car', value: 1520.2},
    {title: 'Third transaction', category: 'Shopping', value: 30},
  ]);

  async function transactionsData() {
    const response = await fetch('api/transaction');
    const data = await response.json();
    setTransactions(data);
  }

  useEffect(() => {
    // fetch("GET").then((value) => console.log(value))
    transactionsData();
  }, []);
  // setTransactions(prevTransaction => [
  //   ...prevTransaction,
  //   {title: 'First transaction', category: 'Eat', value: 766.2}
  // ])

  return (



    <>
      <Container type={ContainerType.transactions}>
        <Layout>
          <Tile className={"spending_sum"} title={"Spending"} type={TileType.spending_sum} spend_sum={2043.31}/>

          <Tile className={"transactions_list"} title={"Transactions"} type={TileType.transactions_list}
                transactionsList={transactionsList}/>
          <Tile className={"categories_list"} title={"Categories"} type={TileType.categories_list}/>
        </Layout>
        <NavBar/>
      </Container>
    </>
  );


};

export default App;
