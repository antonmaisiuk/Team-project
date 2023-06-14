import React, { Dispatch, FC, HTMLAttributes, SetStateAction, useEffect, useState } from 'react';
import Tile, {TileType} from "../Tile/Tile";
import Layout, {LayoutType} from "../Layout/Layout";
import NavBar from "../NavBar/NavBar";
import Container, {ContainerType} from "../Container/Container";
import {Button} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TransactionItem } from '../../App';
import logoIcon from "../../assets/Icons/LogoIcon/pig.png";


//export type TransactionItem = {
//    id: number;
//  title: string;
//  transCategoryId: number;
//  value: number
//}

export type CategoryItem ={
  id: number;
  name: string;
  image: string
}

const Transactions = () => {


  const [transactionsList, setTransactions] = useState<TransactionItem[]>([
    // {title: 'First transaction', transCategoryId: 1, value: 766.2},
    // {title: 'Second transaction', transCategoryId: 1, value: 1520.2},
    // {title: 'Third transaction', transCategoryId: 2, value: 30},
    // {title: 'First transaction', transCategoryId: 2, value: 766.2},
    // {title: 'Second transaction', transCategoryId: 2, value: 1520.2},
    // {title: 'Third transaction', transCategoryId: 1, value: 30},
    // {title: 'First transaction', transCategoryId: 2, value: 766.2},
    // {title: 'Second transaction', transCategoryId: 1, value: 1520.2},
    // {title: 'Third transaction', transCategoryId: 2, value: 30},
    // {title: 'First transaction', transCategoryId: 1, value: 766.2},
    // {title: 'Second transaction', transCategoryId: 2, value: 1520.2},
    // {title: 'Third transaction', transCategoryId: 1, value: 30},
  ]);
  const [categoriesList, setCategories] = useState<CategoryItem[]>([
    // {id: 1, name: 'Eat', image: 'img'},
    // {id: 2, name: 'Bills', image: 'img'},
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
        console.log(data);
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

  const navigate = useNavigate();

  useEffect(() => {
    transactionsData();
    spending_sum()
    categoriesData();
  }, []);

    const logout = async () => {

        const response = await fetch('api/logout', {
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
        <Layout type={LayoutType.transactions}>
          <Tile
            className={"spending_sum"}
            title={"Spending"}
            type={TileType.spending_sum}
            spendingSum={spendingSum}
          />

          <Tile
            className={"transactions_list"}
            title={"Transactions"}
            setSpendingSum={setSpendingSum}
            type={TileType.transactions_list}
            transactionsList={transactionsList}
            categoriesList={categoriesList}
            setTransactions={setTransactions}
          />

          <Tile
            className={"categories_list"}
            title={"Categories"}
            type={TileType.categories_list}
            transactionsList={transactionsList}
            categoriesList={categoriesList}
            setCategories={setCategories}
          />


        </Layout>
        <NavBar>
          <div>
            <img src={logoIcon} alt={'Logo'} width={'96px'}/>
          </div>
          <div>
            <Button onClick={() => navigate('/')} >Home</Button>
            <Button onClick={() => navigate('/investments')} >Investments</Button>
          </div>
          <div>
            <Button onClick={() => logout()} >Logout</Button>
          </div>
        </NavBar>
      </Container>
    </>
  );


};

export default Transactions;
