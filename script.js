const cardHolderNameInput = document.getElementById('cardholder-name');
const cardNumberInput = document.getElementById('card-number');
const expirationMonthInput = document.getElementById('expiration-month');
const expirationYearInput = document.getElementById('expiration-year');
const securityCodeInput = document.getElementById('cvc');
const form = document.getElementById('form');
const inputArray = [
	cardHolderNameInput, 
	cardNumberInput, 
	expirationMonthInput, 
	expirationYearInput, 
	securityCodeInput
];

//Mask the Credit Card Number Input
const cardNumberMask = new IMask(cardNumberInput, {
	mask: '0000 0000 0000 0000',
});

//Mask the Expiration Month
const expirationMonthMask = new IMask(expirationMonthInput, {
	mask: IMask.MaskedRange,
	from: 1,
	to: 12,
});

//Mask the Expiration Year
const expirationYearMask = new IMask(expirationYearInput, {
	mask: '00',
});

//Mask the security code
const securityCodeMask = new IMask(securityCodeInput, {
	mask: '000',
});

/* ============== Functions ================ */
const setError = (element, message) => {
	const inputControl = element.parentElement;
	const errorMessage = inputControl.querySelector('.error-text');

	errorMessage.innerHTML = message;
	element.classList.add('error-border');
};

const setSuccess = (element) => {
	const inputControl = element.parentElement;
	const errorMessage = inputControl.querySelector('.error-text');

	errorMessage.innerHTML = '';
	element.classList.remove('error-border');
};

// After the focus is out adds a leading zero 
// if the length of the month or year value is 1.
const addZero = (inputElement, outputElement) => {
	const inputValueLength = inputElement.value.length;

	if (inputValueLength === 1) {
		inputElement.value = '0' + inputElement.value;
		outputElement.innerHTML = '0' + outputElement.innerHTML;
	}
}

const checkInputLength = (element) => {
	const correctLength = parseInt(element.getAttribute('maxlength'));

	if (cardHolderNameInput.value.length > 3) {
		setSuccess(cardHolderNameInput);
	}

	if (cardNumberInput.value.length === correctLength) {
		setSuccess(cardNumberInput);
	}

	if (securityCodeInput.value.length === correctLength) {
		setSuccess(securityCodeInput);
	}

	if (expirationMonthInput.value.length === correctLength) {
		expirationMonthInput.classList.remove('error-border');
	}

	if (expirationYearInput.value.length === correctLength) {
		expirationYearInput.classList.remove('error-border');
	}

	if (expirationMonthInput.value.length > 0 &&
		expirationYearInput.value.length > 0) {
		setSuccess(expirationMonthInput);
		setSuccess(expirationYearInput);
	}
};

const validateOutput = (inputElement, outputElement, defaultOutput) => {
	if (inputElement.value.length === 0) {
		outputElement.innerHTML = defaultOutput;
	}
	else {
		outputElement.innerHTML = inputElement.value;
	}
};

const validateInput = (element) => {
	const isEmpty = (element.value.length === 0);

	if (isEmpty) {
		setError(element, "Can't be blank");
	}

	if (element === expirationMonthInput && element.value < 1) {
		setError(element, "Wrong format");
	}
};

const containsError = () => {
	const errorArray = inputArray.map((input) => {
		return input.classList.contains('error-border');
	});

	return errorArray.includes(true);
};

const elementAppearance = (element, command) => {
	if (command === 'show') {
		element.style.display = 'flex';
	}
	else if (command === 'hide') {
		element.style.display = 'none';
	}
};

/* ============== On Input Change Events ================ */
inputArray.forEach((input) => {
	input.addEventListener('input', () => {
		switch(input) {
			case cardHolderNameInput:
				const cardHolderNameOutput = document.querySelector('.card-front__holder-name');
				checkInputLength(input);
				validateOutput(input, cardHolderNameOutput, 'JANE APPLESEED');
				break;
			case cardNumberInput:
				const cardNumberOutput = document.querySelector('.card-front__card-number');
				checkInputLength(input);
				validateOutput(input, cardNumberOutput, '0000 0000 0000 0000');
				break;
			case expirationMonthInput:
				const expirationMonthOutput = document.querySelector('.card-front__exp-month');
				checkInputLength(input);
				validateOutput(input, expirationMonthOutput, '00');
				break;
			case expirationYearInput:
				const expirationYearOutput = document.querySelector('.card-front__exp-year');
				checkInputLength(input);
				validateOutput(input, expirationYearOutput, '00');
				break;
			case securityCodeInput:
				const securityCodeOutput = document.querySelector('.card-back__cvc');
				checkInputLength(input);
				validateOutput(input, securityCodeOutput, '000');
				break;	
		}
	});
});

expirationMonthInput.addEventListener('focusout', () => {
	const expirationMonthOutput = document.querySelector('.card-front__exp-month');

	addZero(expirationMonthInput, expirationMonthOutput);
});

expirationYearInput.addEventListener('focusout', () => {
	const expirationYearOutput = document.querySelector('.card-front__exp-year');

	addZero(expirationYearInput, expirationYearOutput);
});

/* ============== Submit Form Event ================ */
form.addEventListener('submit', (e) => {
	e.preventDefault();

	inputArray.forEach((input) => {
		validateInput(input);
	});
	
	if (!containsError()) {
		const compleateWindow = document.querySelector('.complete-window__inner')
		elementAppearance(form, 'hide');
		elementAppearance(compleateWindow, 'show');
	}
});