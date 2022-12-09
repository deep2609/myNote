const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();
app.use(express.json());

//Route imports
const note = require("./routes/noteRoute");
const user = require("./routes/userRoute");

app.use("/api/v1",note);
app.use("/api/v1",user);

//middleware for error
app.use(errorMiddleware);

module.exports = app;
