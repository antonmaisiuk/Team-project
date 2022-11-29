import React, {Dispatch, FC, FormEvent, HTMLAttributes, SetStateAction} from 'react';
import {StyledCancelButton, StyledForm,
  StyledFormContent, StyledFormItem,
  StyledLabel,
  StyledLine, StyledPopUpContainer, StyledPopUpContent, StyledSendingForm, StyledSubmitButton } from './style';
import Input, {InputEnum} from "../ui/Input/Input";

export interface PopUpInterface {
  active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
}

const PopUp:FC<PopUpInterface & HTMLAttributes<HTMLDivElement>> = ({
  active,
  setActive
}) => {

  const sendForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const {value, date, comment} = event.target as typeof event.target & {
      value : {value: number}
      date: {value: string}
      comment: {value: string}
    }

    console.log(value.value, date.value, comment.value);

    await fetch('api/transaction', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        value: value.value,
        date: date.value,
        description: comment.value
      })
    })
    setActive(false);
  }


  function closePopUp(e: FormEvent<HTMLButtonElement>) {
    e.preventDefault()
    setActive(false);
  }

  return (
    <StyledPopUpContainer className={active ? "add_container active" : "add_container"} onClick={() => setActive(false)} active={active} setActive={setActive}>
      <StyledPopUpContent className={"add_content"} onClick={e => e.stopPropagation()}>
        <StyledForm onSubmit={e => sendForm(e)}>
          <StyledFormContent>
            <StyledFormItem >
              <Input type={InputEnum.number} placeholder={"0"}  id={"value"}/>
              <StyledLabel htmlFor={"value"}>$</StyledLabel>
              {/*<input type={"number"} />*/}
            </StyledFormItem>
            <StyledLine/>
            <StyledFormItem>
              <label htmlFor={"date"}>Date:</label>
              <Input type={InputEnum.date} id={"date"}/>
              {/*<input type={"date"} id={"date"}/>*/}
            </StyledFormItem>
            <StyledLine/>
            <StyledFormItem>
              <label htmlFor={"comment"}>Comment:</label>
              <Input type={InputEnum.text} id={"comment"}/>
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
