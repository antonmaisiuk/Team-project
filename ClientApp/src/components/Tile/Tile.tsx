import React, {Dispatch, FC, FormEvent, HTMLAttributes, SetStateAction, useState} from 'react';
import {
  StyledSum,
  StyledLine,
  StyledList,
  StyledTile,
  StyledTileTitle,
  StyledHomeTitle,
  StyledMainScreen
} from './style';
import TransactionsItem from "../Transaction/TransactionsItem/TransactionsItem";
import AddButton from "../ui/AddButton/AddButton";
import PopUp, {PopUpType} from "../PopUp/PopUp";
import {CategoryItem, InvestmentItem, InvestmentType, TransactionItem} from "../../App";
import CategoriesItem from "../Category/CategoriesItem/CategoriesItem";
import InvestmentsItem from '../InvestmentItem/InvestmentsItem';
import transactions from "../Transactions/Transactions";
import {
  StyledCancelButton,
  StyledForm,
  StyledFormContent,
  StyledFormItem,
  StyledLabel,
  StyledSendingForm, StyledSubmitButton
} from "../PopUp/style";
import Input, {InputEnum} from "../ui/Input/Input";
import {Button} from "react-bootstrap";
import {useNavigate} from "react-router-dom";


// const options = [
//   {value: '11', label: 'November'},
//   {value: '10', label: 'October'},
//   {value: '9', label: 'September'}
// ];

// interface TransactionItem{
//   title: string;
//   category: string;
//   value: number
// }

export enum TileType {
  spending_sum,
  transactions_list,
  categories_list,
  investing_sum,
  investing_list,
  main_sreen
}

// export interface TileInterface{
//   // title: string;
//   type: TileType;
//   spend_sum?: number;
//   transactionsList?: TransactionItem[];
//   categoriesList?: CategoryItem[];
//
//   setTransactions?: Dispatch<SetStateAction<[]>>,
// }
export interface TileBaseInterface{
  type: TileType,
  investType?: InvestmentType,
  spendingSum?: number,
  setSpendingSum?: Dispatch<SetStateAction<number>>,
  investingSum?: number,
  setInvestingSum?: Dispatch<SetStateAction<number>>,
  categoriesList?: CategoryItem[],
  setCategories?: Dispatch<SetStateAction<CategoryItem[]>>,
  transactionsList?: TransactionItem[],
  setTransactions?: Dispatch<SetStateAction<TransactionItem[]>>,
  investingList?: InvestmentItem[],
  setInvesting?: Dispatch<SetStateAction<InvestmentItem[]>>,
}
export interface TileCategoryInterface extends TileBaseInterface{
  type: TileType,
  categoriesList: CategoryItem[],
  setCategories: Dispatch<SetStateAction<CategoryItem[]>>,
}
export interface TileTransactionInterface extends TileBaseInterface{
  type: TileType,
  transactionsList: TransactionItem[],
  setSpendingSum: Dispatch<SetStateAction<number>>,
  setTransactions: Dispatch<SetStateAction<TransactionItem[]>>,
}
export interface TileInvestingInterface extends TileBaseInterface{
  type: TileType,
  investType: InvestmentType,
  investingList: InvestmentItem[],
  // setInvestingSum: Dispatch<SetStateAction<number>>,
  // setInvesting: Dispatch<SetStateAction<InvestmentItem[]>>,
}
export interface TileSpendingSumInterface extends TileBaseInterface{
  type: TileType,
  spendingSum: number;
}
export interface TileInvestingSumInterface extends TileBaseInterface{
  type: TileType,
  investingSum: number;
}

export interface TileMainScreenInterface extends TileBaseInterface{
  type: TileType,
}
type TileInterface = TileCategoryInterface | TileTransactionInterface | TileSpendingSumInterface | TileInvestingInterface | TileInvestingSumInterface | TileMainScreenInterface;


const Tile: FC<TileInterface  & HTMLAttributes<HTMLDivElement>> = ({
  title,
  type,
  investType= InvestmentType.stocks,
  spendingSum = 0,
  investingSum = 0,
  transactionsList = [],
  categoriesList= [],
  investingList= [],
  className,
  setTransactions = ()=>{},
  setCategories= ()=>{},
  setInvesting= ()=>{},
  setSpendingSum= () =>{},
  setInvestingSum= () =>{},
  }) => {

  const [modalIsActive, setModalActive] = useState(false);
  const [isDetailsModalActive, setDetailsModalActive] = useState(false);
  const navigate = useNavigate();

  // function getCategoryId(categoriesList: CategoryItem[], category:CategoryItem) {
  //   categoriesList.forEach((item) => {
  //     if (item.name === category.name){
  //       return item.id;
  //     }
  //   })
  // }

  function getCategorySum(transactionsList: TransactionItem[], categoriesList:CategoryItem[] , category:CategoryItem) {

    let catId = 0;
    categoriesList.forEach((item) => {
      if (item.name === category.name){
        catId = item.id;
      }
    })

    return transactionsList
      .filter((item) => item.transCategoryId === catId)
      .reduce((partialSum, a) => partialSum + a.value, 0);
  }

  const renderMainScreen = () => (
    <StyledMainScreen>
      <StyledHomeTitle>You control, <br/> Your money</StyledHomeTitle>
      <Button className={'btn-success'} onClick={() => navigate('/transactions')} >Let's go!</Button>

    </StyledMainScreen>
  );

  const renderCategoryList = () => (
    <StyledTile className={className} type={type}>
      <StyledTileTitle>
        <h2>{title}</h2>
        {(type === TileType.transactions_list || type === TileType.investing_list) && <AddButton setActive={setModalActive} />}
      </StyledTileTitle>
      <StyledList type={type} transactionsList={transactionsList} setTransactions={setTransactions}>
        {categoriesList.map((category) => {

          return (
            <>
              <CategoriesItem name={category.name} category_sum={getCategorySum(transactionsList, categoriesList, category)} image_link={'0'}/>
              <StyledLine/>
            </>
          );
        })}
      </StyledList>

      <PopUp
        type={PopUpType.addCategory}
        active={modalIsActive}
        setActive={setModalActive}
        setCategories={setCategories}
      />
    </StyledTile>
  );

  // const renderTileHeader = () => (
  //   <StyledTile className={className} type={type}>
  //     <StyledTileTitle>
  //       <h2>{title}</h2>
  //       {(type === TileType.transactions_list || type === TileType.investing_list) && <AddButton setActive={setModalActive} />}
  //     </StyledTileTitle>
  // );

  const renderInvestingSum = () => (
    <StyledTile className={className} type={type}>
      <StyledTileTitle>
        <h2>{title}</h2>
        {(type === TileType.transactions_list || type === TileType.investing_list) && <AddButton setActive={setModalActive} />}
      </StyledTileTitle>
      <StyledSum>
        <h2>$ {investingSum.toFixed(2)}</h2>
      </StyledSum>
    </StyledTile>
  );

  const renderInvestingList = () => (
      <StyledTile className={className} type={type}>
        <StyledTileTitle>
          <h2>{title}</h2>
          {(type === TileType.transactions_list || type === TileType.investing_list) && <AddButton setActive={setModalActive} />}
        </StyledTileTitle>
        <StyledList type={type} setInvesting={setInvesting}>
        {investingList.map((invest, index) => {
          return (
            <>
              <InvestmentsItem
                pricePerPiece={invest.pricePerPiece}
                investInfo={invest.investInfo}
                invest={invest}
                amount={invest.amount}
                typeId={invest.typeId}
                investType={investType}
                priceTotal={invest.priceTotal}
                setInvestments={setInvesting}
                setInvestingSum={setInvestingSum}
              />
              <StyledLine/>
            </>
          );
        })}
      </StyledList>
        <PopUp
          type={PopUpType.addInvestment}
          active={modalIsActive}
          investType={investType}
          setActive={setModalActive}
          setInvestments={setInvesting}
          setInvestingSum={setInvestingSum}
        />
      </StyledTile>
  );

  const renderTransactionsList = () => (
        <StyledTile className={className} type={type}>
          <StyledTileTitle>
            <h2>{title}</h2>
            {(type === TileType.transactions_list || type === TileType.investing_list) && <AddButton setActive={setModalActive} />}
          </StyledTileTitle>
          <StyledList type={type} setTransactions={setTransactions}>
            {transactionsList.map((transaction) => {
              return (
                <>
                  <TransactionsItem
                    transaction={transaction}
                    setTransactions={setTransactions}
                    // categoriesList={categoriesList}
                    setSpendingSum={setSpendingSum}
                    // title={transaction.title}
                    // value={transaction.value}
                    // category={categoriesList.find(cat => cat.id === transaction.transCategoryId) || {id: 0, name: 'Other', image: 'url'}}
                    categoriesList={categoriesList}
                  />
                  <StyledLine/>
                </>
              );
            })}

          </StyledList>
          <PopUp
            type={PopUpType.addTransaction}
            active={modalIsActive}
            setActive={setModalActive}
            setTransactions={setTransactions}
            setSpendingSum={setSpendingSum}
            categoriesList={categoriesList}
          />
        </StyledTile>
  );

  const renderSpendingSum = () => (
    <StyledTile className={className} type={type}>
      <StyledTileTitle>
        <h2>{title}</h2>
          {(type === TileType.transactions_list || type === TileType.investing_list) && <AddButton setActive={setModalActive} />}
      </StyledTileTitle>
      <StyledSum>
        <h2>$ {spendingSum}</h2>
      </StyledSum>
    </StyledTile>
  );

  const renderView = () => {
    switch (type) {
      case TileType.main_sreen :
        return renderMainScreen();
      case TileType.categories_list:
        return renderCategoryList();
      case TileType.investing_sum:
        return renderInvestingSum();
      case TileType.investing_list:
        return renderInvestingList();
      case TileType.transactions_list:
        return renderTransactionsList();
      case TileType.spending_sum:
        return renderSpendingSum();
      default:
        return null;
    }
  };
  return (
    renderView()
  );
};

export default Tile;



