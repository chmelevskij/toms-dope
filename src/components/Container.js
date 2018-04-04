import React from "react";
import styled from "styled-components";

const Container = styled.div`
  font-family: sans-serif;
  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ::before {
    content: "";
    background: #f6f9fc;
    position: absolute;
    left: 0;
    right: 0;
    bottom: -60vh;
    height: 100vh;
    transform: skew(0, -12deg);
  }
`;

export default Container;
