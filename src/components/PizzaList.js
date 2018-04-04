import React from "react";
import styled from "styled-components";

const Pizza = ({ id, name, price, updatePizza }) => (
  <label htmlFor={`pizza${id}`}>
    <input 
      id={`pizza${id}`}
      name={name}
      type="checkbox"
      value={price}
      onChange={updatePizza(name, price)}
     />
    £{price} - {name}
  </label>
);

const List = styled.div`
  grid-column: 1 / -1;
  display: grid;
`;

const PizzaList = ({ pizzas, updatePizza }) => (
  <List>
  {pizzas.map((p, i) =>
    <Pizza {...{ ...p, updatePizza, id: i }} key={i} />
  )}
  </List>
);

export default PizzaList;
