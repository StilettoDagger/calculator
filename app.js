// Create a calculator object with operator methods

const calculator = {
    add(a, b) {
        return a +b;
    },
    subtract(a, b) {
        return a - b;
    },
    multiply(a, b) {
        return a * b;
    },
    divide(a, b) {
        return a / b;
    },
}

const appContainer = document.querySelector("#calculator-app");

const cursor = document.querySelector(".cursor");

