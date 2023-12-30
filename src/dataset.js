/*
This script generates a CSV dataset of users and their music listening habits.
The dataset by default has `index` and `id_usuario` columns, and a column for 
each music genre can be added by adding the genre name to the `DATA_COLUMNS`
array.

@author Isaac Santiago <https://github.com/eoisaac>
*/

const crypto = require("crypto");
const fs = require("fs");

const TOTAL_LINES = 10_000;
const MAX_HOURS = 40;
const FILE_NAME = "dataset.csv";

const DATA_COLUMNS = [
  "horas_ouvidas_rock",
  "horas_ouvidas_samba",
  "horas_ouvidas_pop",
  "horas_ouvidas_rap",
];

const HEADER = `index, id_usuario, ${DATA_COLUMNS.join(",")}\n`;

const getRandomInt = (max) => Math.floor(Math.random() * max);
const getDataRow = (i) => {
  const index = i + 1;
  const id = crypto.randomUUID();
  const randomValues = DATA_COLUMNS.map(() => getRandomInt(MAX_HOURS));

  return `${index}, ${id}, ${randomValues.join(",")}\n`;
};

const data = [...Array.from({ length: TOTAL_LINES })].reduce((acc, _, i) => {
  return acc + getDataRow(i);
}, HEADER);

try {
  fs.writeFileSync(FILE_NAME, data);
  console.log(`CSV file "${FILE_NAME}" generated successfully.`);
} catch (err) {
  console.error("Error writing CSV file:", err);
}
