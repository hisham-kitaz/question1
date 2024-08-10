// Hicham Kitaz 40188246
// for simplicity I have put the routers alongside the functions for 
// easier grouping of functions and routers
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the project directory
app.use(express.static(path.join(__dirname)));

// Route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Your existing function routes
app.post('/findSummation', (req, res) => {
  const { number } = req.body;
  const result = findSummation(Number(number));
  res.send(`Summation result: ${result}`);
});

app.post('/uppercaseFirstandLast', (req, res) => {
  const { text } = req.body;
  const result = uppercaseFirstandLast(text);
  res.send(`Uppercased result: ${result}`);
});

app.post('/findAverageAndMedian', (req, res) => {
  const { numbers } = req.body;
  const numberArray = numbers.split(',').map(Number);
  const result = findAverageAndMedian(numberArray);
  res.send(`Average: ${result.average}, Median: ${result.median}`);
});

app.post('/find4Digits', (req, res) => {
  const { text } = req.body;
  const result = find4Digits(text);
  res.send(`First four-digit number: ${result}`);
});

// Function definitions
function findSummation(N = 1) {
  if (typeof N !== 'number' || N <= 0) return false;
  return (N * (N + 1)) / 2;
}

function uppercaseFirstandLast(str) {
  if (typeof str !== 'string') return false;
  return str.split(' ').map(word => {
    if (word.length > 1) {
      return word.charAt(0).toUpperCase() + word.slice(1, -1) + word.charAt(word.length - 1).toUpperCase();
    } else {
      return word.toUpperCase();
    }
  }).join(' ');
}

function findAverageAndMedian(arr) {
  if (!Array.isArray(arr) || !arr.every(num => typeof num === 'number')) return false;

  const sum = arr.reduce((acc, num) => acc + num, 0);
  const average = sum / arr.length;

  arr.sort((a, b) => a - b);
  const mid = Math.floor(arr.length / 2);
  const median = arr.length % 2 !== 0 ? arr[mid] : (arr[mid - 1] + arr[mid]) / 2;

  return { average, median };
}

function find4Digits(str) {
  if (typeof str !== 'string') return false;
  const fourDigitNumber = str.split(' ').find(num => num.length === 4 && !isNaN(num));
  return fourDigitNumber || false;
}

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
