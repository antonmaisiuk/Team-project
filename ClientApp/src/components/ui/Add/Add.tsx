import React, {FC, HTMLAttributes} from 'react';
import { StyledAdd, Wrapper } from './style';
import AddIcon from "../../../assets/Icons/AddIcon/AddIcon";

const AddButton: FC<HTMLAttributes<HTMLButtonElement>> = () => {

  function add_trans() {
    console.log('LOG');
  }

  return (
    <Wrapper className={'add_button'}>
      <StyledAdd onClick={add_trans}>
        <AddIcon/>
      </StyledAdd>
    </Wrapper>
  );
};

export default AddButton;
