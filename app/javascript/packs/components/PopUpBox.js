import React from "react";
import styled from "styled-components";

const PopUp = styled.div`
  position: fixed;
  width: 120px;
  height: 120px;
  background-color: yellow;
  border-radius: 10px;
  padding: 10px;
  text-align: center;

  div:hover {
    background-color: #f17547;
    cursor: pointer;
  }
`;

const OptionDiv = styled.div`
  margin-top: 5px;
`;

function PopUpBox(props) {
  return (
    <PopUp style={props.style}>
      <OptionDiv onClick={props.handleOptionClick}>Waldo</OptionDiv>
      <OptionDiv onClick={props.handleOptionClick}>Wilma</OptionDiv>
      <OptionDiv onClick={props.handleOptionClick}>Odlaw</OptionDiv>
      <OptionDiv onClick={props.handleOptionClick}>Whitebeard</OptionDiv>
    </PopUp>
  );
}

export default PopUpBox;
