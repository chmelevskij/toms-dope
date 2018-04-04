import React from "react";
import { map, pipe } from "lodash/fp";
import { withState, withHandlers, compose } from "recompose";
import total from "../util";

const updatePizza = ({ selectPizza }) => (name, price) => () => selectPizza(pizzas => {
    if (pizzas.findIndex(p => p.name === name) === -1)
        return [...pizzas, { name, price }]
    else
        return pizzas.filter(p => p.name !== name)
})


const getTotal = ({ setTotal, selectedPizzas, currency, discount }) => (e) => {
    e.preventDefault();
    setTotal(pipe(
        map(p => p.price),
        total(discount, currency),
    )(selectedPizzas))
}

export default compose(
    withState("total", "setTotal", "£0.00"),
    withState("currency", "setCurrency", "GBP"),
    withState("discount", "setDiscount", ""),
    withState("selectedPizzas", "selectPizza", []),
    withHandlers({
        getTotal,
        updatePizza,
        applyDiscount: ({ setDiscount }) => e => setDiscount(e.target.value),
        changeCurrency: ({ setCurrency }) => e => setCurrency(e.target.value)
  }))