import React from "react";
import { map, pipe, pick } from "lodash/fp";
import { compose, withStateHandlers, withProps, mapProps, withHandlers } from "recompose";
import total from "../util";

const getTotal =  ({ selectedPizzas, currency, discount }) => (event) => ({
    total: pipe(map('price'), total(discount, currency))(selectedPizzas)
  });

const updatePizza = ({ selectedPizzas }) => (event) => {
  const { target: { name, value: price } } = event;
  if (selectedPizzas.findIndex(p => p.name === name) === -1)
    return ({ selectedPizzas: [...selectedPizzas, { name, price }] });
  else
    return ({ selectedPizzas: selectedPizzas.filter(p => p.name !== name) });
}

const defaultState = {
    total: "£0.00",
    currency: "GBP",
    discount: "",
    selectedPizzas: [],
  };
export default compose(
  withStateHandlers(
    defaultState,
    {
      getTotal,
      updatePizza,
      handleChange: () => ({ target }) => ({ [target.name]: target.value }),
    }),
  withProps(
    ({ selectedPizzas }) => ({ selectedIds: map('name', selectedPizzas) })
  ),
  withHandlers({
    handleSubmit: ({ getTotal }) => event => {
      event.preventDefault();
      getTotal();
    },
    updateDiscount: ({ handleChange, getTotal }) => (e) => {
      handleChange(e);
      getTotal();
    },
  }),
  mapProps(
    pick([
      'getTotal', 'handleChange', 'currency', 'selectedIds',
      'updatePizza', 'total', 'handleSubmit', 'updateDiscount',
    ]),
  ),
)