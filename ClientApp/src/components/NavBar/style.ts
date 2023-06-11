import styled from "styled-components";

export const StyledNavBar = styled.nav`
  width: 100%;
  height: 120px;

  font-family: 'Inter', sans-serif;
  color: #fff;
  h1{
    font-size: 1.5em;
    color: #4ef04e;
    margin: 0;
    //padding: 5px;
  }
  
  display: flex;
  justify-content: space-between;
  padding: 15px 25px;
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
