import React, {Dispatch, FC, FormEvent, HTMLAttributes, SetStateAction, useEffect, useState} from 'react';
import {
  StyledCancelButton,
  StyledDetails,
  StyledDetailsContent,
  StyledEditInput,
  StyledEditSelect,
  StyledEditSpan,
  StyledErrorInfo,
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
import InvestmentsItem from "../InvestmentItem/InvestmentsItem";

export enum PopUpType{
  addTransaction,
  addCategory,
  addInvestment,
  investDetails,
  transDetails,
}

export interface InvestingTypeInterface{
  id: number,
  name: string,
}

export interface PopUpBaseInterface {
  active: boolean,
  type: PopUpType,
  investType?: InvestmentType,
  invest?: InvestmentItem,
  transaction?: TransactionItem,
  setActive: Dispatch<SetStateAction<boolean>>
  setTransactions?: Dispatch<SetStateAction<TransactionItem[]>>,
  transactionsList?: TransactionItem[],
  setInvestments?: Dispatch<SetStateAction<InvestmentItem[]>>,
  investingList?: InvestmentItem[],
  setCategories?: Dispatch<SetStateAction<CategoryItem[]>>,
  categoriesList?: CategoryItem[],
  setInvestingSum?: Dispatch<SetStateAction<number>>,
  setSpendingSum?: Dispatch<SetStateAction<number>>
}

export interface PopUpCategoryInterface extends PopUpBaseInterface{
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  setCategories: Dispatch<SetStateAction<CategoryItem[]>>,
}

export interface PopUpInvestmentDetailsInterface extends PopUpBaseInterface{
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  invest: InvestmentItem,
  // investingList: InvestmentItem[],
  setInvestments: Dispatch<SetStateAction<InvestmentItem[]>>,
  setInvestingSum: Dispatch<SetStateAction<number>>,
}
export interface PopUpTransactionDetailsInterface extends PopUpBaseInterface{
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  transaction: TransactionItem,
  setTransactions: Dispatch<SetStateAction<TransactionItem[]>>,
  categoriesList: CategoryItem[],
  // investingList: InvestmentItem[],
  // setInvestments: Dispatch<SetStateAction<InvestmentItem[]>>,
  // setInvestingSum: Dispatch<SetStateAction<number>>,
  setSpendingSum: Dispatch<SetStateAction<number>>
}

export interface PopUpTransactionInterface extends PopUpBaseInterface{
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
  setTransactions: Dispatch<SetStateAction<TransactionItem[]>>,
  setSpendingSum: Dispatch<SetStateAction<number>>,
  categoriesList: CategoryItem[],
}
export interface PopUpInvestmentInterface extends PopUpBaseInterface{
  active: boolean,
  investType: InvestmentType,
  setActive: Dispatch<SetStateAction<boolean>>,
  setInvestments: Dispatch<SetStateAction<InvestmentItem[]>>,
  setInvestingSum: Dispatch<SetStateAction<number>>
}

type PopUpInterface = PopUpTransactionInterface | PopUpCategoryInterface | PopUpInvestmentInterface | PopUpInvestmentDetailsInterface | PopUpTransactionDetailsInterface;

const PopUp:FC<PopUpInterface & HTMLAttributes<HTMLDivElement>> = ({
  type,
  active,
  setActive,
  investType,
  setTransactions = ()=>{},
  setInvestments = ()=>{},
  setCategories= ()=>{},
  setSpendingSum = () => {},
  categoriesList = [],
  setInvestingSum = () => {},
  invest = {
    investInfo:{
      id: 2,
      image: "https://assets.stickpng.com/images/580b57fcd9996e24bc43c516.png",
      name: "Apple"
    },
    amount: 20,
    investType: InvestmentType.stocks,
    pricePerPiece: 175.52,
    priceTotal: 3510.4,
    typeId: 2,
  },
  transaction = {id: 1, title: 'Second transaction', transCategoryId: 1, value: 1520.2, comment: 'Text'}
}) => {

  const [investingTypes, setInvestingTypes] = useState<InvestingTypeInterface[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [amountValue, setAmountValue] = useState(invest.amount);
  const [titleValue, setTitleValue] = useState(transaction.title);
  const [commentValue, setCommentValue] = useState(transaction.comment);
  const [categoryValue, setCategoryValue] = useState(transaction.transCategoryId);
  const [transactionValue, setTransactionValue] = useState(transaction.value);
  const [validationError, setValidationError] = useState('');

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

      const { title,  value, date, comment, category } = event.target as typeof event.target & {
        title: { value: string},
        value: {value: number},
        date: {value: string},
        comment: { value: string },
        category: { value: number },
    }

    const response = await fetch('api/Transaction/addTransaction', {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify({
        title: title.value,
        value: value.value,
        date: new Date(),
        comment: comment.value,
        transCategoryId: category.value,
      })
    })
    console.log(response);
    if (response.ok){
      const data:[[], number] = await response.json();
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
      await updatingInvestments(data)
    } else {
      console.error('Error with response');
    }
    }

    const updatingInvestments = async (data: [[], number]) => {
      let sum = 0;
      const investments = await Promise.all(data[0].map(async (item) => {
        const currentType = investingTypes.filter((typeItem: { id: number }) => typeItem.id === item.typeId);

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

        } catch (error) {
          console.error(error);
        }
      }))
      setInvestments(investments)
      setInvestingSum(sum)
      setActive(false);

    }

    const deleteTransaction = async (id: number | undefined) => {
        const response = await fetch(`api/Transaction/DeleteTransaction/${id}`, {
            method: "DELETE",
        });
        console.log(id);
        if (response.ok) {
          const data:[[], number] = await response.json();
          setTransactions(data[0]);
          setSpendingSum(data[1]);
          setActive(false);
        } else {
            alert("HTTP Error: " + response.status);
        }
    };

    function deleteInvestment(invest: InvestmentItem, investType: InvestmentType | undefined) {
        console.log(invest)
        switch (investType) {
            case InvestmentType.stocks:
                // Usu� inwestycj� typu akcje
                deleteStocksInvestment(invest.investInfo.id);
                break;
            case InvestmentType.crypto:
                // Usu� inwestycj� typu obligacje
                deleteCryptoInvestment(invest.investInfo.id);
                break;
            case InvestmentType.metals:
                // Usu� inwestycj� typu nieruchomo��
                deleteMetalsInvestment(invest.investInfo.id);
                break;
            default:
                console.log('Nieznany typ inwestycji');
        }
    }

    const deleteStocksInvestment = async (id: number | undefined) => {
        const response = await fetch(`api/InvestmentStock/DeleteInvestment/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
          const data:[[], number] = await response.json();
          await updatingInvestments(data)
        } else {
            alert("HTTP Error: " + response.status);
        }
    };

    const deleteCryptoInvestment = async (id: number | undefined) => {
        const response = await fetch(`api/InvestmentCryptoCurrency/DeleteInvestment/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
          const data:[[], number] = await response.json();
          await updatingInvestments(data)
        } else {
            alert("HTTP Error: " + response.status);
        }
    };

    const deleteMetalsInvestment = async (id: number | undefined) => {
        const response = await fetch(`api/InvestmentPreciousMetal/DeleteInvestment/${id}`, {
            method: "DELETE",
        });
        if (response.ok) {
          const data:[[], number] = await response.json();
          await updatingInvestments(data)
        } else {
            alert("HTTP Error: " + response.status);
        }
    };

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

  useEffect(() => {
    if(active && (type === PopUpType.investDetails || type === PopUpType.addInvestment)){
      getInvestingTypes()
    }
  }, [active]);

  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const validateInput = (value: string, type:string, field: string) => {
    switch (type){
      case 'number':
        const numericValue = Number(value);
        if (isNaN(numericValue) || value.trim() === '' || numericValue < 0){
          setValidationError(`Invalid ${field} input value`);
          return false;
        } else {
          setValidationError('');
          return true;
        }
        break;
      case 'text':
        return false;
        break;
      default:
        return true;
    }

    // return true;
  };

  const handleSaveClick = async () => {
    if (validationError === '') {

      switch (type){
        case PopUpType.investDetails:
          invest.amount = amountValue;
          const response = await fetch(`api/${controller}/EditInvestment/${invest.typeId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({Amount: Number(invest.amount)})
          });
          if (response.ok) {
            const data:[[], number] = await response.json();
            await updatingInvestments(data);
          } else {
            alert("HTTP Error: " + response.status);
          }
          break;
        case PopUpType.transDetails:
          transaction.title = titleValue;
          transaction.value = transactionValue;
          transaction.transCategoryId = categoryValue;
          transaction.comment = commentValue;
          const transResponse = await fetch(`api/transaction/${transaction.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              Title: transaction.title,
              Value: transaction.value,
              Comment: transaction.comment,
              TransCategoryId: transaction.transCategoryId,
            })
          });
          if (transResponse.ok) {
            const data:[[], number] = await transResponse.json();
            console.log("Transaction edited succesfully!");

            setTransactions(data[0]);
            setSpendingSum(data[1]);
            setActive(false);
          } else {
            alert("HTTP Error: " + transResponse.status);
          }
          break;
      }

      setValidationError('');
      setIsEditing(false);
    }
  };

  const renderAddTransaction = () => (
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
          <label htmlFor={"title"}>Title:</label>
          <Input
            type={InputEnum.text}
            id={'title'}
            placeholder={'Transaction title'}

          />
        </StyledFormItem>
        <StyledLine/>
        <StyledFormItem>
          <label htmlFor={'comment'}>Comment:</label>
          <Input
            type={InputEnum.text}
            id={'comment'}
            placeholder={'Type your comment here'}
          />
        </StyledFormItem>
              <StyledLine />
              <StyledFormItem>
                  <label htmlFor="category">Category:</label>
                  <select id="category">
                      <option value="">Select a category</option>
                      {categoriesList.map((category) => (
                          <option key={category.id} value={category.id}>
                              {category.name}
                          </option>
                      ))}
                  </select>
              </StyledFormItem>
              <StyledLine />
      </StyledFormContent>

      <StyledSendingForm>
        <StyledCancelButton onClick={(e: FormEvent<HTMLButtonElement>) => closePopUp(e)}>Cancel</StyledCancelButton>
        <StyledSubmitButton type={"submit"}>Add</StyledSubmitButton>
      </StyledSendingForm>
    </StyledForm>
  );

  const renderAddInvestment = () => (
    <StyledForm onSubmit={e => sendInvestmentForm(e)}>
      <StyledFormContent>
        <StyledFormItem >
          <Input
            type={InputEnum.number}
            placeholder={'0'}
            onChange={(e) => validateInput(e.target.value, 'number', 'count')}
            id={'investCount'}
          />
          <StyledLabel htmlFor={'investType'}>{investType === InvestmentType.metals ? 'oz' : 'pcs'}</StyledLabel>
        </StyledFormItem>
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
          </select>
          {validationError && <StyledErrorInfo>{validationError}</StyledErrorInfo>}
          
        </StyledFormItem>
        <StyledLine/>
      </StyledFormContent>

      <StyledSendingForm>
        <StyledCancelButton onClick={(e: FormEvent<HTMLButtonElement>) => closePopUp(e)}>Cancel</StyledCancelButton>
        <StyledSubmitButton type={'submit'}>Add</StyledSubmitButton>
      </StyledSendingForm>
    </StyledForm>
  );

  const renderAddCategory = () => (
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
  );

    const renderInvestDetails = () => (
    <>
      <StyledDetails>
        <StyledDetailsContent className={'details_title'}>
          <p className={'details_title-p'}>Investment Details</p>
          <div className={'details_title-img'}>
            <img  src={invest.investInfo.image} alt={'logo'}/>
          </div>
          <h2 className={'details_title-value'}>$ {invest.priceTotal}</h2>
        </StyledDetailsContent>
        <StyledDetailsContent>
          <p className={'details_info'}>Investment Information</p>
          <div className={'invest_info'}>
            <div className="invest_info-line">
              <p>Name</p>
              <p>{invest.investInfo.name}</p>
            </div>
            {/*<StyledLine/>*/}
            <div className="invest_info-line">
              <p>Price</p>
              <p>$ {invest.pricePerPiece}</p>
            </div>
            {/*<StyledLine/>*/}
            <div className="invest_info-line">
              <p>Count</p>
              {isEditing ? (
                <>
                  <StyledEditSpan>
                    <StyledEditInput
                      type={'text'}
                      className={'details-edit'}
                      value={amountValue}
                      onChange={(e) => {
                        setAmountValue(e.target.value)
                        validateInput(e.target.value, 'number', 'count')
                      }}/>
                    <p>{investType === InvestmentType.metals ? 'oz' : 'pcs'}</p>
                  </StyledEditSpan>
                </>
                ) : (
                  <p>
                    {invest.amount} {investType === InvestmentType.metals ? 'oz' : 'pcs'}
                  </p>
              )}
            </div>
            {/*<StyledLine/>*/}
            <div className="invest_info-line">
              <p>Total value</p>
              <p>$ {invest.priceTotal}</p>
            </div>
          </div>
          {validationError && <StyledErrorInfo>{validationError}</StyledErrorInfo>}
        </StyledDetailsContent>
      </StyledDetails>
      <StyledSendingForm>
        {isEditing ? (
          <>
            <StyledSubmitButton type="submit" onClick={handleSaveClick}>Save</StyledSubmitButton>
            <StyledCancelButton type="submit" onClick={handleCancelClick}>Cancel</StyledCancelButton>
          </>
        ) : (
          <>
            <StyledCancelButton onClick={() => deleteInvestment(invest, investType)}>Delete</StyledCancelButton>
            <StyledSubmitButton type="submit" onClick={handleEditClick}>Edit</StyledSubmitButton>
          </>

        )}
      </StyledSendingForm>
    </>
  );

  const renderTransDetails = () => (
    <>
      <StyledDetails>
        <StyledDetailsContent className={'details_title'}>
          <p className={'details_title-p'}>Transaction Details</p>
          <div className={'details_title-img'}>
            <img  src={(categoriesList.find(cat => cat.id === transaction.transCategoryId) || {name: 'Inne'}).image} alt={'logo'}/>
          </div>
          <h2 className={'details_title-value'}>$ {transaction.value}</h2>
        </StyledDetailsContent>
        <StyledDetailsContent>
          <p className={'details_info'}>Transaction Information</p>
          <div className={'invest_info'}>
            <div className="invest_info-line">
              <p>Title</p>
              {isEditing ? (
                <>
                  <StyledEditSpan>
                    <StyledEditInput
                      type={'text'}
                      className={'details-edit details_input-title'}
                      value={titleValue}
                      onChange={(e) => {
                        setTitleValue(e.target.value)
                        validateInput(e.target.value, 'text', 'title')
                      }}/>
                  </StyledEditSpan>
                </>
              ) : (
                <p>{transaction.title}</p>
              )}
            </div>
            <div className="invest_info-line">
              <p>Comment</p>
              {isEditing ? (
                <>
                  <StyledEditSpan>
                    <StyledEditInput
                      type={'text'}
                      className={'details-edit details_input-title'}
                      value={commentValue}
                      onChange={(e) => {
                        setCommentValue(e.target.value)
                        validateInput(e.target.value, 'text', 'comment')
                      }}/>
                  </StyledEditSpan>
                </>
              ) : (
                <p>{transaction.comment || '-'}</p>
              )}
            </div>
            <div className="invest_info-line">
              <p>Value</p>
              {isEditing ? (
                <>
                  <StyledEditSpan>
                    <p>$ </p>
                    <StyledEditInput
                      type={'text'}
                      className={'details-edit details_input-title'}
                      value={transactionValue}
                      onChange={(e) => {
                        setTransactionValue(Number(e.target.value))
                        validateInput(e.target.value, 'number', 'value')
                      }}/>
                  </StyledEditSpan>
                </>
              ) : (
                <p>$ {transaction.value}</p>
              )}
            </div>
            <div className="invest_info-line">
              <p>Category</p>
              {isEditing ? (
                <>
                  <StyledEditSpan>
                    <StyledEditSelect
                      id="category"
                      onChange={(e) => {
                        setCategoryValue(Number(e.target.value))
                      }}
                      value={categoryValue}
                    >
                      <option value="">Select a category</option>
                      {categoriesList.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </StyledEditSelect>
                  </StyledEditSpan>
                </>
              ) : (
                <p>{(categoriesList.find(cat => cat.id === transaction.transCategoryId) || {name: 'Inne'}).name}</p>
              )}
            </div>
            {/*<StyledLine/>*/}
            {/*<div className="invest_info-line">*/}
            {/*  <p>Count</p>*/}
            {/*  <p>{invest.amount} {investType === InvestmentType.metals ? 'oz' : 'pcs'}</p>*/}
            {/*</div>*/}
            {/*<StyledLine/>*/}
            {/*<div className="invest_info-line">*/}
            {/*  <p>Total value</p>*/}
            {/*  <p>$ {invest.priceTotal}</p>*/}
            {/*</div>*/}
          </div>
          {validationError && <StyledErrorInfo>{validationError}</StyledErrorInfo>}
        </StyledDetailsContent>
      </StyledDetails>
      <StyledSendingForm>
        {isEditing ? (
          <>
            <StyledSubmitButton type="submit" onClick={handleSaveClick}>Save</StyledSubmitButton>
            <StyledCancelButton type="submit" onClick={handleCancelClick}>Cancel</StyledCancelButton>
          </>
        ) : (
          <>
            <StyledCancelButton onClick={() => deleteTransaction(transaction.id)}>Delete</StyledCancelButton>
            <StyledSubmitButton type="submit" onClick={handleEditClick}>Edit</StyledSubmitButton>
          </>

        )}
      </StyledSendingForm>
    </>
  );

  const renderView = () => {
    switch (type) {
      case PopUpType.addTransaction :
        return renderAddTransaction();
      case PopUpType.addInvestment:
        return renderAddInvestment();
      case PopUpType.investDetails:
        return renderInvestDetails();
      case PopUpType.transDetails:
        return renderTransDetails();
      case PopUpType.addCategory:
        return renderAddCategory();
      default:
        return null;
    }
  };

  // console.log('### INDEX: ', index);

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

        {renderView()}

      </StyledPopUpContent>
    </StyledPopUpContainer>
  );
};

export default PopUp;
