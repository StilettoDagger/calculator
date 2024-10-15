const OPERATORS = ["+", "-", "*", "/"];

// Create a calculator object with operator methods
const calculator = {
	query: "",
	firstOperand: null,
	secondOperand: null,
	result: null,
	operator: "",
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
	calculate() {
		if (this.query === "") {
			return;
        }
        else if (this.query && this.firstOperand === null)
        {
            this.firstOperand = +this.query;
            this.result = this.firstOperand;
            return;
        }

		this.secondOperand = +this.query;

		switch (this.operator) {
			case "+":
				this.result = this.add(this.firstOperand, this.secondOperand);
				break;
			case "-":
				this.result = this.subtract(this.firstOperand, this.secondOperand);
				break;
			case "*":
				this.result = this.multiply(this.firstOperand, this.secondOperand);
				break;
			case "/":
				this.result = this.divide(this.firstOperand, this.secondOperand);
				break;
			default:
                this.result = this.firstOperand;
				break;
		}

		if (this.result !== null) {
			this.firstOperand = this.result;
			this.secondOperand = null;
		}
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

	if (keyPressed === "Backspace" && calculator.query) {
		calculator.query = calculator.query.slice(0, calculator.query.length - 1);
		queryInput.textContent = queryInput.textContent.slice(
			0,
			queryInput.textContent.length - 1
		);
		console.table(calculator);
	}

	if (keyPressed === "Enter" || keyPressed === "=") {
		calculator.calculate();
		calculator.query = "";
		queryInput.textContent = calculator.result;
	}

	if (regex.test(keyPressed)) {
		if (OPERATORS.includes(keyPressed)) {
			calculator.operator = keyPressed;
            calculator.calculate();
            calculator.query = "";
		} else {
			calculator.query += keyPressed;
		}

		queryInput.textContent += keyPressed;
		console.table(calculator);
	}
});

cursor.drawCursor();

cursor.blinkCursor(500);
