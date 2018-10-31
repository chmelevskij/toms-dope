import React from "react";
import { map, pipe, pick } from "lodash/fp";
import { compose, withStateHandlers, withProps, mapProps } from "recompose";
import total from "../util";

export default compose(withStateHandlers(
    {
        total: "£0.00",
        currency: "GBP",
        discount: "",
        selectedPizzas: [],
    },
    {
        getTotal: ({ selectedPizzas, currency, discount }) => (e) => {
            e.preventDefault();
            return ({
                total: pipe(
                    map(p => p.price),
                    total(discount, currency),
                )(selectedPizzas)
            })
        },
        handleChange: () => ({ target }) => ({ [target.name]: target.value }),
        updatePizza: ({ selectedPizzas }) => (name, price) => {
            if (selectedPizzas.findIndex(p => p.name === name) === -1)
                return ({ selectedPizzas: [...selectedPizzas, { name, price }] });
            else
                return ({ selectedPizzas: selectedPizzas.filter(p => p.name !== name) });
        },
    }
    ),
    withProps(({ selectedPizzas }) => ({ selectedIds: map('name', selectedPizzas) })),
    mapProps(pick(['getTotal', 'handleChange', 'currency', 'selectedIds', 'updatePizza', 'total'])),
)