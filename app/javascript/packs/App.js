import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Cell from "./components/Cell";
import PopUpBox from "./components/PopUpBox";
import Image from "images/image.jpg";

const ImageContainer = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: repeat(20, 1fr);
  grid-template-rows: repeat(20, 1fr);
  grid-gap: 0px;
  width: 1280px;
  margin: 10px auto;
  height: 805px;
  background: url(${Image}) no-repeat;
  background-size: cover;
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
      displayBox: false,
      popUpStyle: {},
      cellId: "",
      character: "",
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
  };

  render() {
    console.log(this.state);
    const CellComponents = [];
    for (let i = 0; i < 400; i++) {
      CellComponents.push(
        <Cell key={i} id={i} handleClick={this.handleClick} />
      );
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
