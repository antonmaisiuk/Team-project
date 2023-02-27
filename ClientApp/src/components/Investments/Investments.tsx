import React, {useState} from 'react';
import Container, {ContainerType} from "../Container/Container";
import Layout, {LayoutType} from "../Layout/Layout";
import Tile, {TileType} from "../Tile/Tile";
import {InvestmentItem} from "../../App";
import {Button} from "react-bootstrap";
import NavBar from "../NavBar/NavBar";
import {useNavigate} from "react-router-dom";

const Investments = () => {

  const [investStocksList, setinvestStocksList] = useState<InvestmentItem[]>([]);


  const navigate = useNavigate();
  return (
    <>
      <Container type={ContainerType.transactions}>
        <Layout type={LayoutType.investments}>
          <Tile
            className={"stocks_invest"}
            title={"Stocks"}
            type={TileType.investing_sum}
            investingSum={0/*investingSum*/}
          />
          <Tile
            className={"stocks_invest"}
            title={"Stocks"}
            type={TileType.investing_sum}
            investingSum={0/*investingSum*/}
          />
          <Tile
            className={"stocks_invest"}
            title={"Stocks"}
            type={TileType.investing_sum}
            investingSum={0/*investingSum*/}
          />
          <Tile
            className={"stocks_invest"}
            title={"Stocks balance"}
            type={TileType.investing_list}
            investingList={investStocksList}
          />
          <Tile
            className={"stocks_invest"}
            title={"Stocks balance"}
            type={TileType.investing_list}
            investingList={investStocksList}
          />
          <Tile
            className={"stocks_invest"}
            title={"Stocks balance"}
            type={TileType.investing_list}
            investingList={investStocksList}
          />
        </Layout>
        <NavBar>
          <Button onClick={() => navigate('/')} >Home</Button>
        </NavBar>
      </Container>
    </>
  );
};

export default Investments;

