import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Cell from "./components/Cell";
import PopUpBox from "./components/PopUpBox";
import NameModal from "./components/NameModal";
import Leaderboard from "./components/Leaderboard";
import Image from "images/image.jpg";

const ImageContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 0px;
  width: 1280px;
  margin: 30px auto;
  height: 805px;
  background: url(${Image}) no-repeat;
  background-size: cover;

  div:hover {
    border: 4px solid blue;
  }
`;

const ErrorMsg = styled.div`
  position: relative;
  width: 500px;
  height: 50px;
  left: 36%;
  top: -500px;
  background-color: white;
  padding: 15px;
  text-align: center;
  border-radius: 10px;
  color: #e5537d;
`;

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

function timeInMinutes(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time - minutes * 60;
  return `${minutes < 10 ? "0" + `${minutes}` : minutes}:${
    seconds < 10 ? "0" + `${seconds}` : seconds
  }`;
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      markedCells: [],
      displayBox: false,
      popUpStyle: {},
      cellId: "",
      character: "",
      displayError: false,
      playerId: "",
      modalStyles: {},
      playerName: "",
      playerTime: "",
      leaderboard: {},
      leaderboardStyles: {},
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  setRequestHeaders = () => {
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    const headers = {
      "Content-type": "application/json",
      accept: "application/json",
      "X-CSRF-Token": csrfToken,
    };

    return headers;
  };

  handleSubmitName = (event) => {
    event.preventDefault();
    const headers = this.setRequestHeaders();

    fetch(`/players/${this.state.playerId}`, {
      method: "PATCH",
      headers: headers,
      body: JSON.stringify({
        name: this.state.playerName,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        console.log(response);
      });
  };

  handleClick = (event, id) => {
    this.setState({
      displayBox: true,
      popUpStyle: {
        left: event.clientX,
        top: event.clientY,
      },
      cellId: id,
      character: "",
      displayError: false,
    });
  };

  gameCompleteEventHandler = () => {
    if (this.state.markedCells.length === 4) {
      const endTime = new Date();
      const headers = this.setRequestHeaders();

      fetch(`/players/${this.state.playerId}`, {
        method: "PATCH",
        headers: headers,
        body: JSON.stringify({
          end_time: endTime,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          console.log(response);
          this.setState({
            modalStyles: {
              display: "block",
            },
            playerTime: timeInMinutes(response.score),
          });
        });
    }
  };

  handleOptionClick = (event) => {
    this.setState({
      displayBox: false,
      character: event.target.innerHTML,
    });

    fetch(`/characters/${this.state.cellId}`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response) {
          if (response.name === this.state.character) {
            this.setState((prevState) => {
              return {
                markedCells: prevState.markedCells.concat([prevState.cellId]),
                displayError: false,
              };
            });
            this.gameCompleteEventHandler();
          } else {
            this.setState({
              displayError: true,
            });
          }
        } else {
          this.setState({
            displayError: true,
          });
        }
      });
  };

  getLeaderboard = () => {
    fetch("/players")
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          leaderboard: response,
          leaderboardStyles: {
            display: "block",
          },
        });
      });
  };

  componentDidMount() {
    const startTime = new Date();
    const headers = this.setRequestHeaders();

    fetch("/players", {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        name: "anonymous",
        start_time: startTime,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        this.setState({
          playerId: response.id,
        });
      });
  }

  render() {
    console.log(this.state.leaderboard);
    const CellComponents = [];
    for (let i = 0; i < 150; i++) {
      if (this.state.markedCells.includes(i)) {
        CellComponents.push(
          <Cell key={i} id={i} handleClick={this.handleClick} marked={true} />
        );
      } else {
        CellComponents.push(
          <Cell key={i} id={i} handleClick={this.handleClick} marked={false} />
        );
      }
    }
    return (
      <div>
        <Header getLeaderboard={this.getLeaderboard} />
        {this.state.displayError ? (
          <ErrorMsg>
            {this.state.character} is not here. Look hard, they might be
            somewhere else!
          </ErrorMsg>
        ) : null}
        <ImageContainer>{CellComponents}</ImageContainer>
        {this.state.displayBox ? (
          <PopUpBox
            style={this.state.popUpStyle}
            handleOptionClick={this.handleOptionClick}
          />
        ) : null}

        <Modal style={this.state.modalStyles}>
          <NameModal
            handleChange={this.handleChange}
            handleSubmitName={this.handleSubmitName}
            playerName={this.state.playerName}
            playerTime={this.state.playerTime}
          />
        </Modal>
        <Modal style={this.state.leaderboardStyles}>
          <Leaderboard players={this.state.leaderboard} />
        </Modal>
        {this.state.displayError ? (
          <ErrorMsg>
            {this.state.character} is not here. Look hard, they might be
            somewhere else!
          </ErrorMsg>
        ) : null}
      </div>
    );
  }
}

export default App;
