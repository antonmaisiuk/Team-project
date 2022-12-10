import React, {Dispatch, FC, FormEvent, HTMLAttributes, SetStateAction} from 'react';
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

export enum PopUpType{
  addTransaction,
  addCategory
}

export interface PopUpBaseInterface {
  active: boolean,
  type: PopUpType,
  setActive: Dispatch<SetStateAction<boolean>>
  setTransactions?: Dispatch<SetStateAction<TransactionItem[]>>,
  setCategories?: Dispatch<SetStateAction<CategoryItem[]>>,
  setSpendingSum?: Dispatch<SetStateAction<number>>
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
  setSpendingSum: Dispatch<SetStateAction<number>>
}

type PopUpInterface = PopUpTransactionInterface | PopUpCategoryInterface;



const PopUp:FC<PopUpInterface & HTMLAttributes<HTMLDivElement>> = ({
  type,
  active,
  setActive,
  setTransactions = ()=>{},
  setCategories= ()=>{},
  setSpendingSum = () => {},
}) => {

  // const [title, setTitle] = useState('');
  // const [value, setValue] = useState(0);
  // const [date, setDate] = useState(getCurrentDate());
  // const [comment, setComment] = useState('');

  const sendTransactionForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {value, date, comment} = event.target as typeof event.target & {
      // id : {value: number},
      title: {value: string},
      value: {value: number},
      date: {value: string},
      comment: {value: string},
    }

    const response = await fetch('api/Transaction/addTransaction', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        // id: 1,
        //title: title.value,
        value: value.value,
        date: date.value,
        comment: comment.value,
      })
    })

    const data:[[], number] = await response.json(); //odbieranie aktualnej listy transakcji
    console.log(data)
    setTransactions(data[0]);
    setSpendingSum(data[1]);
    setActive(false);
  }
  const sendCategoryForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {name, imageLink} = event.target as typeof event.target & {
      // id : {value: number},
      name: {value: string},
      imageLink: {value: string},
    }

    const response = await fetch('api/Category/addTransCategory', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: name.value,
        imageLink: imageLink.value,
      })
    })

    const data = await response.json(); //odbieranie aktualnej listy transakcji

    setCategories(data);
    setActive(false);
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
      type={type}
      active={active}
      setActive={setActive}
      setTransactions={setTransactions}
    >
      <StyledPopUpContent className={"add_content"} onClick={e => e.stopPropagation()}>
        {type === PopUpType.addTransaction &&
            <StyledForm onSubmit={e => sendTransactionForm(e)}>
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
                          // value={"02-12-2022"}
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
        }
        {type === PopUpType.addCategory &&
            <StyledForm onSubmit={e => sendCategoryForm(e)}>
                <StyledFormContent>
                    <StyledFormItem >
                        <Input
                            type={InputEnum.text}
                            placeholder={"Category name"}
                          // onChange={(e)=> console.log(e.currentTarget.value)}
                            id={"name"}
                        />
                        {/*<StyledLabel htmlFor={"value"}>$</StyledLabel>*/}
                      {/*<input type={"number"} />*/}
                    </StyledFormItem>
                    <StyledLine/>
                    <StyledFormItem>
                        <label htmlFor={"image_link"}>Image link:</label>
                        <Input
                            type={InputEnum.text}
                            id={"image_link"}
                            placeholder={"Image link"}
                          // value={"02-12-2022"}
                          // onChange={(e)=> setDate(e.currentTarget.value)}
                          // defaultValue={"02-12-2022"}
                        />
                      {/*<input type={"date"} id={"date"}/>*/}
                    </StyledFormItem>
                    <StyledLine/>
                    {/*<StyledFormItem>*/}
                    {/*    <label htmlFor={"comment"}>Comment:</label>*/}
                    {/*    <Input*/}
                    {/*        type={InputEnum.text}*/}
                    {/*        id={"comment"}*/}
                    {/*        placeholder={"Type your comment here"}*/}
                    {/*      // onChange={(e)=> setComment(e.currentTarget.value)}*/}
                    {/*    />*/}
                    {/*  /!*<input type={"text"} id={"comment"}/>*!/*/}
                    {/*</StyledFormItem>*/}
                    {/*<StyledLine/>*/}
                </StyledFormContent>

                <StyledSendingForm>
                    <StyledCancelButton onClick={(e: FormEvent<HTMLButtonElement>) => closePopUp(e)}>Cancel</StyledCancelButton>
                    <StyledSubmitButton type={"submit"}>Add</StyledSubmitButton>
                </StyledSendingForm>
            </StyledForm>
        }

      </StyledPopUpContent>
    </StyledPopUpContainer>
  );
};

export default PopUp;
