import styled from "styled-components";


export const StyledInvestmentItem = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;

  padding: 10px 10px 10px 0;

  .transaction_title{
    margin: 0;
    font-family: 'Inter', sans-serif; 
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 30px;
  }
  .transaction_category{
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;

    color: #8E8C8C;
  }
  
  .transaction_value{
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 27px;
    line-height: 33px;
    color: #000000;
  }
`;

export const StyledTextDiv = styled.div`
  p{
    padding: 0;
    margin: 0;
  }
  
  //.investment_title{
  //  font-weight: bold;
  //}
`;

export const StyledValueDiv = styled.div`
  p{
    padding: 0;
    margin: 0;
  }
  .investment_value{
    font-size: 1.5em;
    //font-weight: bold;
  }
`;
