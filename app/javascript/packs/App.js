import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Game from "./Game";
import Start from "./components/Start";
import Leaderboard from "./components/Leaderboard";
import styled from "styled-components";

const Modal = styled.div`
  display: none;
  position: fixed;
  /* Stay in place */
  z-index: 1;
  /* Sit on top */
  padding-top: 150px;
  /* Location of the box */
  left: 0;
  top: 0;
  width: 100%;
  /* Full width */
  height: 100%;
  /* Full height */
  overflow: auto;
  /* Enable scroll if needed */
  background-color: rgb(0, 0, 0);
  /* Fallback color */
  background-color: rgba(0, 0, 0, 0.4);
  /* Black w/ opacity */
`;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      players: [],
      leaderboardStyles: {},
    };
  }

  getLeaderboard = () => {
    this.setState({
      leaderboardStyles: {
        display: "block",
      },
    });
  };

  closeLeaderBoard = () => {
    this.setState({
      leaderboardStyles: {
        display: "none",
      },
    });
  };

  componentDidMount() {
    fetch("/players")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          players: response,
        });
      });
  }

  render() {
    return (
      <BrowserRouter>
        <Header getLeaderboard={this.getLeaderboard} />
        <Modal style={this.state.leaderboardStyles}>
          <Leaderboard
            players={this.state.players}
            closeLeaderBoard={this.closeLeaderBoard}
          />
        </Modal>
        <Switch>
          <Route exact path="/" component={Start} />
          <Route exact path="/game" component={Game} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
