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
	// Evaluate all expressions of a certain type
	evalExpression(type, expression) {
		const bracketPattern = /\(([^()]*)\)/;

		// Check and evaluate bracket expression
		while (bracketPattern.test(expression))
		{
			let bracketExp = expression.match(bracketPattern)[1];

			bracketExp = this.evalExpression("multDiv", bracketExp);
			bracketExp = this.evalExpression("addSub", bracketExp);

			expression = expression.replace(bracketPattern, bracketExp);
		}
		
		let pattern;
		switch (type) {
			case "multDiv":
				pattern = /(\-?\d*\.?\d*)([\*\/])(\-?\d*\.?\d*)/;
				break;
			case "addSub":
				pattern = /(\-?\d*\.?\d*)([\+\-])(\-?\d*\.?\d*)/;
				break;
			default:
				return;
		}


		while (pattern.test(expression)) {
			const match = expression.match(pattern); // This returns an array where the first number, operator, and second number are on the indices 1, 2, and 3 respectively

			const expResult = this.operate(+match[1], +match[3], match[2]);

			expression = expression.replace(pattern, expResult);
		}

		return expression;
	},
	calculate() {
		// Evaluate the entire expression.

		// First evaluate all multiplication and division expressions

		this.expression = this.evalExpression("multDiv", this.expression);

		// Then evaluate all addition and subtraction expressions

		this.expression = this.evalExpression("addSub", this.expression);

		// Store the final result.

		this.result = this.expression;
		this.numInput = this.expression;
	},
	clearCalculator() {
		this.expression = "";
		this.numInput = "";
	}
};

// Create a cursor object with methods to render the cursor

const cursor = {
	element: document.querySelector(".cursor"),
	blinkId: undefined,
	drawCursor() {
		for (let i = 0; i < 10; i++) {
			const pixel = document.createElement("div");
			pixel.classList.add("pixel");
			this.element.appendChild(pixel);
		}
	},
	blinkCursor(delay) {
		this.blinkId = setInterval(() => {
			this.element.classList.toggle("off");
		}, delay);
	},
	pauseBlinking() {
		clearInterval(this.blinkId);
		this.element.classList.add("off");
	}
};

function handleKeyPress(e) {
    const queryInput = document.querySelector(".query");

	const regex = /^[0-9\+\-\*\/\.\(\)]$/;

	const keyPressed = e.type === "keydown" ? e.key : e.target.value;
    
    // Disable overrides for F keys.
	if (!/^F[0-9]+$/.test(keyPressed)) {
		e.preventDefault();
	}

    if (keyPressed === "Escape" || keyPressed === "clear")
    {
        calculator.clearCalculator();
        queryInput.textContent = "";
    }

	if ((keyPressed === "Backspace" || keyPressed === "delete") && calculator.expression) {
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
	}

	if (keyPressed === "Enter" || keyPressed === "=") {
		calculator.calculate();
		if (calculator.result.includes("Infinity"))
		{
			queryInput.textContent = "How dare you divide by zero...";
			queryInput.classList.add("error");
			cursor.pauseBlinking();

			setTimeout(() => {
				calculator.clearCalculator();
				queryInput.textContent = "";
				queryInput.classList.remove("error");
				cursor.blinkCursor(500);
			}, 2000);
		}
		else {
			queryInput.textContent = calculator.result;
		}
	}

	if (regex.test(keyPressed)) {
		if (keyPressed === "." && calculator.numInput.includes(".")) {
			return;
		}

		calculator.expression += keyPressed;

		if (OPERATORS.includes(keyPressed)) {
			calculator.numInput = "";
		} else {
			calculator.numInput += keyPressed;
		}

		queryInput.textContent += keyPressed;
	}
}

window.addEventListener("keydown", handleKeyPress);

// Add event listeners to all buttons

const buttons = document.querySelectorAll("button");

for (const button of buttons) {
    button.addEventListener("click", handleKeyPress);
    button.addEventListener("mousedown", e => {
        e.target.classList.add("clicked");
    });
    button.addEventListener("mouseup", e => {
        e.target.classList.remove("clicked")
    })
}

window.addEventListener("mouseup", e => {
    for (const button of buttons) {
        button.classList.remove("clicked");
    }
})

// Event listener for when the document contents are fully loaded.
document.addEventListener("DOMContentLoaded", e => {
    
    // Add tutorial overlay functionality
    const helpButton = document.querySelector(".help");
    
    const overlay = document.querySelector("#overlay");
    
    const instructions = document.querySelector("#instructions");
    
    const closeInstructionsButton = instructions.querySelector(".instructions-header .close-button");
    
    overlay.addEventListener("transitionend", e => {
    
        if (e.target.classList.contains("show")) instructions.classList.toggle("show");
    
    })
    
    overlay.addEventListener("click", e => {
        instructions.classList.toggle("show");
    })
    
    helpButton.addEventListener("click", e => {
        overlay.classList.toggle("show");
    })
    
    closeInstructionsButton.addEventListener("click", e => {
        instructions.classList.toggle("show");
    })
    
    instructions.addEventListener("transitionend", e => {
        if (!e.target.classList.contains("show")) overlay.classList.toggle("show");
    });

    setTimeout(() => {
        overlay.classList.toggle("show");
    }, 500);

    // Draw and animate the cursor
    cursor.drawCursor();
    
    cursor.blinkCursor(500);
});
