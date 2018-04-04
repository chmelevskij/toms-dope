import { withProps } from "recompose";
import { currencySigns } from "../constants";

const withCurrency = withProps({
  codes: Object.entries(currencySigns)
});

export { withCurrency };
