import { createServer } from "http";
import express from "express";
import books from "./books.json"

const app = express();

app.get("/api/book", (_, res) => {
  res.send(books.map((author , title) => ({ author ,title})))
});
app.post("/api/book/:id", async (_, res) => {
//uptade
});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));