import React from "react";
import styled from "styled-components";

const Form = styled.div`
  width: 50%;
  background-color: #31bebe;
  margin: 200px auto;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: 1fr;
`;

const FormField = styled.div`
  width: 60%;
  margin: 10px auto;
  text-align: center;

  input {
    height: 30px;
    font-size: 20px;
  }
`;

const Button = styled.button`
  width: 17%;
  margin: auto;
  font-size: 18px;
  border-radius: 8px;
  border: none;
  color: white;
  background-color: #ed487f;
`;

function NameModal(props) {
  return (
    <Form>
      <h3>
        {`Congratulations! You found all the characters in ${props.playerTime} minutes. Submit your name to the
        Leaderboard.`}
      </h3>
      <FormField>
        <input
          type="text"
          placeholder="Enter your name"
          name="playerName"
          onChange={props.handleChange}
          value={props.playerName}
        />
      </FormField>
      <Button onClick={props.handleSubmitName}>Submit</Button>
    </Form>
  );
}

export default NameModal;
