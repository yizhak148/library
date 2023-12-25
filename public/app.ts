import { getBooks } from "./books.js"

console.log("hello world", getBooks.length);

const bla = document.getElementById("ul");

async function app() {
    if(!bla) {
   throw new Error("page book not fuond")
}
    const book = await getBooks();
    bla.innerHTML = book.map(book => { `<li> ${book.title} - ${book.author} </li>`}).join('');
}

app();
