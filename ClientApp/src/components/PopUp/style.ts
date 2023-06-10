import styled from "styled-components";
import Popup from 'reactjs-popup';
import {PopUpBaseInterface} from "./PopUp";
import exp from "constants";

export const StyledPopUpContainer = styled.div<PopUpBaseInterface>`
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
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
  
  width: 40%;
  max-width: 577px;
  //height: 100%;
  border-bottom-left-radius: 18px;
  border-top-left-radius: 18px ;

  padding: 40px 30px;
  
  background: linear-gradient(116.82deg, #50489D 0%, #58AD60 100%);
`;

export const StyledForm = styled.form`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  border: none;  
`;

export const StyledFormContent = styled.div`
  background-color: white;
  padding: 20px 30px;  

  -webkit-border-radius: 18px;
  -moz-border-radius: 18px;
  border-radius: 18px;
  
  
`;

export const StyledDetails = styled.div`
  display: flex;
  flex-direction: column;

  font-family: 'Inter', sans-serif;
  
  
  .details_title{
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-bottom: 20px;
  }
`;
export const StyledDetailsContent = styled.div`
  background-color: white;
  padding: 20px 30px;

  -webkit-border-radius: 18px;
  -moz-border-radius: 18px;
  border-radius: 18px;

  .details_title-p {
    text-align: center;
  }

  .details_title-img{
    text-align: center;
    margin: 7px 0;
  }
  
  .details_title-img img{
    width: 48px;
    height: 48px;
  }
  
  .details_title-value {
    text-align: center;
    //font-weight: bold;
    font-size: 3em;
  }

  .details_info {
    font-weight: bold;
    font-size: 1.7em;
  }

  .invest_info {
    display: flex;
    flex-direction: column;
    font-size: 1.5em;
  }

  .invest_info-line {
    display: flex;
    justify-content: space-between;
    margin: 15px 0;

    p:first-child {
      color: rgba(0, 0, 0, 0.38);
    }
    p:last-child {
      font-weight: bolder;
    }

    p {
      margin: 0;
    }
  }

`;

export const StyledLabel = styled.label`
  text-align: center;
  display: flex;
  align-items: center;
  
  padding: 0 5px;
  
  font-family: 'Inter', sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 30px;
  line-height: 36px;
`;

export const StyledFormItem = styled.div`

  display: flex;
  
  &:first-child{
    margin: 0 0 15px 0;
  }
  margin: 15px 0;
  padding: 0;
  border: none;
`;


export const StyledSubmitButton = styled.button`
  width: 46%;
  height: 60px;
  
  max-width: 241px;
  border: none;
  -webkit-border-radius: 18px;-moz-border-radius: 18px;border-radius: 18px;
  
  background-color: #FFF;

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  line-height: 30px;
`;

export const StyledCancelButton = styled.button`
  width: 46%;
  height: 60px;
  max-width: 241px;
  border: none;
  -webkit-border-radius: 18px;-moz-border-radius: 18px;border-radius: 18px;

  font-family: 'Inter',sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 25px;
  color: #FFF;
  line-height: 30px;

  background-color: #C20007;
`;

export const StyledSendingForm = styled.div`
  display: flex;
  justify-content: space-between;
`;


export const StyledEditSpan = styled.span`
  display: flex;
  justify-content: flex-end;
`;

export const StyledErrorInfo = styled.p`
  color: #e33a3a;
  font-weight: bold;
  font-size: 0.8em;
  text-align: center;
  margin: 0;
`;

export const StyledEditInput = styled.input`
  width: 40%;
  margin-bottom: 0;
  margin-right: 10px;
`;
export const StyledEditSelect = styled.select`
  margin-bottom: 0;
  margin-right: 10px;
`;


export const StyledLine = styled.span`
  display: inline-block;
  margin: 0;
  padding: 0;
  width: 100%;
  height: 1px;
  background-color: #C7C7C7;
  //background-color: black;
`;

