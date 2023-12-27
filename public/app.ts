import { getBooks } from "./books.js";

const bookList = document.getElementById("book-list");

const search = document.getElementById("search") as HTMLInputElement;
const input = search.value

async function findbook(input: string) {
    
    const books = await getBooks();

    const foundBook = books.find((book) => {book.title === input})

    if (foundBook) {
        // Redirect to the book details page using the book's ID
        window.location.href = `/book-details.html#${foundBook.title}`;
      } else {
        console.log("Book not found");
    }
};

async function app() {
    if (!bookList) {
        throw new Error("Book list element not in page");
    }

    const books = await getBooks();

    bookList.innerHTML = books.map((book) => `<li><a href="/book-details.html#${book.id}">${book.title} - ${book.author}</a></li>`).join("\n");
}

app();

