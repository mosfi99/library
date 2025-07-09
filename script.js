// DOM selectors
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

// Code logic
const myLibrary = [];

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

function displayNewBook(book) {
	console.log(myLibrary);

	// row
	const row = document.createElement('tr');
	// data fields
	const title = document.createElement('td');
	const author = document.createElement('td');
	const pages = document.createElement('td');
	const status = document.createElement('td');

	// styles
	title.classList.add('title');
	pages.classList.add('pages');
	status.classList.add('status');

	// book info to display
	title.textContent = book.title;
	author.textContent = book.author;
	pages.textContent = book.pages;
	status.textContent = book.status;

	// append data to row
	row.appendChild(title);
	row.appendChild(author);
	row.appendChild(pages);
	row.appendChild(status);

	// append row to table
	tableBody.appendChild(row);
}