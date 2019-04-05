const express = require("express");
const app = express();
const port = 3001;

const es6Renderer = require("express-es6-template-engine");

app.use(express.urlencoded({ extended: false }));

const userRouter = require("./routes/users");
const dashboardRouter = require('./routes/dashboard');
const loginRouter = require('./routes/login');

const session = require('express-session');
const FileStore = require('session-file-store')(session);

app.use(session({
  store: new FileStore(),
  secret: 'efoijweaoiejawoifeawaefew'
}));

app.use("/users", userRouter);
app.use("/dashboard", dashboardRouter);
app.use("/login", loginRouter);

// set up the views so that we can render to the page
app.engine('html', es6Renderer);
app.set('view engine', 'html');
app.set('views', 'views');



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
