// DOM selectors
const tableBody = document.querySelector('#table_body');
const addBookBtn = document.querySelector('#add_book_btn');

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

// take params, create a book then store it in the array
function addBookToLibrary(title, author, pages, status) {
	const newBook = new Book(title, author, pages, status);
	myLibrary.push(newBook);
}

// add some data manually to check if displayBooks works as intended
addBookToLibrary('Book 1', 'Author 1', 322, true);
addBookToLibrary('Book 2', 'Author 2', 1, true);
addBookToLibrary('Book 3', 'Author 3', 99999, false);

console.table(myLibrary);

function displayBooks(array) {
	// for each book create
	array.forEach((book) => {
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
	});
}

displayBooks(myLibrary);
