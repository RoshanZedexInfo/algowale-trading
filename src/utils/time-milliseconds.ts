export const timeMilliseconds = (value: string): number => {
  const ms = 1;
  const s = 1000 * ms;
  const m = 60 * s;
  const h = 60 * m;
  const d = 24 * h;
  const y = 365 * d;

  // Regular expression to extract the number and unit
  const regex = /^(\d*\.?\d+)([a-z]*)$/;
  const match = value.match(regex);

  if (!match) {
    throw new Error('Invalid time format');
  }

  const num = Number(match[1]); // Extracted number
  const unit = match[2]; // Extracted unit

  // Map units to their corresponding millisecond values
  const unitMap: { [key: string]: number } = {
    ms: ms,
    s: s,
    m: m,
    h: h,
    d: d,
    y: y,
  };

  // If no unit is provided, return the number as is
  if (!unit) {
    return num;
  }

  // Check if the unit exists in the map
  if (!unitMap[unit]) {
    throw new Error(`Unsupported time unit: ${unit}`);
  }

  return num * unitMap[unit];
};

// Example usage:
// console.log(timeMilliseconds("1d"));      // 86400000
// console.log(timeMilliseconds("10h"));     // 36000000
// console.log(timeMilliseconds("2.5h"));    // 9000000
// console.log(timeMilliseconds("1m"));      // 60000
// console.log(timeMilliseconds("5s"));      // 5000
// console.log(timeMilliseconds("1y"));      // 31557600000
// console.log(timeMilliseconds("100"));     // 100
