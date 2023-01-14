import React, {useEffect, useState} from 'react';
import Tile, {TileType} from "./components/Tile/Tile";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import {Counter} from "./components/Counter";
import NavBar from "./components/NavBar/NavBar";
import Container, {ContainerType} from "./components/Container/Container";
import {BrowserRouter as Router, Route, Routes, useNavigate} from "react-router-dom";
import Auth, {AuthType} from "./components/Auth/Auth";
import Transactions from "./components/Transactions/Transactions";

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

  const [name, setName] = useState('');
  

  useEffect(() => {
    (
      async () => {
        const response = await fetch('api/user',{
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
        })
        const content = await response.json();

        setName(content.name);
      }
    )();
  });

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Auth type={AuthType.login} />}/>
        <Route path="/register" element={<Auth type={AuthType.register} />}/>
        <Route path="/transactions" element={<Transactions />}/>
        {/*<Route path="/home" element={<Home userName={name} setUserName={setName} />}/>*/}
        <Route path="/" element={<Transactions />}/>
      </Routes>
    </Router>
  );

};

export default App;
