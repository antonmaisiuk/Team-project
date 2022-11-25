import React, {FC, useState} from 'react';
import {StyledLine, StyledSendingSum, StyledTile, StyledTileTitle, StyledTransactionsList} from './style';
import Select from "react-select/base";
import {InputActionMeta} from 'react-select';
import TransactionsItem from "../Transaction/TransactionsItem/TransactionsItem";
import transactionsItem from "../Transaction/TransactionsItem/TransactionsItem";

export enum TileType {
  spending_sum,
  transactions_list,
}

const options = [
  {value: '11', label: 'November'},
  {value: '10', label: 'October'},
  {value: '9', label: 'September'}
];

interface TransactionItem{
  title: string;
  category: string;
  value: number
}
// const transactionsList = [
//   {title: 'First transaction', category: 'Eat', value: 766.2},
//   {title: 'Second transaction', category: 'Car', value: 1520.2},
//   {title: 'Third transaction', category: 'Shopping', value: 30},
// ];

interface TileInterface{
  title: string;
  type: TileType;
  spend_sum?: number;
  transactionsList?: TransactionItem[];
}


const Tile: FC<TileInterface> = ({
  title,
  type,
  spend_sum = 0,
  transactionsList = []
  }) => {

  const [selectedOption, setSelectedOption] = useState("November");
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
    <StyledTile>
      <StyledTileTitle>{title}</StyledTileTitle>

      {type === TileType.spending_sum ?
        <StyledSendingSum>
          <h2>$ {spend_sum}</h2>
          <Select
            onChange={() => setSelectedOption}
            options={options}
            inputValue={''}
            onInputChange={function (newValue: string, actionMeta: InputActionMeta): void {
            }}
            onMenuOpen={function (): void {
            }}
            onMenuClose={function (): void {
            }}
            value={null}/>
        </StyledSendingSum>
        : <StyledTransactionsList>
            {transactionsList.map((transaction)=>{
              return(
                <><TransactionsItem title={transaction.title} value={transaction.value}
                                    category={transaction.category}/>
                  <StyledLine/></>
              );

            })}
          </StyledTransactionsList>}
    </StyledTile>

  );
};

export default Tile;



