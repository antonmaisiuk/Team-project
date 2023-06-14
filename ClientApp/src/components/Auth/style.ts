import styled from 'styled-components';
import {Button, Form} from "react-bootstrap";
import { AuthType } from "./Auth";



export const StyledAuthContainer = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: center;
  align-items: center;
  
  height: 100vh;
`;


export const StyledForm = styled.div`
  background-color: #fff;

  display: flex;
  flex-direction: column;
  justify-content: center;
  //align-items: center;
  padding: 20px 45px;
  border-radius: 18px;
  width: 25%;
  min-width: 340px;
  //background-color: #b4b4b4;
`;

export const StyledTitle = styled.h1`
  text-align: center;
  margin: 0;
  padding: 0;
`;

export const StyledFormGroup = styled(Form.Group)`
  display: flex;
  flex-direction: column;
  .auth-buttons{
    display: flex;
    justify-content: space-between;
    button{
      //display: flex;
      //justify-content: space-between;
    }
  }
  
  ${props => props.type === AuthType.login 
          ? `justify-content: space-between;` 
          : 'justify-content: center;'}
  
`;
