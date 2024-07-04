let displayValue = '0';
let firstNumber = '';
let secondNumber = '';
let operator = '';

const add = (a, b) => a+b;
const sub = (a, b) => a-b;
const mul = (a, b) => a*b;
const div = (a, b) => a/b;

const calculate = (a, b, operator) => {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case "+": return add(a, b);
        case "-": return sub(a, b);
        case "*": return mul(a, b);
        case "/": return div(a, b);
        default: return "Error";
    }
}

const updateDisplay = () => {
    const displayWindow = document.querySelector(".display-window");
    displayWindow.innerText = displayValue;
}

const appendToDisplay = (value) => {
    if (!isNaN(value) || (value === '.' && ('.' in firstNumber || '.' in secondNumber))) {
        if (operator === '') {
            firstNumber += value;
            displayValue = firstNumber;
        } else {
            secondNumber += value;
            displayValue = secondNumber;
        }
    } else if (firstNumber !== '') {
        if (operator === '')
            operator = value;
        else if (secondNumber !== '') {
            displayValue = calculate(firstNumber, secondNumber, operator).toString();
            firstNumber = displayValue;
            secondNumber = '';
            operator = value;
        }
    }
    updateDisplay();
}

const clear = () => {
    [displayValue, firstNumber, secondNumber, operator] = [0, '', '', ''];
    updateDisplay();
}

const deleteLastCharacter = () => {
    if (secondNumber !== '') {
        secondNumber = secondNumber.slice(0, -1);
        displayValue = secondNumber;
    }
    else if (firstNumber !== '') {
        firstNumber = firstNumber.slice(0, -1);
        displayValue = firstNumber;
    }
    updateDisplay();
}


const buttons = [...document.querySelectorAll(".button")].filter(
    button => button.value !== '');
buttons.forEach(button => button.addEventListener(
    "click", () => appendToDisplay(button.value)
))

const equalButton = document.querySelector("#\\=");
equalButton.addEventListener("click", () => {
    if (secondNumber !== '') {
        displayValue = calculate(firstNumber, secondNumber, operator).toString();
        firstNumber = displayValue;
        [secondNumber, operator] = ['', ''];
        updateDisplay();
    }
});

const clearButton = document.querySelector(".button.clear");
clearButton.addEventListener("click", clear);

const delButton = document.querySelector(".button.del");
delButton.addEventListener("click", () => deleteLastCharacter());

