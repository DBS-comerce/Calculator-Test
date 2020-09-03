import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

const Container = styled.div`
  width: 310px;
  margin: auto;
  background: #aaaaaa;
  height: 435px;
  margin-top: 40px;
  display: flex;
  flex-direction: column;
`;

const MainInput = styled.input`
  width: 280px;
  margin: auto;
  background: #fff;
  height: 50px;
  display: flex;
  margin-top: 10px;
  border: none;
`;

const NumbersButtonContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  margin: auto;
  justify-content: space-between;
`;

const OperatorContainer = styled.div`
  margin-top: 10px;
  width: 290px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap-reverse;
  margin: auto;
  justify-content: space-between;
`;

const Button = styled.div`
  width: 90px;
  margin: auto;
  background: #eeeeee;
  height: 50px;
  margin-top: 10px;
  display: flex;
  cursor: pointer;
  border-radius: 5px;
  padding: 1px;
  &:first-child {
    width: 290px;
  }
`;

const OperatorButton = styled.div`
  width: 30px;
  background: #e4e4e4;
  height: 40px;
  margin-top: 10px;
  border-radius: 5px;
  padding: 1px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:last-child {
    background: #d37c7c;
  }
`;

const arrNumbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

function App() {
  const [currentNumber, setCurrentNumber] = useState("");
  const [previousNumber, setPreviousNumber] = useState(0);
  const [currentOperator, setCurrentOperator] = useState("");
  const [calculated, setCalculated] = useState(false);

  const numberHandler = (key) => {
    if (calculated) {
      setCurrentNumber("");
      setPreviousNumber(0);
      setCurrentNumber(key.toString());
    } else {
      const addNumber = isNaN(currentNumber) ? "" : currentNumber;
      setCurrentNumber(addNumber + key);
    }

    setCalculated(false);
  };

  const setOperator = (operator) => {
    if (currentOperator) {
      makeCalculate(currentOperator);
    } else {
      setPreviousNumber(parseFloat(currentNumber));
      setCurrentNumber("");
    }

    setCurrentOperator(operator);
  };
  const equal = () => {
    makeCalculate(currentOperator);
    // setCurrentNumber(previousNumber);
  };

  const clear = () => {
    setCurrentNumber("");
    setPreviousNumber(0);
    setCurrentOperator("");
  };
  const makeCalculate = (operator) => {
    setCalculated(true);
    switch (operator) {
      case "+":
        setCurrentNumber(previousNumber + parseFloat(currentNumber));
        setCurrentOperator("");

        break;
      case "-":
        setCurrentNumber(previousNumber - parseFloat(currentNumber));
        setCurrentOperator("");
        break;
      case "*":
        setCurrentNumber(previousNumber * parseFloat(currentNumber));
        setCurrentOperator("");
        break;
      case "/":
        setCurrentNumber(previousNumber / parseFloat(currentNumber));
        setCurrentOperator("");
        break;
    }
  };
  return (
    <div>
      <Container className="App">
        <MainInput value={currentNumber}></MainInput>
        <OperatorContainer>
          <OperatorButton onClick={() => setOperator("+")}>
            {"+"}
          </OperatorButton>
          <OperatorButton onClick={() => setOperator("-")}>
            {"-"}
          </OperatorButton>
          <OperatorButton onClick={() => setOperator("*")}>
            {"*"}
          </OperatorButton>
          <OperatorButton onClick={() => setOperator("/")}>
            {"/"}
          </OperatorButton>
          <OperatorButton onClick={() => equal()}>{"="}</OperatorButton>
          <OperatorButton className={"clear"} onClick={() => clear()}>
            clr
          </OperatorButton>
        </OperatorContainer>
        <NumbersButtonContainer>
          {arrNumbers.map((key, i) => (
            <Button key={key} onClick={() => numberHandler(key)}>
              {key}
            </Button>
          ))}
        </NumbersButtonContainer>
      </Container>
    </div>
  );
}

export default App;
