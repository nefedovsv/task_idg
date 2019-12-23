import { Tag } from "antd";
import React, { useState } from "react";

const { CheckableTag } = Tag;
const types = ["fire", "fighting", "psychic", "poison", "flying", "water"];

const FilterTag = props => {
  const [checked, setState] = useState(true);
  const { search, type } = props;

  const handleChange = () => {
    setState(!checked);
    checked ? search(type) : search();
  };

  const CheckableTagProps = { ...props };
  delete CheckableTagProps.search;

  return (
    <CheckableTag
      {...CheckableTagProps}
      checked={checked}
      onChange={handleChange}
    />
  );
};

export const Filter = ({ search }) => {
  return types.map((item, index) => (
    <FilterTag key={index} search={search} type={item}>
      {item}
    </FilterTag>
  ));
};
