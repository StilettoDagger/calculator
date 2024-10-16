const OPERATORS = ["+", "-", "*", "/"];

// Create a calculator object with operator methods
const calculator = {
	expression: "",
	numInput: "",
	result: null,
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
	operate(firstNum, secondNum, operator) {
		switch (operator) {
			case "+":
				return this.add(firstNum, secondNum);
			case "-":
				return this.subtract(firstNum, secondNum);
			case "*":
				return this.multiply(firstNum, secondNum);

			case "/":
				return this.divide(firstNum, secondNum);

			default:
				return firstNum;
		}
	},
	evalExpression(
		type // Evaluate all expressions of a certain type
	) {
		let pattern;
		switch (type) {
			case "multDiv":
				pattern = /(\d+\.?\d*)([\*\/])(\d+\.?\d*)/;
				break;
			case "addSub":
				pattern = /(\d+\.?\d*)([\+\-])(\d+\.?\d*)/;
				break;
			default:
				return;
		}

		while (pattern.test(this.expression)) {
			const match = this.expression.match(pattern); // This returns an array where the first number, operator, and second number are on the indices 1, 2, and 3 respectively

			const expResult = this.operate(+match[1], +match[3], match[2]);

			this.expression = this.expression.replace(pattern, expResult);
		}
	},
	evaluateAllExpressions() {
		// Evaluate the entire expression.

		// First evaluate all multiplication and division expressions

		this.evalExpression("multDiv");

		// Then evaluate all addition and subtraction expressions

		this.evalExpression("addSub");

		// Store the final result.

		this.result = this.expression;
	},
};

// Create a cursor object with methods to render the cursor

const cursor = {
	element: document.querySelector(".cursor"),
	drawCursor() {
		for (let i = 0; i < 10; i++) {
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
};

window.addEventListener("keydown", (e) => {
	const queryInput = document.querySelector(".query");

	const regex = /[0-9\+\-\*\/\.]/;

	e.preventDefault();

	const keyPressed = e.key;

	if (keyPressed === "Backspace" && calculator.expression) {
		calculator.expression = calculator.expression.slice(
			0,
			calculator.expression.length - 1
		);
		calculator.numInput = calculator.numInput.slice(
			0,
			calculator.expression.length - 1
		);
		queryInput.textContent = queryInput.textContent.slice(
			0,
			queryInput.textContent.length - 1
		);
		console.table(calculator);
	}

	if (keyPressed === "Enter" || keyPressed === "=") {
		calculator.evaluateAllExpressions();
		calculator.numInput = "";
		queryInput.textContent = calculator.result;
	}

	if (regex.test(keyPressed)) {
		calculator.expression += keyPressed;

		if (OPERATORS.includes(keyPressed)) {
			calculator.numInput = "";
		}

        else {
            calculator.numInput += keyPressed;
        }

		queryInput.textContent += keyPressed;
		console.table(calculator);
	}
});

cursor.drawCursor();

cursor.blinkCursor(500);
