import express from "express";
import { postsRouter } from "./routers/posts-router.js";
import cors from "cors";
import { usersRouter } from "./routers/users-router.js";

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/posts", postsRouter);
app.use("/users", usersRouter);

const port = 3032;

app.listen(port, () =>
  console.log(`Server listening on port http://127.0.0.1:${port}/`)
);
