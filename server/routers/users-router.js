import { Router } from "express";
import { exampleUsers } from "../example-data/users.js";

const usersRouter = Router();

// GET /user/:userId
usersRouter.get("/:userId", (req, res) => {
  const userId = req.params.userId;
  const user = exampleUsers.find((user) => user.id === userId);
  res.json(user);
});

export { usersRouter };
