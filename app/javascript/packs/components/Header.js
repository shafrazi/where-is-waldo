import React from "react";
import styled from "styled-components";

const HeaderDiv = styled.header`
  height: 60px;
  background-color: #31bebe;
  padding: 10px 30px 10px 30px;
  display: grid;
  grid-template-columns: 3fr 1fr;
`;

const Button = styled.button`
  width: 40%;
  background-color: #ed487f;
  height: 40px;
  border: none;
  border-radius: 13px;
  font-size: 1em;
`;

function Header(props) {
  return (
    <HeaderDiv>
      <h1>Where's Waldo?</h1>
      <Button onClick={props.getLeaderboard}>Leaderboard</Button>
    </HeaderDiv>
  );
}

export default Header;
