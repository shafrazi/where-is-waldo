import React from "react";
import styled from "styled-components";

const LeaderboardDiv = styled.div`
  width: 50%;
  background-color: #31bebe;
  margin: 200px auto;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
`;

function Leaderboard(props) {
  return (
    <LeaderboardDiv>
      <h2>Leaderboard</h2>
    </LeaderboardDiv>
  );
}

export default Leaderboard;
