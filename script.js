const cardHolderNameInput = document.getElementById('cardholder-name');
const cardNumberInput = document.getElementById('card-number');
const expirationMonthInput = document.getElementById('expiration-month');
const expirationYearInput = document.getElementById('expiration-year');
const securityCodeInput = document.getElementById('cvc');
const form = document.getElementById('form');

//Mask the Credit Card Number Input
let cardNumberMask = new IMask(cardNumberInput, {
	mask: '0000 0000 0000 0000',
});

//Mask the Expiration Month
let expirationMonthMask = new IMask(expirationMonthInput, {
	mask: IMask.MaskedRange,
	from: 1,
	to: 12,
});

//Mask the Expiration Year
let expirationYearMask = new IMask(expirationYearInput, {
	mask: '00',
});

//Mask the security code
let securityCodeMask = new IMask(securityCodeInput, {
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
};

/* ============== On Input Change Events ================ */
cardHolderNameInput.addEventListener('input', () => {
	const cardHolderNameOutput = document.querySelector('.card-front__holder-name');

	checkInputLength(cardHolderNameInput);
	validateOutput(cardHolderNameInput, cardHolderNameOutput, 'JANE APPLESEED');
});

cardNumberInput.addEventListener('input', () => {
	const cardNumberOutput = document.querySelector('.card-front__card-number');

	checkInputLength(cardNumberInput);
	validateOutput(cardNumberInput, cardNumberOutput, '0000 0000 0000 0000');
});

expirationMonthInput.addEventListener('input', () => {
	const expirationMonthOutput = document.querySelector('.card-front__exp-month');

	checkInputLength(expirationMonthInput);
	validateOutput(expirationMonthInput, expirationMonthOutput, '00');
});

expirationMonthInput.addEventListener('focusout', () => {
	const expirationMonthOutput = document.querySelector('.card-front__exp-month');

	addZero(expirationMonthInput, expirationMonthOutput);
});

expirationYearInput.addEventListener('input', () => {
	const expirationYearOutput = document.querySelector('.card-front__exp-year');

	checkInputLength(expirationYearInput);
	validateOutput(expirationYearInput, expirationYearOutput, '00');
});

expirationYearInput.addEventListener('focusout', () => {
	const expirationYearOutput = document.querySelector('.card-front__exp-year');

	addZero(expirationYearInput, expirationYearOutput);
});

securityCodeInput.addEventListener('input', () => {
	const securityCodeOutput = document.querySelector('.card-back__cvc');

	checkInputLength(securityCodeInput);
	validateOutput(securityCodeInput, securityCodeOutput, '000');
});

/* ============== Submit Form Event ================ */
form.addEventListener('submit', (e) => {
	e.preventDefault();

	validateInput(cardHolderNameInput);
	validateInput(cardNumberInput);
	validateInput(expirationMonthInput);
	validateInput(expirationYearInput);
	validateInput(securityCodeInput);
});