const myLibrary = [];

// the constructor
function Book(title, author, pages, isRead) {
	if (!new.target) {
		throw Error("Use the 'new' operator to call the constructor");
	}

	this.id = this.generateID();
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.isRead = isRead;
}

Book.prototype.generateID = function () {
	return crypto.randomUUID();
	// It creates a 128-bit identifier (chance of collision is extremely low: it uses the OS’s underlying cryptographic random number generator). In this case, there is no need to check if the id has already been generated in previous runtimes.
};

// take params, create a book then store it in the array
function addBookToLibrary(title, author, pages, isRead) {
	const book = new Book(title, author, pages, isRead);
	myLibrary.push(book);
}
