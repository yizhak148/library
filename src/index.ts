// import { createServer } from "http";
// import express from "express";
// import books from "./books.json"

// const app = express();

// app.get("/api/book", (_, res) => {
//   res.send(books.map((author , title) => ({ author ,title})))
// });

// app.post("/api/book/:id", (req, res) => {
//     const bookid = req.params.id

//     const book = books.find((b) => {b.id === bookid})

//     if(!book) {
//         res.status(404)
//         res.send(`can not fuond book with this id: ${bookid}`)
//     }
// });

// app.use(express.static("public"));

// const server = createServer(app);
// const port = process.env.PORT ?? 3000;

// server.listen(port, () => console.log(`Listening on port ${port}`));
import { createServer } from "http";
import { appendFile, readFile, writeFile } from "fs/promises";
import express from "express";
import path from "path";
import { randomUUID } from "crypto";
import { json } from "body-parser";
import { router as bookRouter} from "./books.router";
import { router  as copiesRouter} from "./copis.router";

const app = express();

app.use(json());

app.use((req, res, next) => {
    console.log(req.method, req.url, req.body);
    next();
});

app.use("/api/books", bookRouter);
app.use("/api/copies", copiesRouter)

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));