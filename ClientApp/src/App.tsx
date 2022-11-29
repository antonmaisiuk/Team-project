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


export type TransactionItem ={
  title: string;
  category: string;
  value: number
}

export type CategoryItem ={
  name: string;
  image: string
}

const App = () => {


  const [transactionsList, setTransactions] = useState<TransactionItem[]>([
    // {title: 'First transaction', category: 'Eat', value: 766.2},
    // {title: 'Second transaction', category: 'Car', value: 1520.2},
    // {title: 'Third transaction', category: 'Shopping', value: 30},
    // {title: 'First transaction', category: 'Eat', value: 766.2},
    // {title: 'Second transaction', category: 'Car', value: 1520.2},
    // {title: 'Third transaction', category: 'Shopping', value: 30},
  ]);
  const [categoriesList, setCategories] = useState<CategoryItem[]>([
    // {name: 'First category', image: 'img'},
    // {name: 'Second category', image: 'img'},
    // {name: 'Third category', image: 'img'},
    // {name: 'Four category', image: 'img'},
  ]);
  const [sendingSum, setSendingSum] = useState<number>(0);

  async function sending_sum() {
    const response = await fetch('transactionsSum');

    if (response.ok){
      const data = await response.json();
      setSendingSum(data);
    } else {
      alert("HTTP Error: " + response.status)
    }
  }
  async function transactionsData() {
    const response = await fetch('transactions');

    if (response.ok){
      const data = await response.json();
      setTransactions(data);
    } else {
      alert("HTTP Error: " + response.status)
    }

  }
  async function categoriesData() {
    const response = await fetch('categories');

    if (response.ok){
      const data = await response.json();
      setCategories(data);
    } else {
      alert("HTTP Error: " + response.status)
    }
  }

  useEffect(() => {
    // fetch("GET").then((value) => console.log(value))
    transactionsData();
    sending_sum()
    categoriesData();
  }, []);
  // setTransactions(prevTransaction => [
  //   ...prevTransaction,
  //   {title: 'First transaction', category: 'Eat', value: 766.2}
  // ])

  return (



    <>
      <Container type={ContainerType.transactions}>
        <Layout>
          <Tile className={"spending_sum"} title={"Spending"} type={TileType.spending_sum} spend_sum={sendingSum}/>

          <Tile className={"transactions_list"} title={"Transactions"} type={TileType.transactions_list}
                transactionsList={transactionsList}/>
          <Tile className={"categories_list"} title={"Categories"} type={TileType.categories_list} categoriesList={categoriesList} />
        </Layout>
        <NavBar/>
      </Container>
    </>
  );


};

export default App;
