import styled from 'styled-components';
import AddIcon from "../../../assets/Icons/AddIcon/AddIcon";
import Popup from "reactjs-popup";

export const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
`;

export const StyledAdd = styled.button`
  width: 73.46px;
  height: 73.46px;
  border-radius: 50px;
  border: none;
  background-color: #D9D9D9;
  box-shadow: 2px 2px 5px 2px rgba(0, 0, 0, 0.45);
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  
  svg{
    width: 100%;
  }
  
`;

export const StyledPopUp = styled(Popup)`
  //position: absolute;
  &-overlay{
    left: 100%;
    margin-left: 0;
    width: 40%;
    height: 100%;
    background-color: red;
  }
  
`;