import React, {FC, HTMLAttributes, useState} from 'react';
import {StyledLine, StyledSendingSum, StyledTile, StyledTileTitle, StyledTransactionsList} from './style';
import Select from "react-select/base";
import {InputActionMeta} from 'react-select';
import TransactionsItem from "../Transaction/TransactionsItem/TransactionsItem";
import AddButton from "../ui/Add/Add";



const options = [
  {value: '11', label: 'November'},
  {value: '10', label: 'October'},
  {value: '9', label: 'September'}
];

export enum TileType {
  spending_sum,
  transactions_list,
  categories_list
}

interface TransactionItem{
  title: string;
  category: string;
  value: number
}
 
export interface TileInterface{
  // title: string;
  type: TileType;
  spend_sum?: number;
  transactionsList?: TransactionItem[];
}


const Tile: FC<TileInterface & HTMLAttributes<HTMLDivElement>> = ({
  title,
  type,
  spend_sum = 0,
  transactionsList = [],
  className
  }) => {

  const [selectedOption, setSelectedOption] = useState("November");

  function add_trans() {
    console.log('LOG');
  }

  // const [transactions, setTransactions] = useState<TransactionItem[]>([]);
  //
  // setTransactions(prevTransaction => [
  //   ...prevTransaction,
  //   {title: 'First transaction', category: 'Eat', value: 766.2}
  // ])

  // const transactionsNodes = transactionsList.map(comment => (
  //   <TransactionsItem title={comment.}>
  //     {comment.text}
  //   </TransactionsItem>
  // ));
  // @ts-ignore
  return (
    <StyledTile className={className}  type={type}>
      <StyledTileTitle>{title}</StyledTileTitle>

      {type === TileType.spending_sum ?
        <StyledSendingSum>
          <h2>$ {spend_sum}</h2>

        </StyledSendingSum>
        : type === TileType.transactions_list ?
          <><StyledTransactionsList>
            {transactionsList.map((transaction) => {
              return (
                <>
                  <TransactionsItem title={transaction.title} value={transaction.value}
                                    category={transaction.category}/>
                  <StyledLine/>
                </>
              );
            })}

            </StyledTransactionsList>
            <AddButton/>
          </>: ''}
    </StyledTile>

  );
};

export default Tile;



