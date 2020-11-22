import React from "react";
import styled from "styled-components";
import Header from "./components/Header";
import Cell from "./components/Cell";
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

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleClick = (event, id) => {
    console.log(id);
  };

  render() {
    const CellComponents = [];
    for (let i = 0; i < 400; i++) {
      CellComponents.push(<Cell key={i} id={i} />);
    }
    return (
      <div>
        <Header />
        <ImageContainer>{CellComponents}</ImageContainer>
      </div>
    );
  }
}

export default App;
