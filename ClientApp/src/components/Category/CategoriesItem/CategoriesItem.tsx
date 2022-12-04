import React, {FC} from 'react';
import {StyledTextDiv, StyledValueDiv, StyledCategoriesItem} from "./style";
import {TileType} from "../../Tile/Tile";

type CategoriesItemType = {
  name: string;
  category_sum: number;
  image_link: string;
}


const CategoriesItem:FC<CategoriesItemType> = (
  {
    name,
    category_sum = 0,
    image_link= 'link'
  }
) => {

  return (
    <StyledCategoriesItem>
      <StyledTextDiv>
        <h3 className={"category_title"}>{name}</h3>
      </StyledTextDiv>
      <StyledValueDiv>
        <p className={"category_sum"}>$ {category_sum}</p>
      </StyledValueDiv>

    </StyledCategoriesItem>
  );
};

export default CategoriesItem;
