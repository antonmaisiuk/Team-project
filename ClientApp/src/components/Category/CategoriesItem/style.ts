import styled from "styled-components";


export const StyledCategoriesItem = styled.div`
  
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  
  padding: 10px 10px 10px 0;
  border-bottom: 1px solid #C7C7C7;

  .category_title{
    margin: 0;
    font-family: 'Inter', sans-serif; 
    font-style: normal;
    font-weight: 400;
    font-size: 25px;
    line-height: 30px;
  }
  //.transaction_category{
  //  font-family: 'Inter', sans-serif;
  //  font-style: normal;
  //  font-weight: 400;
  //  font-size: 15px;
  //  line-height: 18px;
  //
  //  color: #8E8C8C;
  //}
  
  .category_sum{
    font-family: 'Inter', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 27px;
    line-height: 33px;
    color: #000000;
  }
`;

export const StyledTextDiv = styled.div`
`;

export const StyledValueDiv = styled.div`
`;