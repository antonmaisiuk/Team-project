import React, {DataHTMLAttributes, FC, HTMLAttributes, HTMLInputTypeAttribute} from 'react';
import { StyledInput} from './styled';

export enum InputEnum {
  number = 'number',
  date = 'date',
  text = 'text'
}

export interface InputInterface {
  type: InputEnum,
  value?: string,
  min?: number,
  isRequired: boolean,
}

const Input:FC<InputInterface & HTMLAttributes<HTMLInputElement>> = ({
  type,
  placeholder,
  value,
  id,
  isRequired,
  min = 0.00,
}) => {
  return (
    <><StyledInput type={type} required={isRequired} step={'0.01'}  min={min}  placeholder={placeholder} id={id} value={value}/></>
  );
};

export default Input;
