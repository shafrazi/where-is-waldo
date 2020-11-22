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

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      markedCells: [],
      displayBox: false,
      popUpStyle: {},
      cellId: "",
      character: "",
      text: "",
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
    });
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
            console.log("Matched!");
            this.setState((prevState) => {
              return {
                markedCells: prevState.markedCells.concat([prevState.cellId]),
              };
            });
          } else {
            console.log("Mismatched!");
          }
        } else {
          console.log("Mismatched!");
        }
      });
  };

  render() {
    console.log(this.state);
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
        <ImageContainer>{CellComponents}</ImageContainer>
        {this.state.displayBox ? (
          <PopUpBox
            style={this.state.popUpStyle}
            handleOptionClick={this.handleOptionClick}
          />
        ) : null}
      </div>
    );
  }
}

export default App;
