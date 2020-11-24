import React from "react";
import styled from "styled-components";

const LeaderboardDiv = styled.div`
  width: 50%;
  height: 60%;
  background-color: #31bebe;
  margin: 200px auto;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
  overflow: scroll;
`;

const Table = styled.table`
  width: 60%;
  margin: 10px auto;

  td {
    border: solid 1px black;
  }
`;

function timeInMinutes(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes < 10 ? "0" + `${minutes}` : minutes}:${
    seconds < 10 ? "0" + `${seconds}` : seconds
  }`;
}

function Leaderboard(props) {
  let playerCells = null;
  if (props.players.length > 0) {
    playerCells = props.players.map((player) => {
      if (player.score) {
        return (
          <tr key={player.id}>
            <td>{player.name}</td>
            <td>{timeInMinutes(player.score)}</td>
          </tr>
        );
      }
    });
  }
  return (
    <LeaderboardDiv>
      <h2>Leaderboard</h2>
      <Table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Time</th>
          </tr>
          {playerCells}
        </tbody>
      </Table>
    </LeaderboardDiv>
  );
}

export default Leaderboard;
