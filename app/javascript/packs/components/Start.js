import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 50%;
  background-color: #31bebe;
  margin: 200px auto;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
`;

function Start() {
  return (
    <Container>
      <Link to="/game">
        <h1>Start Game</h1>
      </Link>
    </Container>
  );
}

export default Start;
