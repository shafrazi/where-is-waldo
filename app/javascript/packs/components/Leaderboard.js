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
  overflow: scroll;
`;

const Table = styled.table`
  width: 60%;
  margin: 10px auto;

  td {
    border: solid 1px black;
  }
`;

const TableContainer = styled.div`
  width: 90%;
  height: 90%;
  margin: 10px auto;
  overflow: scroll;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 4fr 1fr;
`;

const Button = styled.button`
  background-color: #ed487f;
  width: 70%;
  border: none;
  border-radius: 5px;
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
      <Header>
        <h2>Leaderboard</h2>
        <Button onClick={props.closeLeaderBoard}>CLOSE</Button>
      </Header>
      <TableContainer>
        <Table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Time</th>
            </tr>
            {playerCells}
          </tbody>
        </Table>
      </TableContainer>
    </LeaderboardDiv>
  );
}

export default Leaderboard;
