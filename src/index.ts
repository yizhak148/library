import { createServer } from "http";
import express from "express";

const app = express();

app.get("/api/hello", (req, res) => {
    res.send("world");
});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

server.listen(port, () => console.log(`Listening on port ${port}`));