import './App.css';
import CalcButton from "./Components/CalcButton/CalcButton.js";

function App() {
  function addToDisplay(sym) {
    let display = document.querySelector("#display");
    let lastChar = display.innerHTML.slice(-1);
    let lastNumber = display.innerHTML.split(/[+×÷-]/).slice(-1).toString();

    let calculateString = (txt) => {
      if (/[+×÷-]/.test(txt[txt.length-1])) return calculateString(txt.slice(0,-1));
      let operators = txt.split(/[0-9.]+/).slice(1,-1);
      let operands = txt.split(/[+×÷-]+/);
      if (txt[0] === "-") {
        operands.splice(0,1);
        operands[0] = -operands[0];
      }
      if (operands.length === 1) return operands[0];
      for (let i = 0; i < operators.length; i++) {
        if (operators[i].length === 2) {
          operators[i] = operators[i][0];
          operands[i+1] = -operands[i+1];
        }
        if (operators[i] === '×') {
          operands[i] = operands[i] * operands[i+1];
          operands.splice(i+1, 1);
          operators.splice(i, 1);
          i--;
        }
        if (operators[i] === '÷') {
          operands[i] = operands[i] / operands[i+1];
          operands.splice(i+1, 1);
          operators.splice(i, 1);
          i--;
        }
      }
      for (let i = 0; i < operators.length; i++) {
        if (operators[i] === '+') {
          operands[i] = +operands[i] + +operands[i+1];
          operands.splice(i+1, 1);
          operators.splice(i, 1);
          i--;
        }
        if (operators[i] === '-') {
          operands[i] = operands[i] - operands[i+1];
          operands.splice(i+1, 1);
          operators.splice(i, 1);
          i--;
        }
      }
      return operands[0];
    }
    switch(sym) {
      case "C":
        display.innerHTML = "0";
        break;

      case "+":
      case "×":
      case "÷":
        if ( /[+×÷-]/.test(lastChar) || lastChar === '.') {
          if (/[+×÷-]/.test(display.innerHTML.slice(-2, -1))) {
            display.innerHTML = display.innerHTML.slice(0, -2);
          } else {
            display.innerHTML = display.innerHTML.slice(0, -1);
          }
        }
        display.innerHTML += sym;
        break;

      case "-":
        if ( lastChar === "-" && /[+×÷-]/.test(display.innerHTML.slice(-2, -1)) ) {
          break;
        }
        display.innerHTML += sym;
        break;
        
      case "=":
        display.innerHTML = calculateString(display.innerHTML);
        break;

      case ".":
        if (lastNumber.includes(".")) {
          break;
        }
        if (/[0-9]/.test(display.innerHTML.at(-1))) {
          display.innerHTML += sym;
          break;
        }
        display.innerHTML += "0.";
        break;

      default:
        if (display.innerHTML.length === 1 && display.innerHTML === "0") display.innerHTML = '';
        display.innerHTML += sym;
        break;
    }
  }

  return (
    <div className="App">
      <div className='calculator'>
        <div className='solar-battery'>
          <span className='solar-battery__block'></span>
          <span className='solar-battery__block'></span>
          <span className='solar-battery__block'></span>
        </div>
        <div className='display-container'>
          <div className="display" id="display">0</div>
        </div>
        <div className='keypad'>
        <CalcButton id="seven" content="7" func={addToDisplay}></CalcButton>
        <CalcButton id="eight" content="8" func={addToDisplay}></CalcButton>
        <CalcButton id="nine" content="9" func={addToDisplay}></CalcButton>
        <CalcButton id="clear" content="C" func={addToDisplay}></CalcButton>
        <CalcButton id="four" content="4" func={addToDisplay}></CalcButton>
        <CalcButton id="five" content="5" func={addToDisplay}></CalcButton>
        <CalcButton id="six" content="6" func={addToDisplay}></CalcButton>
        <CalcButton id="divide" content="÷" func={addToDisplay}></CalcButton>
        <CalcButton id="one" content="1" func={addToDisplay}></CalcButton>
        <CalcButton id="two" content="2" func={addToDisplay}></CalcButton>
        <CalcButton id="three" content="3" func={addToDisplay}></CalcButton>
        <CalcButton id="multiply" content="×" func={addToDisplay}></CalcButton>
        <CalcButton id="zero" content="0" func={addToDisplay}></CalcButton>
        <CalcButton id="decimal" content="." func={addToDisplay}></CalcButton>
        <CalcButton id="add" content="+" func={addToDisplay}></CalcButton>
        <CalcButton id="subtract" content="-" func={addToDisplay}></CalcButton>
        <CalcButton id="equals" content="=" func={addToDisplay}></CalcButton>
        </div>
      </div>
    </div>
  );
}

export default App;
