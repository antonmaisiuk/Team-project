import React, {Dispatch, FC, FormEvent, HTMLAttributes, SetStateAction} from 'react';
import {StyledCancelButton, StyledForm, StyledPopUpContainer, StyledPopUpContent, StyledSendingForm, StyledSubmitButton } from './style';

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
          <fieldset>
            <input type={"number"} placeholder={"0"} min={0} id={"value"}/>
          </fieldset>
          <fieldset>
            <label htmlFor={"date"}>Date:</label>
            <input type={"date"} id={"date"}/>
          </fieldset>
          <fieldset>
            <label htmlFor={"comment"}>Comment:</label>
            <input type={"text"} id={"comment"}/>
          </fieldset>

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
