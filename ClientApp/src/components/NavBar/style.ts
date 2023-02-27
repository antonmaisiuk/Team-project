import styled from "styled-components";

export const StyledNavBar = styled.nav`
  width: 100%;
  height: 120px;
  
  display: flex;
  justify-content: center;
  padding: 15px;
  align-items: center;
  background: #1B1464;
  border-radius: 45px;
  button{
    margin-right: 15px;
    &:last-child{
      margin-right: 0;
    }
  }
`;
