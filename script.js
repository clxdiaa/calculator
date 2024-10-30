function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) {
        return "Error: Division by 0!";
    }
    return a / b;
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);

    let result;
    switch (operator) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        default:
            return null;
    }
    return Math.round(result * 100000000) / 100000000; // Return with precision up to 8 decimal places.
}

let displayValue = '0'; // What is shown on the display
let firstOperand = null; // First number
let secondOperand = null; // Second number
let currentOperator = null; // Operator
let resultDisplayed = false; // Flag to track if result was displayed

const display = document.getElementById('display');
const digits = document.querySelectorAll('.digit');
const operators = document.querySelectorAll('.operator');
const equalsButton = document.getElementById('equals');
const decimalButton = document.querySelector('.decimal');

function updateDisplay() {
    display.textContent = displayValue;
}

digits.forEach(button => {
    button.addEventListener('click', () => {
        // Reset the display value if the result was displayed
        if (resultDisplayed) {
            displayValue = button.textContent;  // Start fresh with the new digit
            resultDisplayed = false; // Reset flag
        } else {
            displayValue === '0' ? displayValue = button.textContent : displayValue += button.textContent; // If display is 0, replace it
        }
        updateDisplay();
    });
});

operators.forEach(button => {
    button.addEventListener('click', () => {
        if (firstOperand === null) {
            firstOperand = displayValue; // Save the first operand
        } else if (currentOperator) {
            secondOperand = displayValue; // Save the second operand
            const result = operate(currentOperator, firstOperand, secondOperand);
            displayValue = String(result); // Display the result
            firstOperand = result; // Store result for further calculations
        }
        currentOperator = button.textContent; // Set the current operator
        displayValue = '0'; // Reset display for next number input
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    if (currentOperator !== null && firstOperand !== null) {
        secondOperand = displayValue; // Save the second operand
        const result = operate(currentOperator, firstOperand, secondOperand);
        displayValue = String(result); // Display the result
        firstOperand = null; // Clear the first operand
        currentOperator = null; // Reset the operator
        resultDisplayed = true; // Set flag when result is shown
        updateDisplay();
    }
});

decimalButton.addEventListener('click', () => {
    if (!displayValue.includes('.')) {
        displayValue += '.'; // Add decimal point if it doesn't exist
    }
    updateDisplay();
});

