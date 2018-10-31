import React from "react";
import { includes } from 'lodash/fp';
import styled from "styled-components";

const Pizza = ({ id, name, price, updatePizza, checked }) => (
  <label htmlFor={`pizza${id}`}>
    <input
      id={`pizza${id}`}
      name={name}
      type="checkbox"
      value={price}
      checked={checked}
      onChange={updatePizza}
     />
    £{price} - {name}
  </label>
);

const List = styled.div`
  grid-column: 1 / -1;
  display: grid;
`;

const PizzaList = ({ pizzas, updatePizza, selectedIds }) => (
  <List>
  {pizzas.map((p, i) =>
    <Pizza
      {...{ ...p, updatePizza, id: i }}
      checked={includes(p.name, selectedIds)}
      key={i}
    />
  )}
  </List>
);

export default PizzaList;
