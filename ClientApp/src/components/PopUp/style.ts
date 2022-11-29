import styled from "styled-components";
import Popup from 'reactjs-popup';
import {PopUpInterface} from "./PopUp";

export const StyledPopUpContainer = styled.div<PopUpInterface>`
  position: absolute;
  //position: f;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.73);
  
  display: flex;
  justify-content: flex-end;
  opacity: 0;
  pointer-events: none;
  transition: 0.5s;
  
  ${props => props.active && `
    opacity: 1;
    pointer-events: all;
  `}
`;
export const StyledPopUpContent = styled.div`
  //position: absolute;
  width: 40%;
  max-width: 577px;
  height: 100%;
  border-bottom-left-radius: 18px;
  border-top-left-radius: 18px ;
  background: linear-gradient(116.82deg, #50489D 0%, #58AD60 100%);
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 40px 30px;
`;

export const StyledSubmitButton = styled.button`
  background-color: green;
`;

export const StyledCancelButton = styled.button`
  background-color: red;
`;

export const StyledSendingForm = styled.div`
  display: flex;
  justify-content: space-between;
`;

