import React, {FC, HTMLAttributes, useState} from 'react';
import {StyledLine, StyledSendingSum, StyledTile, StyledTileTitle, StyledTransactionsList} from './style';
import Select from "react-select/base";
import {InputActionMeta} from 'react-select';
import TransactionsItem from "../Transaction/TransactionsItem/TransactionsItem";
import AddButton from "../ui/AddButton/AddButton";
import PopUp from "../PopUp/PopUp";
import {log} from "util";



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
  className,
  }) => {

  const [selectedOption, setSelectedOption] = useState("November");
  const [modalIsActive, setModalActive] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setModalActive(true);
  }
  function add_trans() {
    console.log('LOG');
  }

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
            <AddButton setActive={setModalActive} />
            <PopUp active={modalIsActive} setActive={setModalActive}/>
          </>: ''}
    </StyledTile>

  );
};

export default Tile;



