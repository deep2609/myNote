const express = require("express");
const errorMiddleware = require("./middleware/error");

const app = express();
app.use(express.json());

//Route imports
const note = require("./routes/noteRoute");

app.use("/api/v1",note);


//middleware for error
app.use(errorMiddleware);

module.exports = app;
