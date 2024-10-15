const appContainer = document.querySelector("#calculator-app");

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

// Create a cursor object with methods to render the cursor

const cursor = {
    element: document.querySelector(".cursor"),
    drawCursor() {
        for (let i = 0; i < 12; i++)
        {
           const pixel = document.createElement("div");
           pixel.classList.add("pixel");
           this.element.appendChild(pixel);
        }
    },
    blinkCursor(delay) {
        setInterval(() => {
            this.element.classList.toggle("off");
        }, delay);
    },
}

cursor.drawCursor();

cursor.blinkCursor(500);