
import "dotenv/config";
import { createServer } from "http";
import { appendFile, readFile, writeFile } from "fs/promises";
import express, { RequestHandler } from "express";
import path from "path";
import { randomUUID } from "crypto";
import { json } from "body-parser";
import { router as bookRouter} from "./books.router";
import { router  as copiesRouter} from "./copis.router";
import mongoose from "mongoose";

const app = express();

app.use(json());

app.use((req, res, next) => {
    console.log(req.method, req.url, req.body);
    next();
});

app.use("/api/books", bookRouter);
app.use("/api/copies", copiesRouter)

// app.use((err, req, res, next) => {
//     if (res.headersSent) {
//         next(err);
//     }

//     console.error(err);
//     res.status(500);
//     res.send("Something went wrong");
//});

app.use(express.static("public"));

const server = createServer(app);
const port = process.env.PORT ?? 3000;

async function startServer() {
    if (!process.env.CONN_STRING) {
        throw new Error("Must provide connection string")
    }

    await mongoose.connect(process.env.CONN_STRING, {
        dbName: "library"
    });

    server.listen(port, () => console.log(`Listening on port ${port}`));
}

startServer();