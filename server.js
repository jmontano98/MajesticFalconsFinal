// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from "express";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app
  .route("/api")
  .get(async (req, res) => {
    console.log("GET request detected");
    const data = await fetch(
      "https://api.planetterp.com/v1/courses?department=INST"
    );
    const json = await data.json();
    console.log("data from fetch", json);
    res.json(json);
  })
  .post(async (req, res) => {
    console.log("POST request detected");
    console.log("POST request body", req.body);
    const data = await fetch(
      `https://api.planetterp.com/v1/grades?course=INST${req.body.course_num}`
    );
    const json = await data.json();
    console.log("data from fetch", json);
    res.json(json);
  })

  .put((req, res) => {
    console.log("PUT Request Detected");
  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});
