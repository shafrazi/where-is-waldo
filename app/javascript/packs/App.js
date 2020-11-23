import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Cell from "./components/Cell";
import PopUpBox from "./components/PopUpBox";
import Image from "images/image.jpg";

const ImageContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-gap: 0px;
  width: 1280px;
  margin: 10px auto;
  height: 805px;
  background: url(${Image}) no-repeat;
  background-size: cover;

  div:hover {
    border: 4px solid blue;
  }
`;

const WaldoImage = styled.img`
  width: 90%;
  height: 90vh;
`;

const PopUp = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  left: 668px;
  top: 400px;
  background-color: yellow;
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
    };
  }

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
      const csrfToken = document.querySelector("[name=csrf-token]").content;
      const headers = {
        "Content-type": "application/json",
        accept: "application/json",
        "X-CSRF-Token": csrfToken,
      };

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

  componentDidMount() {
    const startTime = new Date();
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    const headers = {
      "Content-type": "application/json",
      accept: "application/json",
      "X-CSRF-Token": csrfToken,
    };

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
    console.log(this.state);
    console.log(this.state.markedCells.length);
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
        <Header />
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
