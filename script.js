// DOM selectors
const startMessage = document.querySelector('#start__message');
// table
const tableHead = document.querySelector('#table__head');
const tableBody = document.querySelector('#table__body');
// modal
const dialog = document.querySelector('#dialog');
const addBookBtn = document.querySelector('#add-book__btn');
const cancelBtn = document.querySelector('#cancel__btn');
// form
const form = document.querySelector('#form');
const inputTitle = document.querySelector('#input__title');
const inputAuthor = document.querySelector('#input__author');
const inputPages = document.querySelector('#input__pages');
const inputStatus = document.querySelector('#input__status');

// books storage
let myLibrary = [];

// the constructor
function Book(title, author, pages, status) {
	if (!new.target) {
		throw Error("Use the 'new' operator to call the constructor");
	}

	this.id = this.generateID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.status = status;
}

Book.prototype.generateID = function () {
	return crypto.randomUUID();
	// It creates a 128-bit identifier (chance of collision is extremely low: it uses the OS’s underlying cryptographic random number generator). In this case, there is no need to check if the id has already been generated in previous runtimes.
};

// take params, create a book, return it
function createBook(title, author, pages, status) {
	return new Book(title, author, pages, status);
}

// display form
addBookBtn.addEventListener('click', () => {
	dialog.showModal();
});

// close form
cancelBtn.addEventListener('click', () => {
	dialog.close();
});

// form to submit new book
form.addEventListener('submit', (e) => {
	e.preventDefault();

	const newBook = createBook(
		inputTitle.value,
		inputAuthor.value,
		inputPages.value,
		inputStatus.value
	);

	// add book to myLibrary
	myLibrary.push(newBook);
	// display book
	displayNewBook(newBook);
	// clear the form values
	form.reset();
	dialog.close();
});

// event to create the table head after submitting the first book only
form.addEventListener(
	'submit',
	(e) => {
		e.preventDefault();
		console.log('first');

		startMessage.remove();

		// create table head row
		const headRow = document.createElement('tr');

		// create table headers
		const title = document.createElement('th');
		const author = document.createElement('th');
		const pages = document.createElement('th');
		const status = document.createElement('th');
		const options = document.createElement('th');

		// give table headers names
		title.textContent = 'Title';
		author.textContent = 'Author';
		pages.textContent = 'Pages';
		status.textContent = 'Status';
		options.textContent = 'Options';

		// append table headers to a row
		headRow.appendChild(title);
		headRow.appendChild(author);
		headRow.appendChild(pages);
		headRow.appendChild(status);
		headRow.appendChild(options);

		// append row to table head
		tableHead.appendChild(headRow);
	},
	{ once: true }
);

// display new book on table
function displayNewBook(book) {
	// row
	const bookRow = document.createElement('tr');
	// data fields
	const title = document.createElement('td');
	const author = document.createElement('td');
	const pages = document.createElement('td');
	const status = document.createElement('td');
	const button = document.createElement('td');
	const deleteBtn = document.createElement('button');

	// element classes & IDs
	title.classList.add('book__title');
	pages.classList.add('pages');
	status.classList.add('status');
	deleteBtn.classList.add('delete__btn');

	// not to be displayed, but used for removing book
	bookRow.dataset.id = book.id;
	// book info to display
	title.textContent = book.title;
	author.textContent = book.author;
	pages.textContent = book.pages;
	status.textContent = book.status;
	deleteBtn.textContent = 'Delete';

	// append data to row
	bookRow.appendChild(title);
	bookRow.appendChild(author);
	bookRow.appendChild(pages);
	bookRow.appendChild(status);
	bookRow.appendChild(button);
	button.appendChild(deleteBtn);

	// append row to table
	tableBody.appendChild(bookRow);

	// delete book
	deleteBtn.addEventListener('click', () => {
		const bookId = bookRow.dataset.id;

		// remove from myLibrary
		myLibrary = myLibrary.filter((book) => book.id !== bookId);
		console.log(myLibrary);

		// remove from DOM
		bookRow.remove();
	});
}
