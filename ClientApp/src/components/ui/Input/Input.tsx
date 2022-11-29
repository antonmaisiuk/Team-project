import React, {FC, HTMLAttributes, HTMLInputTypeAttribute} from 'react';
import { StyledInput} from './styled';

export enum InputEnum {
  number = 'number',
  date = 'date',
  text = 'text'
}

export interface InputInterface {
  type: InputEnum
}

const Input:FC<InputInterface & HTMLAttributes<HTMLInputElement>> = ({
  type,
  placeholder,
  id,
}) => {
  return (
    <><StyledInput type={type} placeholder={placeholder} id={id}/></>
  );
};

export default Input;
