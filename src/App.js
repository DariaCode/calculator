import React from 'react';
import './calculator.css';

/* Main Application */
class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      calculated: false,
      formula: "",
      currentValue: "0",
      previousValue: "0"
     };
     this.allClear = this.allClear.bind(this);
     this.mathOperators = this.mathOperators.bind(this);
     this.numbers = this.numbers.bind(this);
     this.decimal = this.decimal.bind(this);
     this.equals = this.equals.bind(this)

  }
/* function for AC button */
  allClear() {
    this.setState({
      calculated: false,
      formula: "",
      currentValue: "0",
      previousValue: "0"
    });
  }
/* function for ÷,x,-,+ buttons */
  mathOperators(value) {
    const val = value.target.value;
    this.setState({
      calculated: false,
      currentValue : val
    });
    /* After we have done the calculation and have the result (2+3=5) */
    if (this.state.calculated) {
      this.setState({
        formula: this.state.previousValue + val
      });
     /* if the formula doesn't end with operator */ 
    } else if (!/[x/+-]$/.test(this.state.formula)) {
      this.setState({
        formula: this.state.formula + val,
        previousValue: this.state.formula
      }); 
       /* if the formula doesn't end with operator "-" */ 
    } else if (!/[x/+]-$/.test(this.state.formula)) {
      this.setState({
        formula: (/[x/+]-$/.test(this.state.formula + val) ? this.state.formula : this.state.previousValue)+ val
      });
    } else if ( val !== "-") {
      this.setState({
        formula: this.state.previousValue + val
      });
    }
  };
/* function for numbers' buttons */
numbers(number) {
  const num = number.target.value;
  this.setState({
    calculated: false
  });
  /* After we have done the calculation and have the result (2+3=5) */
  if(this.state.calculated){
    this.setState({
      formula: num !== 0 ? num : "",
      currentValue: num
    })
  } else if (this.state.currentValue.length <= 20){
    this.setState({
      /* When inputting numbers, the calculator doesn't allow a number to begin with multiple zeros(00 or 3+00) */
      formula: this.state.currentValue === "0" && num === "0" ? this.state.formula === "" ? num : this.state.formula : /([^.0-9]0|^0)$/.test(this.state.formula) ? this.state.formula.slice(0,-1) + num : this.state.formula + num ,
      /* in case the current value is zero or operator, it's replaced by the number */
      currentValue: this.state.currentValue === "0" || /[x/+-]/.test(this.state.currentValue) ? num : this.state.currentValue + num
    });
  }
}
/* function for decimal point buttons */
decimal(){
  if(this.state.calculated){
    this.setState({
      calculated: false,
      formula: "0.",
      currentValue: "0."
    });
    /* two decimal points in one number don't be accepted */
  } else if (!this.state.currentValue.includes(".")) {
    this.setState({
      calculated: false
    });
    if(/[x/+-]$/.test(this.state.formula) || (this.state.currentValue === "0" && this.state.formula === "")){
      this.setState({
        formula: this.state.formula + "0.",
        currentValue: "0."
      });
    } else {
      this.setState({
        formula: this.state.formula + ".",
        currentValue: this.state.formula.match(/(-?\d+\.?\d*)$/)[0] + "."
      })
    }
  }
}
/* function for equal sign buttons */
equals(){
  let currentFormula = this.state.formula;
  while(/[x/+-]$/.test(currentFormula)) {
    currentFormula = currentFormula.slice(0,-1);
  } 
  currentFormula = currentFormula.replace(/x/g, "*");
  let result = Math.round(1000000000000 * eval(currentFormula))/1000000000000;
  this.setState({
    calculated: true,
    formula: currentFormula + "=" + result,
    currentValue: result.toString(),
    previousValue: result
  })
}


  render() { 
    return ( 
      <div className = "calculator">
        <Display 
        formula = {this.state.formula}
        currentValue = {this.state.currentValue}
        />
        <Buttons 
        allClear = {this.allClear}
        mathOperators = {this.mathOperators}
        numbers = {this.numbers} 
        decimal = {this.decimal}
        equals = {this.equals}
        />
      </div>
     );
  }

};
 

const Buttons = props => {
    return ( 
      <div className="buttons">
        <button id="clear" onClick={props.allClear} value="AC">AC</button>
        <button id="divide" onClick={props.mathOperators} value="/">÷</button>
        <button id="seven" onClick={props.numbers} value = "7">7</button>
        <button id="eight" onClick={props.numbers} value = "8">8</button>
        <button id="nine" onClick={props.numbers} value = "9">9</button>
        <button id="multiply" onClick={props.mathOperators} value="x">X</button>
        <button id="four" onClick={props.numbers} value = "4">4</button>
        <button id="five" onClick={props.numbers} value = "5">5</button>
        <button id="six" onClick={props.numbers} value = "6">6</button>
        <button id="subtract" onClick={props.mathOperators} value="-">-</button>
        <button id="one" onClick={props.numbers} value = "1">1</button>
        <button id="two" onClick={props.numbers} value = "2">2</button>
        <button id="three" onClick={props.numbers} value = "3">3</button>
        <button id="add" onClick={props.mathOperators} value="+">+</button>
        <button id="zero" onClick={props.numbers} value = "0">0</button>
        <button id="decimal" onClick={props.decimal}>.</button>
        <button id="equals" onClick={props.equals}>=</button>
      </div>
     );
  };
 
  const Display = props => {
    return (
      <div id="display">
        <div id="formula">{props.formula}</div>
        <div id="currentValue">{props.currentValue}</div>
      </div>
    )
  }

  export default Calculator;
