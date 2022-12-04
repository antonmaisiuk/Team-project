import React, {Dispatch, FC, HTMLAttributes, SetStateAction, useState} from 'react';
import { StyledLine, StyledList, StyledSendingSum, StyledTile, StyledTileTitle} from './style';
import TransactionsItem from "../Transaction/TransactionsItem/TransactionsItem";
import AddButton from "../ui/AddButton/AddButton";
import PopUp from "../PopUp/PopUp";
import {CategoryItem, TransactionItem} from "../../App";
import CategoriesItem from "../Category/CategoriesItem/CategoriesItem";



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
  type: TileType;
  spend_sum?: number;
  categoriesList?: CategoryItem[];
  setCategories?: Dispatch<SetStateAction<CategoryItem[]>>,
  transactionsList?: TransactionItem[];
  setTransactions?: Dispatch<SetStateAction<TransactionItem[]>>,
}
export interface TileCategoryInterface extends TileBaseInterface{
  type: TileType;
  categoriesList: CategoryItem[];
  setCategories: Dispatch<SetStateAction<CategoryItem[]>>,
}
export interface TileTransactionInterface extends TileBaseInterface{
  type: TileType;
  transactionsList: TransactionItem[];
  setTransactions: Dispatch<SetStateAction<TransactionItem[]>>,
}
export interface TileSpendingSumInterface extends TileBaseInterface{
  type: TileType;
  spend_sum: number;
}
type TileInterface = TileCategoryInterface | TileTransactionInterface | TileSpendingSumInterface;


const Tile: FC<TileInterface  & HTMLAttributes<HTMLDivElement>> = ({
  title,
  type,
  spend_sum = '0',
  transactionsList = [],
  categoriesList= [],
  className,
  setTransactions = ()=>{},
  setCategories= ()=>{}
  }) => {

  const [modalIsActive, setModalActive] = useState(false);

  return (
    <StyledTile className={className}  type={type}>
      <StyledTileTitle>
        <h2>{title}</h2>
        {!(type === TileType.spending_sum) && <AddButton setActive={setModalActive} />}
      </StyledTileTitle>

      {type === TileType.spending_sum ?
        <StyledSendingSum>
          <h2>$ {spend_sum}</h2>

        </StyledSendingSum>
        : type === TileType.transactions_list ?
          <><StyledList type={type} setTransactions={setTransactions}>
            {transactionsList.map((transaction) => {
              return (
                <>
                  <TransactionsItem title={transaction.title} value={transaction.value}
                                    category={transaction.category}/>
                  <StyledLine/>
                </>
              );
            })}

            </StyledList>
            <PopUp active={modalIsActive} setActive={setModalActive} setTransactions={setTransactions} />
          </>
        : type === TileType.categories_list ?
            <>
              <StyledList type={type} setTransactions={setTransactions}>
                {categoriesList.map((category) => {
                  return (
                    <>
                      <CategoriesItem name={category.name} category_sum={0} image_link={'0'}/>
                      <StyledLine/>
                    </>
                  );
                })}

              </StyledList>

              <PopUp active={modalIsActive} setActive={setModalActive} setTransactions={setTransactions}/>
            </> : ''}
    </StyledTile>

  );
};

export default Tile;



