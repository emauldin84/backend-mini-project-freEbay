const express = require("express");
const app = express();
const port = 3001;

const es6Renderer = require("express-es6-template-engine");

app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routes/users");

app.use("/users", userRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
