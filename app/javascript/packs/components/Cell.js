import React from "react";
import styled from "styled-components";

const CellItem = styled.div`
  width: 100%;
  height: 100%;
  color: white;
  padding-top: 10px;
  text-align: center;
  font-size: 12px;
`;

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      styles: {
        backgroundColor: "yellow",
        opacity: 0.5,
        border: "2px solid blue",
        pointerEvents: "none",
      },
    };
  }

  render() {
    return (
      <CellItem
        onClick={(event) => {
          this.props.handleClick(event, this.props.id);
        }}
        style={this.props.marked ? this.state.styles : null}
      ></CellItem>
    );
  }
}

export default Cell;
