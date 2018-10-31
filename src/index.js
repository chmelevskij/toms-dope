import React from "react";
import { render } from "react-dom";
import {
  Container,
  Form,
  Title,
  PizzaList,
  Total,
  Currency,
} from "./components";
import { pizzas } from "./constants";
import withPizzaCalculator from "./hoc/withPizzaCalculator";

const FormWrapper = ({ getTotal, handleChange, currency, selectedIds, updatePizza, total }) => (
  <Form onChange={getTotal} onSubmit={getTotal}>
    <Title > Tom's Dope </Title>
    <PizzaList {...{ updatePizza, pizzas, selectedIds }} />
    <input
      onKeyUp={(e) => {
        handleChange(e);
        getTotal(e)
      }}
      type="text"
      name="discount"
      placeholder="discount code"
      autoComplete="off"
    />
    <Currency onChange={handleChange} selected={currency} />
    <Total>{total}</Total>
  </Form>
);

const PizzaForm = withPizzaCalculator(FormWrapper)

const App = () => (
  <Container>
    <PizzaForm />
  </Container>
);

render(<App />, document.getElementById("root"));
