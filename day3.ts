import fs from 'fs'

console.log("Advent Of Code Day 3")

const fileInput: string = fs.readFileSync('./data/day3_sample.txt', 'utf8').toString()

// Split into lines
const dataLines: string[] = fileInput.split('\n')

// Assumes the first character in the string is the starting digit
// TODO - Find a better name for this function
const findNumberInString = (text: string): {value: number, lastIndex: number} => {
  let numberString = text[0]
  for (let i = 1; i < text.length; i++) {
    const character = line[k]
    if (isNaN(parseInt(character))) return {value: parseInt(numberString), lastIndex: i-1}
    numberString += character
  }
}

// Loop each line
dataLines.forEach((line, lineIndex) => {
  // Check each character for digits to find all numbers
  for (let k = 0; k < line.length; k++) {
    const character = line[k]
    const isNum = !isNaN(parseInt(character))
    if (isNum) {
      // We have a digit (can guarentee first if we alter k)
      // Grab the whole number
      const numberDetails = findNumberInString(line.substring(k))
      k = numberDetails.lastIndex+1 // Skip to the next line
    }
  }
})

// Loop through each character
  // If you find a digit, grab the whole number (multiple digits possible)
  // Then safely search the positions in the line before, current line, and line after (if these exist).
  // If a symbol is found, add.
