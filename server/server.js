const express = require("express");

const PORT = 3000;
const app = express();

process.env.PORT = PORT;

app.use(express.static("./dist"));

app.listen(PORT);
