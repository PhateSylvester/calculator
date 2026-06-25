document.addEventListener('DOMContentLoaded', () => {

    // calculator state
    let currentInput = '0';
    let previousInput = '';
    let operation = null;
    let shouldResetScreen = false;

    // DOM manipulation
    const display = document.getElementById('display');
    const historyDisplay = document.getElementById('history');
    const clearButton = document.querySelector('.cbutton');
    const deleteButton = document.querySelector('.delbutton');
    const equalsButton = document.querySelector('.bequ');
    const numberButtons = document.querySelectorAll('.number');
    const operatorButtons = document.querySelectorAll('.solve');

    // calculator screen
    const updateDisplay = () => {
        display.textContent = currentInput;
        historyDisplay.textContent = previousInput +
            (operation ? `${operation}` : "");
        historyDisplay.textContent = previousInput;
        historyDisplay.textContent = previousInput + (operation ? ` ${operation}` : "");
    }

    // reset calculator state
    const resetCalculator = () => {
        currentInput = '0';
        previousInput = '';
        operation = null;
        shouldResetScreen = false;
        updateDisplay();
    }

    // append numbers
    const appendNumber = (number) => {
        if (currentInput === '0' || shouldResetScreen) {
            currentInput = number;
            shouldResetScreen = false;
        } else {
            currentInput += number;
        }
        updateDisplay();
    }

    // Choose operation
    const chooseOperation = (operate) => {
        if (currentInput === '') return;

        if (previousInput !== '') {
            calculate();
        }

        operation = operate;
        previousInput = `${currentInput} ${operate}`;
        previousInput = `${currentInput}`;
        shouldResetScreen = true;
        updateDisplay();
    }

    // Calculate result
    const calculate = () => {
        if (operation === null || shouldResetScreen) return;

        let computation;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current))
            return;

        switch (operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case 'x':
                computation = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert("Can't divide by 0");
                    return;
                }
                else {
                    computation = prev / current;
                }
                break;
            default:
                return;
        }
        currentInput = computation.toString();
        operation = null;
        previousInput = '';
        updateDisplay();
    }

    // delete last char
    const deleteNumber = () => {
        if (currentInput.length === 1) {
            currentInput = '0';
        } else {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    }

    // Event listeners
    clearButton.addEventListener('click', resetCalculator);
    deleteButton.addEventListener('click', deleteNumber);
    equalsButton.addEventListener('click', calculate);

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            appendNumber(button.textContent);
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            chooseOperation(button.textContent);
        });
    });

    // Initialize display
    updateDisplay();
});
