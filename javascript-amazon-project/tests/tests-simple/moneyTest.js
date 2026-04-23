import formatCurrency from '../../scripts/utils/money.js';

console.log("test suite: formatCurrency");

console.log("converts cents into dollars");
// Basic
if (formatCurrency(2095) === '20.95') {
  console.log("passed");
} else {
  console.log("failed " + formatCurrency(2095));
}

console.log("works with 0");
// Edge
if (formatCurrency(0) === '0.00') {
  console.log("passed");
} else {
  console.log("failed " + formatCurrency(0));
}

console.log("rounds up to the nearest cent")
// Edge
if (formatCurrency(2000.5) === '20.00') {
  console.log("passed");
} else {
  console.log("failed " + formatCurrency(2000.5));
}

/**
 * 2 Types of Test cases:
 * 1. Basic test cases = tests if the code is workting
 * 2. Edge cases = test with values that are tricky!
 */