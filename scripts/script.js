class Book {
    constructor(title, authors, numberOfPages, isRead, isFavorite) {
        this.title = title;
        this.authors = authors;
        this.numberOfPages = numberOfPages;
        this.isRead = isRead;
        this.isFavorite = isFavorite;
    }

    markAsRead() {
        this.isRead = true;
    }

    toggleFavorite() {
        this.isFavorite = !this.isFavorite;
    }
}

class Bookshelf {
    constructor() {
        this.books = [];
    }

    addBook(book) {
        this.books.push(book);
    }

    removeBook(book) {
        const index = this.books.indexOf(book);
        if (index !== -1) {
            this.books.splice(index, 1);
        }
    }

    getUnreadBooks() {
        return this.books.filter(book => !book.isRead);
    }

    getFavBooks() {
        return this.books.filter(book => book.isFavorite);
    }
}

const bookshelf = new Bookshelf();
const bookForm = document.getElementById('book-form');
const bookList = document.getElementById('book-list');
let totalBooks = 0;

bookForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const authors = document.getElementById('authors').value;
    const pages = parseInt(document.getElementById('pages').value);
    const isRead = document.getElementById('isRead').checked;
    const isFavorite = document.getElementById('isFavorite').checked;

    const book = new Book(title, authors, pages, isRead, isFavorite);
    bookshelf.addBook(book);
    totalBooks++;
    document.getElementById('total-books').textContent = `Total Books: ${totalBooks}`;
    displayBooks();
    bookForm.reset();    
});

function displayBooks() {
    bookList.innerHTML = '';
    bookshelf.books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.classList.add('book-item');
        listItem.innerHTML = `
            <strong>${book.title}</strong> by ${book.authors}<br>
            Pages: ${book.numberOfPages}<br>
            Read: ${book.isRead ? 'Yes' : 'No'}<br>
            Favorite: ${book.isFavorite ? 'Yes' : 'No'}<br>
            <div class="book-controls">
                <button onclick="toggleReadStatus(${bookshelf.books.indexOf(book)})">Toggle Read</button>
                <button onclick="toggleFavoriteStatus(${bookshelf.books.indexOf(book)})">Toggle Favorite</button>
                <button class="remove-button" onclick="removeBook(${bookshelf.books.indexOf(book)})">Remove</button>
            </div>
        `;
        bookList.appendChild(listItem);
    });
}

function toggleReadStatus(index) {
    const book = bookshelf.books[index];
    book.markAsRead();
    displayBooks();
}

function toggleFavoriteStatus(index) {
    const book = bookshelf.books[index];
    book.toggleFavorite();
    displayBooks();
}

function removeBook(index) {
    const book = bookshelf.books[index];
    bookshelf.removeBook(book);
    totalBooks--;
    document.getElementById('total-books').textContent = `Total Books: ${totalBooks}`;
    displayBooks();
}

document.getElementById('total-books').textContent = `Total Books: ${totalBooks}`;

displayBooks();