import React from "react";
import styled from "styled-components";

const CellItem = styled.div`
  border: solid 1px black;
  width: 100%;
  height: 100%;
`;

const OptionBox = styled.div`
  position: fixed;
  width: 100px;
  height: 100px;
  margin-left: 30px;
  margin-top: 20px;
  background-color: yellow;
`;

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayOptions: false,
    };
  }

  handleClick = (event) => {
    console.log(event);
    this.setState({
      displayOptions: true,
    });
  };

  render() {
    return (
      <CellItem onClick={this.handleClick}>
        {this.state.displayOptions ? <OptionBox>Hello</OptionBox> : null}
      </CellItem>
    );
  }
}

export default Cell;
