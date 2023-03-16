import React, {ButtonHTMLAttributes, Dispatch, FC, HTMLAttributes, SetStateAction} from 'react';
import Popup from 'reactjs-popup';
import { StyledAdd, Wrapper, StyledPopUp } from './style';
import AddIcon from "../../../assets/Icons/AddIcon/AddIcon";
import PopUp from "../../PopUp/PopUp";

interface AddButtonInterface {
  // active: boolean,
  setActive: Dispatch<SetStateAction<boolean>>,
}

const AddButton: FC<AddButtonInterface & HTMLAttributes<HTMLButtonElement>> = ({
  setActive
}) => {

  return (
    <Wrapper className={'add_button'}>
      <StyledAdd onClick={() => {
        setActive(true);
      }} >
        <AddIcon/>
        {/*<StyledPopUp trigger={} position="top center" disabled={false} closeOnDocumentClick={false} arrow={false}>*/}
        {/*  <div>Ahaha</div>*/}
        {/*</StyledPopUp>*/}

      </StyledAdd>
    </Wrapper>
  );
};

export default AddButton;
