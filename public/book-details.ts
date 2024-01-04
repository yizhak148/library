import { Book, Member, borrowCopy, createCopy, getBookDetails, getMembers } from "./books.js";

async function app() {
    const bookId = window.location.hash.slice(1);
    const [bookDetails, members] = await Promise.all([
        getBookDetails(bookId),
        getMembers()
    ]);

    const coverImage = document.getElementById("book-cover");
    coverImage?.setAttribute("src", `https://github.com/benoitvallon/100-best-books/blob/master/static/${bookDetails.imageLink}?raw=true`);

    renderBookField("author");
    renderBookField("title");
    renderBookField("language");
    renderBookField("year");
    renderBookField("pages");

    renderCopies(bookDetails, members);
    bindCreateCopyButton(bookId);

    function renderBookField(field: keyof typeof bookDetails) {
        const authorSpan = document.getElementById(`book-${field}`);

        if (!authorSpan) {
            throw new Error();
        }

        authorSpan.innerText = bookDetails[field].toString();
    }
}

app();

function bindCreateCopyButton(bookId: string) {
    const createCopyButton = document.getElementById("create-copy");

    if (!createCopyButton) {
        throw new Error();
    }

    createCopyButton.addEventListener("click", async () => {
        await createCopy(bookId);

        const [book, members] = await Promise.all([
            getBookDetails(bookId),
            getMembers()
        ]);

        renderCopies(book, members);
    });
}

function renderCopies({ _id, copies }: Book, members: Member[]) {
    const copyCount = document.getElementById("copy-count");

    if (!copyCount) {
        throw new Error();
    }

    copyCount.innerText = copies.length ? `Count: ${copies.length}` : "This book has no copies";

    const copiesTable = document.getElementById("copies");

    if (!copiesTable) {
        throw new Error();
    }

    copiesTable.innerHTML = copies
        .map((copy) => `<tr><td>${copy._id}</td><td>${copy.member ? "🔴" : "🟢"}</td><td>${copy.member?.name ??
            `<form class="borrow-form">
                <input type="hidden" name="copyId" value="${copy._id}" />
                <select name="member">
                    ${members.map((m) => `<option value="${m._id}">${m.name}</option>`).join("\n")}
                </select>
                <button>Borrow</button>
            </form>`
            }</td></tr>`)
        .join("\n");

    document.querySelectorAll(".borrow-form").forEach((form) => form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);

        await borrowCopy(formData.get("copyId")!.toString(), formData.get("member")!.toString());

        const [book, members] = await Promise.all([
            getBookDetails(_id),
            getMembers()
        ]);

        renderCopies(book, members);
    }));
}