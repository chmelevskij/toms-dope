import React from "react";
import { withCurrency } from "../hoc";

export const Currency = ({ codes, selected, onChange}) => (
  <select onChange={onChange} id="currency" defaultValue={selected} name="currency">
    {codes.map(([code, sign]) => (
      <option value={code} key={code}>
        {sign}
      </option>
    ))}
  </select>
);

export default withCurrency(Currency);
