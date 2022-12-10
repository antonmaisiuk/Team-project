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
  transCategoryId: number;
  value: number
}

export type CategoryItem ={
  id: number;
  name: string;
  image: string
}

const App = () => {


  const [transactionsList, setTransactions] = useState<TransactionItem[]>([
    // {title: 'First transaction', category: 'Eat', value: 766.2},
    // {title: 'Second transaction', category: 'Car', value: 1520.2},
    // {title: 'Third transaction', category: 'Bills', value: 30},
    // {title: 'First transaction', category: 'Eat', value: 766.2},
    // {title: 'Second transaction', category: 'Car', value: 1520.2},
    // {title: 'Third transaction', category: 'Bills', value: 30},
    // {title: 'First transaction', category: 'Eat', value: 766.2},
    // {title: 'Second transaction', category: 'Car', value: 1520.2},
    // {title: 'Third transaction', category: 'Shopping', value: 30},
    // {title: 'First transaction', category: 'Eat', value: 766.2},
    // {title: 'Second transaction', category: 'Car', value: 1520.2},
    // {title: 'Third transaction', category: 'Shopping', value: 30},
  ]);
  const [categoriesList, setCategories] = useState<CategoryItem[]>([
    // {name: 'Eat', image: 'img'},
    // {name: 'Bills', image: 'img'},
    // {name: 'Third category', image: 'img'},
    // {name: 'Four category', image: 'img'},
    // {name: 'First category', image: 'img'},
    // {name: 'Second category', image: 'img'},
    // {name: 'Third category', image: 'img'},
    // {name: 'Four category', image: 'img'},
  ]);
  const [spendingSum, setSpendingSum] = useState<number>(0);

  async function spending_sum() {
    const response = await fetch('api/Transaction/transactionsSum');

    if (response.ok){
      const data = await response.json();
      setSpendingSum(data);
    } else {
      alert("HTTP Error: " + response.status)
    }
  }
  async function transactionsData() {
    const response = await fetch('api/Transaction/transactions');

    if (response.ok){
      const data = await response.json();
      setTransactions(data);
    } else {
      alert("HTTP Error: " + response.status)
    }
  }
  async function categoriesData() {
    const response = await fetch('api/Category/categories');

    if (response.ok){
      const data = await response.json();
      setCategories(data);
    } else {
      alert("HTTP Error: " + response.status)
    }
  }

  useEffect(() => {
    transactionsData();
    spending_sum()
    categoriesData();
  }, []);
  return (
    <>
      <Container type={ContainerType.transactions}>
        <Layout>
          <Tile
            className={"spending_sum"}
            title={"Spending"}
            type={TileType.spending_sum}
            spendingSum={spendingSum}
          />

          <Tile
            className={"categories_list"}
            title={"Categories"}
            type={TileType.categories_list}
            transactionsList={transactionsList}
            categoriesList={categoriesList}
            setCategories={setCategories}
          />

          <Tile
            className={"transactions_list"}
            title={"Transactions"}
            setSpendingSum={setSpendingSum}
            type={TileType.transactions_list}
            transactionsList={transactionsList}
            setTransactions={setTransactions}
          />
        </Layout>
        <NavBar/>
      </Container>
    </>
  );


};

export default App;
