// These are our required libraries to make the server work.
/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
import express from 'express';
import dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.route('/api')
  .get((req, res) => {
    console.log('GET request detected');
    res.send(`Lab 5 for ${process.env.NAME}`);
  })
  .post(async (req, res) => {

    const course = await fetch('https://api.planetterp.com/v1/course?name=INST126');
    const jsonObj = await course.json();

    console.log('POST request detected');
    console.log('Form data in res.body', req.body);
    console.log(course);
    console.log(jsonObj);
    res.json(jsonObj);

  });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

