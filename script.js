/**
 * Calculator class that handles all calculator operations and state
 */
class Calculator {
    /**
     * Initialize calculator with empty state
     */
    constructor() {
        this.previousOperand = '';     // Stores the first number in an operation
        this.currentOperand = '0';     // Stores the current number being entered
        this.operation = undefined;     // Stores the current operation (+, -, ×, ÷)
    }

    /**
     * Resets calculator to initial state
     */
    clear() {
        this.previousOperand = '';
        this.currentOperand = '0';
        this.operation = undefined;
    }

    /**
     * Removes the last digit from current operand
     */
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
        // If all digits are deleted, show '0'
        if (this.currentOperand === '') this.currentOperand = '0';
    }

    /**
     * Adds a number or decimal point to the current operand
     * @param {string} number - The number or decimal point to append
     */
    appendNumber(number) {
        // Prevent multiple decimal points
        if (number === '.' && this.currentOperand.includes('.')) return;
        // Replace initial '0' with number unless it's a decimal point
        if (this.currentOperand === '0' && number !== '.') {
            this.currentOperand = number.toString();
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    /**
     * Handles operation button clicks
     * @param {string} operation - The operation symbol (×, ÷, +, -)
     */
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        // If there's a previous operation pending, compute it first
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    /**
     * Performs the calculation based on the stored operation
     */
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        // Don't compute if numbers are invalid
        if (isNaN(prev) || isNaN(current)) return;

        // Perform the appropriate operation
        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                // Check for division by zero
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                computation = prev / current;
                break;
            default:
                return;
        }

        // Update calculator state with result
        this.currentOperand = computation.toString();
        this.operation = undefined;
        this.previousOperand = '';
    }

    /**
     * Updates the calculator display
     */
    updateDisplay() {
        document.querySelector('.current-operand').textContent = this.currentOperand;
        if (this.operation != null) {
            // Show the previous operand and operation in the display
            document.querySelector('.previous-operand').textContent = 
                `${this.previousOperand} ${this.operation}`;
        } else {
            document.querySelector('.previous-operand').textContent = '';
        }
    }
}

// Create calculator instance
const calculator = new Calculator();

// Add event listeners for number buttons
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});

// Add event listeners for operator buttons
document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    });
});

// Add event listener for equals button
document.querySelector('.equals').addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
});

// Add event listener for clear button
document.querySelector('.clear').addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
});

// Add event listener for delete button
document.querySelector('.delete').addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
}); 