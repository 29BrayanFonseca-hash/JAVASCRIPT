// 1. Selección de elementos del DOM
const previousOperandText = document.getElementById('previous-operand');
const currentOperandText = document.getElementById('current-operand');
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.getElementById('equals');
const deleteButton = document.getElementById('delete');
const clearButton = document.getElementById('clear');

// 2. Estado de la calculadora
let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// 3. Funciones de lógica
function clear() {
    currentOperand = '';
    previousOperand = '';
    operation = undefined;
}

function deleteLast() {
    currentOperand = currentOperand.toString().slice(0, -1);
}

function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    currentOperand = currentOperand.toString() + number.toString();
}

function chooseOperation(op) {
    if (currentOperand === '') return;
    if (previousOperand !== '') compute();
    operation = op;
    previousOperand = currentOperand;
    currentOperand = '';
}

function compute() {
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let result;
    switch (operation) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/': result = prev / current; break;
        default: return;
    }

    currentOperand = result;
    operation = undefined;
    previousOperand = '';
}

// 4. Actualización de la interfaz
function updateDisplay() {
    currentOperandText.innerText = currentOperand || '0';
    if (operation != null) {
        previousOperandText.innerText = `${previousOperand} ${operation}`;
    } else {
        previousOperandText.innerText = '';
    }
}

// 5. Event Listeners
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        appendNumber(btn.innerText);
        updateDisplay();
    });
});

operationButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        chooseOperation(btn.innerText);
        updateDisplay();
    });
});

equalsButton.addEventListener('click', () => {
    compute();
    updateDisplay();
});

clearButton.addEventListener('click', () => {
    clear();
    updateDisplay();
});

deleteButton.addEventListener('click', () => {
    deleteLast();
    updateDisplay();
});

// 6. Inicialización
updateDisplay();