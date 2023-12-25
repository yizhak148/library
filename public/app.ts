import { getBooks } from "./books.js";

const bookList = document.getElementById("book-list");

async function app() {
    if (!bookList) {
        throw new Error("Book list element not in page");
    }

    const books = await getBooks();

    bookList.innerHTML = books.map((book) => `<li><a href="/book-details.html#${book.id}">${book.title} - ${book.author}</a></li>`).join("\n");
}

app();
//לעשות את הקטע שהספר זה קישורים ואם לוחצים עליהם זה מפנה לעמוד עם הפרטים
