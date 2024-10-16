let currentInput = '0';
let previousInput = '';
let operator = '';
let shouldResetDisplay = false;

const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Update the display
function updateDisplay() {
    display.textContent = currentInput;
}

// Handle number button click
function handleNumberClick(value) {
    if (shouldResetDisplay) {
        currentInput = value;
        shouldResetDisplay = false;
    } else {
        currentInput = currentInput === '0' ? value : currentInput + value;
    }
    updateDisplay();
}

// Handle operator button click
function handleOperatorClick(op) {
    if (operator) {
        calculate();
    }
    operator = op;
    previousInput = currentInput;
    shouldResetDisplay = true;
}

// Perform the calculation
function calculate() {
    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            currentInput = (prev + curr).toString();
            break;
        case '-':
            currentInput = (prev - curr).toString();
            break;
        case '*':
            currentInput = (prev * curr).toString();
            break;
        case '/':
            currentInput = curr === 0 ? 'Error' : (prev / curr).toString();
            break;
    }
    operator = '';
    shouldResetDisplay = true;
    updateDisplay();
}

// Handle clear button
function handleClear() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}

// Handle sign change
function handleSignChange() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

// Handle percentage
function handlePercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}

// Add event listeners for buttons
buttons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.classList.contains('num')) {
            handleNumberClick(button.textContent);
        } else if (button.classList.contains('operator')) {
            if (button.textContent === '=') {
                calculate();
            } else {
                handleOperatorClick(button.getAttribute('data-operator'));
            }
        } else if (button.classList.contains('clear')) {
            handleClear();
        } else if (button.classList.contains('sign')) {
            handleSignChange();
        } else if (button.classList.contains('percent')) {
            handlePercentage();
        }
    });
});