import { createServer } from "http";
import express from "express";
import books from "./books.json"

const app = express();

app.get("/api/book", (_, res) => {
  res.send(books.map((author , title) => ({ author ,title})))
});

app.post("/api/book/:id", (req, res) => {
    const bookid = req.params.id

    const book = books.find((b) => {b.id === bookid})

    if(!book) {
        res.status(404)
        res.send(`can not fuond book with this id: ${bookid}`)
    }
});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));