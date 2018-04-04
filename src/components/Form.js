import React from "react";
import styled from "styled-components";

const Form = styled.form`
  display: grid;
  color: #616161;
  grid-gap: 15px;
  grid-template-columns: 1fr 1fr;
  flex-direction: column;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 15px 35px rgba(50, 50, 93, 0.1), 0 5px 15px rgba(0, 0, 0, 0.07);
  z-index: 1;
  background: white;
`;

export default Form;
