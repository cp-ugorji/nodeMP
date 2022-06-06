const CSVToJSON = require("csvtojson");
const path = require("path");
const storedCSVFilePath = path.join(__dirname, "csv/books.csv");
const storedJSONFilePath = path.join(__dirname, "json/books.txt");
const fs = require("fs");
const {
  pipeline
} = require("stream");
console.log(fs.existsSync(storedCSVFilePath))
const readStream = fs.createReadStream(storedCSVFilePath);
const writeStream = fs.createWriteStream(storedJSONFilePath);


const errorCB = err => err ? console.error('Pipeline failed.', err) : console.log('Pipeline succeeded.');

pipeline(
  readStream,
  CSVToJSON(),
  writeStream,
  errorCB
);