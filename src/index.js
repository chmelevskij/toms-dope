import React from "react";
import { render } from "react-dom";
import {
  Container,
  Form,
  Title,
  PizzaList,
  Total,
  Currency,
  Button,
} from "./components";
import { pizzas } from "./constants";
import withPizzaCalculator from "./hoc/withPizzaCalculator";

const FormWrapper = ({ getTotal, currency, discount, selectedPizzas, updatePizza, total, changeCurrency, applyDiscount }) => (
  <Form >
    <Title > Tom's Dope </Title>
    <PizzaList {...{ updatePizza, pizzas }} />
    <input onKeyUp={applyDiscount} type="text" placeholder="discount code" />
    <Currency onChange={changeCurrency} selected={currency} />
    <Total>{total}</Total>
    <Button onClick={getTotal}>Calculate</Button>
  </Form>
);

const PizzaForm = withPizzaCalculator(FormWrapper)

const App = () => (
  <Container>
    <PizzaForm />
  </Container>
);

render(<App />, document.getElementById("root"));
