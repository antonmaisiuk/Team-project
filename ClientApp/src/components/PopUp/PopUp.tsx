import React, {Dispatch, FC, FormEvent, HTMLAttributes, SetStateAction, useState} from 'react';
import {
  StyledCancelButton,
  StyledForm,
  StyledFormContent,
  StyledFormItem,
  StyledLabel,
  StyledLine,
  StyledPopUpContainer,
  StyledPopUpContent,
  StyledSendingForm,
  StyledSubmitButton
} from './style';
import Input, {InputEnum} from "../ui/Input/Input";
import {CategoryItem, TransactionItem} from "../../App";

export interface PopUpBaseInterface {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>
  setTransactions?: Dispatch<SetStateAction<TransactionItem[]>>,
  setCategories?: Dispatch<SetStateAction<CategoryItem[]>>,
}

export interface PopUpCategoryInterface extends PopUpBaseInterface{
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  setCategories: Dispatch<SetStateAction<CategoryItem[]>>,
}

export interface PopUpTransactionInterface extends PopUpBaseInterface{
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  setTransactions: Dispatch<SetStateAction<TransactionItem[]>>,
}

type PopUpInterface = PopUpTransactionInterface | PopUpCategoryInterface;



const PopUp:FC<PopUpInterface & HTMLAttributes<HTMLDivElement>> = ({
  active,
  setActive,
  setTransactions = ()=>{},
  setCategories= ()=>{},
}) => {

  // const [title, setTitle] = useState('');
  // const [value, setValue] = useState(0);
  // const [date, setDate] = useState(getCurrentDate());
  // const [comment, setComment] = useState('');

  const sendForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let {title, value, date, comment} = event.target as typeof event.target & {
      id : {value: number},
      title: {value: string},
      value: {value: number},
      date: {value: string},
      comment: {value: string},
    }

    // console.log(value.value, date.value, comment.value);

    const response = await fetch('api/Transaction/addTransaction', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: 1,
        title: 'New transaction title',
        value: value.value,
        date: date.value,
        comment: comment.value,
      })
    })

    // console.log(response);
    const data = await response.json();

    // title.value = '';
    // comment.value = '';
    // date.value = ''
    // value.value = 0;
    setTransactions(data);
    setActive(false);
    // transactionsData();
  }


  function closePopUp(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setActive(false);
  }
  function getCurrentDate() {
    let curr = new Date();
    curr.setDate(curr.getDate() + 3);
    // console.log(curr.toISOString().substring(0, 10));
    return curr.toISOString().substring(0, 10);
  }


  return (
    <StyledPopUpContainer
      className={active ? "add_container active" : "add_container"}
      onClick={() => setActive(false)}
      active={active}
      setActive={setActive}
      setTransactions={setTransactions}
    >
      <StyledPopUpContent className={"add_content"} onClick={e => e.stopPropagation()}>
        <StyledForm onSubmit={e => sendForm(e)} method={'POST'}>
          <StyledFormContent>
            <StyledFormItem >
              <Input
                type={InputEnum.number}
                placeholder={"0"}
                // onChange={(e)=> console.log(e.currentTarget.value)}
                id={"value"}
              />
              <StyledLabel htmlFor={"value"}>$</StyledLabel>
              {/*<input type={"number"} />*/}
            </StyledFormItem>
            <StyledLine/>
            <StyledFormItem>
              <label htmlFor={"date"}>Date:</label>
              <Input
                type={InputEnum.date}
                id={"date"}
                value={"02-12-2022"}
                // onChange={(e)=> setDate(e.currentTarget.value)}
                // defaultValue={"02-12-2022"}
              />
              {/*<input type={"date"} id={"date"}/>*/}
            </StyledFormItem>
            <StyledLine/>
            <StyledFormItem>
              <label htmlFor={"comment"}>Comment:</label>
              <Input
                type={InputEnum.text}
                id={"comment"}
                placeholder={"Type your comment here"}
                // onChange={(e)=> setComment(e.currentTarget.value)}
              />
              {/*<input type={"text"} id={"comment"}/>*/}
            </StyledFormItem>
            <StyledLine/>
          </StyledFormContent>

          <StyledSendingForm>
            <StyledCancelButton onClick={(e: FormEvent<HTMLButtonElement>) => closePopUp(e)}>Cancel</StyledCancelButton>
            <StyledSubmitButton type={"submit"}>Add</StyledSubmitButton>
          </StyledSendingForm>

        </StyledForm>
      </StyledPopUpContent>
    </StyledPopUpContainer>
  );
};

export default PopUp;
