import React, {Dispatch, FC, HTMLAttributes, SetStateAction, useState} from 'react';
import {StyledLine, StyledList, StyledSendingSum, StyledTile, StyledTileTitle} from './style';
import TransactionsItem from "../Transaction/TransactionsItem/TransactionsItem";
import AddButton from "../ui/AddButton/AddButton";
import PopUp, {PopUpType} from "../PopUp/PopUp";
import {CategoryItem, TransactionItem} from "../../App";
import CategoriesItem from "../Category/CategoriesItem/CategoriesItem";
import {log} from "util";


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
  categories_list
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
  spendingSum?: number,
  setSpendingSum?: Dispatch<SetStateAction<number>>,
  categoriesList?: CategoryItem[],
  setCategories?: Dispatch<SetStateAction<CategoryItem[]>>,
  transactionsList?: TransactionItem[],
  setTransactions?: Dispatch<SetStateAction<TransactionItem[]>>,
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
export interface TileSpendingSumInterface extends TileBaseInterface{
  type: TileType,
  spendingSum: number;
}
type TileInterface = TileCategoryInterface | TileTransactionInterface | TileSpendingSumInterface;


const Tile: FC<TileInterface  & HTMLAttributes<HTMLDivElement>> = ({
  title,
  type,
  spendingSum = 0,
  transactionsList = [],
  categoriesList= [],
  className,
  setTransactions = ()=>{},
  setCategories= ()=>{},
  setSpendingSum= () =>{},
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
      .reduce((partialSum, a) => partialSum + a.value, 0); ;
  }

  return (
    <StyledTile className={className} type={type}>
      <StyledTileTitle>
        <h2>{title}</h2>
        {!(type === TileType.spending_sum) && <AddButton setActive={setModalActive} />}
      </StyledTileTitle>

      {type === TileType.spending_sum ?
        <StyledSendingSum>
          <h2>$ {spendingSum}</h2>
        </StyledSendingSum>

        : type === TileType.transactions_list ?
          <><StyledList type={type} setTransactions={setTransactions}>
            {transactionsList.map((transaction) => {
              return (
                <>
                  <TransactionsItem title={transaction.title} value={transaction.value}
                                    category={categoriesList?.filter(cat => cat.id === transaction.transCategoryId).pop()}/>
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
            </> : ''}
    </StyledTile>

  );
};

export default Tile;



