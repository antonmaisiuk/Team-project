import React, {Dispatch, FC, FormEvent, HTMLAttributes, SetStateAction, useEffect, useState} from 'react';
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
import {CategoryItem, InvestmentItem, InvestmentType, TransactionItem} from "../../App";

export enum PopUpType{
  addTransaction,
  addCategory,
  addInvestment
}

export interface InvestingTypeInterface{
  id: number,
  name: string,
}

export interface PopUpBaseInterface {
  active: boolean,
  type: PopUpType,
  investType?: InvestmentType,
  setActive: Dispatch<SetStateAction<boolean>>
  setTransactions?: Dispatch<SetStateAction<TransactionItem[]>>,
  setInvestments?: Dispatch<SetStateAction<InvestmentItem[]>>,
  setCategories?: Dispatch<SetStateAction<CategoryItem[]>>,
  setInvestingSum?: Dispatch<SetStateAction<number>>
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
export interface PopUpInvestmentInterface extends PopUpBaseInterface{
  active: boolean,
  investType: InvestmentType,
  setActive: Dispatch<SetStateAction<boolean>>,
  setInvestments: Dispatch<SetStateAction<InvestmentItem[]>>,
  setInvestingSum: Dispatch<SetStateAction<number>>
}

type PopUpInterface = PopUpTransactionInterface | PopUpCategoryInterface | PopUpInvestmentInterface;

const PopUp:FC<PopUpInterface & HTMLAttributes<HTMLDivElement>> = ({
  type,
  active,
  setActive,
  investType,
  setTransactions = ()=>{},
  setInvestments = ()=>{},
  setCategories= ()=>{},
  setSpendingSum = () => {},
  setInvestingSum = () => {},
}) => {

  const [investingTypes, setInvestingTypes] = useState<InvestingTypeInterface[]>([]);

  let controller = '', cat = '';
  switch (investType){
    case InvestmentType.stocks:
      controller = 'InvestmentStock';
      cat = 'TypeStockId';
      break;
    case InvestmentType.crypto:
      controller = 'InvestmentCryptoCurrency';
      cat = 'Crypto';
      break;
    case InvestmentType.metals:
      controller = 'InvestmentPreciousMetal';
      cat = 'Metals';
      break;
  }

  const sendTransactionForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {value, date, comment} = event.target as typeof event.target & {
      // id : {value: number},
      // title: {value: string},
      value: {value: number},
      date: {value: string},
      comment: {value: string},
    }

    if (date.value === '') {
         date.value = getCurrentDate();
    }

    const response = await fetch('api/Transaction/addTransaction', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        // id: 1,
        title: comment.value,
        value: value.value,
        date: date.value,
        // comment: comment.value,
      })
    })
    console.log(response);
    if (response.ok){
      const data:[[], number] = await response.json(); //odbieranie aktualnej listy transakcji
      console.log(data);
      setTransactions(data[0]);
      setSpendingSum(data[1]);
      setActive(false);
    } else {
      console.error('Error with response');
    }
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
  const sendInvestmentForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {investCount, investmentName} = event.target as typeof event.target & {
      investCount: {value: number},
      investmentName: {value: HTMLSelectElement},
    }

    const response = await fetch(`api/${controller}/Add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        Amount: investCount.value,
        TypeId: investmentName.value,
        // date: date.value,
      })
    })
    if (response.ok){
      const data:[[], number] = await response.json();
      console.log(data);

      let sum = 0;
      const investments = await Promise.all(data[0].map(async (item) => {
        // console.log('### CRYPTO ITEM: ', item);
        // console.log('### CRPTO DATA TYPR: ', data);
        const currentType = investingTypes.filter((typeItem: { id: number }) => typeItem.id === item.typeId);
        // console.log('### Data types: ', currentType[0].index);

        try {
          switch (controller) {
            case 'InvestmentStock':
              const url = `https://realstonks.p.rapidapi.com/${currentType[0].index}`;
              const options = {
                method: 'GET',
                headers: {
                  'content-type': 'application/octet-stream',
                  'X-RapidAPI-Key': 'b7f693bd5bmsh15d4fb4def8fb20p1cd336jsn6a66c0245a0c',
                  'X-RapidAPI-Host': 'realstonks.p.rapidapi.com'
                }
              };

              const stockResponse = await fetch(url, options);
              const stockData = await stockResponse.json();

              // console.log('### stockData: ', stockData);
              sum += Number((item.amount * stockData.price).toFixed(2));
              return {
                typeId: item.typeId,
                investInfo: currentType[0],
                amount: item.amount,
                pricePerPiece: stockData.price.toFixed(2) || 0,
                priceTotal: Number((item.amount * stockData.price).toFixed(2)),
              }

              break;
            case 'InvestmentCryptoCurrency':
              const cryptoResponse = await fetch(`https://api.coinpaprika.com/v1/tickers/${currentType[0].index}`);
              const cryptoData = await cryptoResponse.json();

              sum += Number((item.amount * cryptoData.quotes.USD.price).toFixed(2));
              return {
                typeId: item.typeId,
                investInfo: currentType[0],
                amount: item.amount,
                pricePerPiece: cryptoData.quotes.USD.price.toFixed(2) || 0,
                priceTotal: Number((item.amount * cryptoData.quotes.USD.price).toFixed(2)),
              }

              break;
            case 'InvestmentPreciousMetal':
              const response = await fetch(`https://api.currencybeacon.com/v1/latest?api_key=407ce20e80bde2fd714142bc8b5047bb&base=${currentType[0].index}&symbols=USD`);
              const metalsData = await response.json();

              sum += Number((item.amount * metalsData.response.rates.USD).toFixed(2));
              return {
                typeId: item.typeId,
                investInfo: currentType[0],
                amount: item.amount,
                pricePerPiece: metalsData.response.rates.USD.toFixed(2) || 0,
                priceTotal: Number((item.amount * metalsData.response.rates.USD).toFixed(2)),
              }
              break;
          }


          // console.log('### cryptoData: ', cryptoData);
          // console.log('### crypto price: ', cryptoData.quotes.USD.price);

        } catch (error) {
          console.error(error);
        }
      }))

      // @ts-ignore

      console.log('### INVEST AFTER ADD', investments);
      console.log('### INVEST SUM AFTER ADD', sum);
      setInvestments(investments)
      setInvestingSum(sum)

          // stock.pricePerPiece = Number(stockData['Global Quote']['05. price']);
          // stock.investingSum = stock
          // setCurrentPrice(Number(stockData['Global Quote']['05. price']));


      // data[0].map(item => item.typeId = (investingTypes.filter(type => type.id === item.typeId).pop() || {}).name);
      // setInvestments(data[0]);
      // setInvestingSum(data[1]);
      setActive(false);
    } else {
      console.error('Error with response');
    }
  }

  async function getInvestingTypes() {
    const typeResponse = await fetch(`api/${controller}/types`);
    if (typeResponse.ok) {
      const data = await typeResponse.json();
      console.log('### data: ', data);
      setInvestingTypes(data);
    } else {
      alert("HTTP Error: " + typeResponse.status)
    }
  }

  function closePopUp(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setActive(false);
  }
  function getCurrentDate() {
    let curr = new Date();
    curr.setDate(curr.getDate() + 3);
    return curr.toISOString().substring(0, 10);
  }

  useEffect(() => {
    if(active){
      getInvestingTypes()
    }
  }, [active]);

  return (
    <StyledPopUpContainer
      className={active ? 'add_container active' : 'add_container'}
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
        {type === PopUpType.addInvestment &&
            <StyledForm onSubmit={e => sendInvestmentForm(e)}>
                <StyledFormContent>
                    <StyledFormItem >
                        <Input
                            type={InputEnum.number}
                            placeholder={'0'}
                          // onChange={(e)=> console.log(e.currentTarget.value)}
                            id={'investCount'}
                        />
                        <StyledLabel htmlFor={'investType'}>{investType === InvestmentType.metals ? 'oz' : 'pcs'}</StyledLabel>
                      {/*<input type={"number"} />*/}
                    </StyledFormItem>
                    {/*<StyledLine/>*/}
                    {/*<StyledFormItem>*/}
                    {/*    <label htmlFor={"date"}>Date:</label>*/}
                    {/*    <Input*/}
                    {/*        type={InputEnum.date}*/}
                    {/*        id={'date'}*/}
                    {/*      // value={"02-12-2022"}*/}
                    {/*      // onChange={(e)=> setDate(e.currentTarget.value)}*/}
                    {/*      // defaultValue={"02-12-2022"}*/}
                    {/*    />*/}
                    {/*  /!*<input type={"date"} id={"date"}/>*!/*/}
                    {/*</StyledFormItem>*/}
                    <StyledLine/>
                    <StyledFormItem>
                        <label htmlFor={'investmentName'}>
                          {investType === InvestmentType.stocks ? 'Select stock index' :
                            investType === InvestmentType.metals ? 'Select metal name' : 'Select crypto index'}:
                        </label>
                        <select id={'investmentName'}>
                          {investingTypes.map((type) => (
                            <option value={type.id}>{type.name}</option>
                          ))}
                            {/*<option>Gold</option>*/}
                            {/*<option>Bitcoin</option>*/}
                        </select>
                        {/*<Input*/}
                        {/*    type={InputEnum.text}*/}
                        {/*    id={"investment-title"}*/}
                        {/*    placeholder={"Type your comment here"}*/}
                        {/*  // onChange={(e)=> setComment(e.currentTarget.value)}*/}
                        {/*/>*/}
                      {/*<input type={"text"} id={"comment"}/>*/}
                    </StyledFormItem>
                    <StyledLine/>
                </StyledFormContent>

                <StyledSendingForm>
                    <StyledCancelButton onClick={(e: FormEvent<HTMLButtonElement>) => closePopUp(e)}>Cancel</StyledCancelButton>
                    <StyledSubmitButton type={'submit'}>Add</StyledSubmitButton>
                </StyledSendingForm>
            </StyledForm>
        }

      </StyledPopUpContent>
    </StyledPopUpContainer>
  );
};

export default PopUp;
