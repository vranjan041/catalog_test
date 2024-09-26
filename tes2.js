const fs = require("fs");
const convertToDecimal = (value, base) => {
  return parseInt(value, base);
};

const lagrangeInterpolation = (points) => {
  let c = BigInt(0);

  for (let i = 0; i < points.length; i++) {
    let [x_i, y_i] = points[i];
    let term = BigInt(y_i);
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        let [x_j] = points[j];
        term *= BigInt(0 - x_j);
        term /= BigInt(x_i - x_j);
      }
    }

    c += term;
  }

  return c;
};

const parseInput = (filename) => {
  const rawData = fs.readFileSync(filename);
  const data = JSON.parse(rawData);

  const points = [];

  for (const key in data) {
    if (key === "keys") continue;

    const x = parseInt(key);
    const base = parseInt(data[key].base);
    const y = convertToDecimal(data[key].value, base);

    points.push([x, y]);
  }

  return points;
};

const main = (filename) => {
  const points = parseInput(filename);
  console.log(points);
  const c = lagrangeInterpolation(points);

  console.log("The constant term (c) is:", c.toString());
};

main("input.json");
