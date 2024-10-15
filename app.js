const appContainer = document.querySelector("#calculator-app");

// Create a calculator object with operator methods
const calculator = {
    query: "",
    add(a, b) {
        return a + b;
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

window.addEventListener("keydown", e => {
    const queryInput = document.querySelector(".query");

    const reg = /[0-9\+\-\*\/\.]/;

    console.log(e);
    e.preventDefault();

    if (e.key === "Backspace" && calculator.query)
    {
        calculator.query = calculator.query.slice(0, calculator.query.length - 1);
        queryInput.textContent = calculator.query;
    }
    
    if (reg.test(e.key)) {
        calculator.query += e.key;
        console.log(calculator.query);
        queryInput.textContent = calculator.query;
    }
})

cursor.drawCursor();

cursor.blinkCursor(500);