import { map, sum, pipe } from "lodash/fp";
import { discounts, currencies, currencySigns } from "./constants";

const calcPrice = priceMap => code => price => priceMap[code]
  ? price * priceMap[code]
  : price
const applyDiscount = calcPrice(discounts)
const changeCurrency = calcPrice(currencies)

const format = currency => price => currencySigns[currency] + price
const toFixed2 = n => n.toFixed(2)
const peek = v => console.log(v) || v

const total = (discount, currency) => pipe(map(Number),
                                           sum,
                                           applyDiscount(discount),
                                           changeCurrency(currency),
                                           toFixed2,
                                           format(currency))

  export default total;