import React from "react";
import styled from "styled-components";

const CellItem = styled.div`
  border: solid 1px black;
  width: 100%;
  height: 100%;
`;

class Cell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <CellItem
        onClick={(event) => {
          this.props.handleClick(event, this.props.id);
        }}
      ></CellItem>
    );
  }
}

export default Cell;
