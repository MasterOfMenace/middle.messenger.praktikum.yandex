// import express from "express";

const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

app.use(express.static("./dist"));

app.listen(port, () => {
  console.log("Server running on port 3000");
});
