const express = require("express");
// const cors = require("cors");
// const helmet = require("helmet");
// const cookieParser = require("cookie-parser");

//imports
// const restrict = require("../middleware/restrict");
// const authRouter = require("../auth/auth-router");
// const articleRouter = require("../routes/article-router");

const server = express();

// server.use(helmet());
// server.use(cors());
server.use(express.json());
// server.use(cookieParser());

// server.use("/api/auth", authRouter);
// server.use("/articles", articleRouter);

//This will be the first thing you see when accessing the deployed server
server.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Project 1 API!",
  });
});

//This is a general err message not specific to any endpoint
server.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({
    message: "Something went wrong. Please try again...",
  });
});

// module.exports = server;
server.listen(3000, () => console.log("listening on port 3000"));

// POST   | /api/users     | Creates a user using the information sent inside the `request body`.                                   |
// GET    | /api/users     | Returns an array users.                                                                                |
// GET    | /api/users/:id | Returns the user object with the specified `id`.                                                       |
// DELETE | /api/users/:id | Removes the user with the specified `id` and returns the deleted user.                                 |
// PUT    | /api/users/:id | Updates the user with the specified `id` using data from the `request body`. Returns the modified user |

const users = [{ id: "1", name: "ali", bio: "nonexistant1" }];

const validateUser = (user) => {
  return (
    user && (typeof user.name !== "string" || typeof user.bio !== "string")
  );
};

const createUser = (data) => {
  return {
    id: Date.now().toString(),
    ...data,
  };
};
``;
// typeof user.id !== "string" ||

server.post("/api/users/", (req, res) => {
  console.log(req.body);
  // if (typeof req.body.name !== "string") {
  //   res.json({ message: "name is required" });
  if (validateUser(req.body)) {
    res
      .status(400)
      .json({ errorMessage: "Please provide name and bio for the user." });
  } else {
    try {
      const newUser = createUser(req.body);
      users.push(newUser);
      // throw new Error("error1")
      res.status(201).json(newUser);
    } catch {
      res.status(500).json({
        errorMessage:
          "There was an error while saving the user to the database",
      });
    }
  }
});

server.get("/api/users/", (req, res) => {
  try {
    res.json(users);
  } catch {
    res
      .status(500)
      .json({ errorMessage: "The users information could not be retrieved." });
  }
});

server.get("/api/users/:id", (req, res) => {
  try {
    const id = req.params.id;
    const user = users.find((user) => user.id === id);
    if (!user) {
      res
        .status(404)
        .json({ message: "The user with the specified ID does not exist." });
    } else {
      res.json(user);
    }
  } catch {res.status(500).json({errorMessage: "The user information could not be retrieved."})}
});
