import React, {Dispatch, FC, HTMLAttributes, SetStateAction, useState} from 'react';
import {StyledSum, StyledLine, StyledList, StyledTile, StyledTileTitle} from './style';
import TransactionsItem from "../Transaction/TransactionsItem/TransactionsItem";
import AddButton from "../ui/AddButton/AddButton";
import PopUp, {PopUpType} from "../PopUp/PopUp";
import {CategoryItem, InvestmentItem, InvestmentType, TransactionItem} from "../../App";
import CategoriesItem from "../Category/CategoriesItem/CategoriesItem";
import InvestmentsItem from '../InvestmentItem/InvestmentsItem';


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
  investing_list
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
type TileInterface = TileCategoryInterface | TileTransactionInterface | TileSpendingSumInterface | TileInvestingInterface | TileInvestingSumInterface;


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

  // console.log('### investList: ', investingList);
  return (
    <StyledTile className={className} type={type}>
      <StyledTileTitle>
        <h2>{title}</h2>
        {(type === TileType.transactions_list || type === TileType.investing_list) && <AddButton setActive={setModalActive} />}
      </StyledTileTitle>

      {type === TileType.spending_sum ?
        <StyledSum>
          <h2>$ {spendingSum}</h2>
        </StyledSum>

        : type === TileType.transactions_list ?
          <><StyledList type={type} setTransactions={setTransactions}>
            {transactionsList.map((transaction) => {
              return (
                <>
                  <TransactionsItem title={transaction.title} value={transaction.value}
                                    category={categoriesList.find(cat => cat.id === transaction.transCategoryId) || {id: 0, name: 'Other', image: 'url'}}/>
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
              setSpendingSum={setSpendingSum}/>
          </>
        : type === TileType.categories_list ?
          <>
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
              setCategories={setCategories}/>
          </>
        : type === TileType.investing_sum ?
          <>
            <StyledSum>
              <h2>$ {investingSum}</h2>
            </StyledSum>
          </>
        : type === TileType.investing_list ?
                <><StyledList type={type} setInvesting={setInvesting}>
                  {investingList.map((invest) => {
                    console.log('### Invest: ', invest);
                    return (
                      <>
                        <InvestmentsItem /*{title={invest.title}}*/ amount={invest.amount} typeId={invest.typeId} investType={investType} /*{investmentType={investType}}*/ />
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
                    setInvestingSum={setInvestingSum}/>
                </>
        :''
      }
    </StyledTile>
    // <StyledInvestTile>
    //
    // </StyledInvestTile>
  );
};

export default Tile;



