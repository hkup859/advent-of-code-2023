import fs from 'fs'

console.log("Advent Of Code Day 3")

const fileInput: string = fs.readFileSync('./data/day3_sample.txt', 'utf8').toString()
console.log("FILE INPUT: ", fileInput)

// Split into lines
const dataLines: string[] = fileInput.split('\n')
console.log("dataLines: ", dataLines)

// Assumes the first character in the string is the starting digit
// TODO - Find a better name for this function
const findNumberInString = (text: string): { value: number, lastIndex: number } => {
  let numberString = text[0]
  for (let i = 1; i < text.length; i++) {
    const character = text[i]
    if (isNaN(parseInt(character))) return { value: parseInt(numberString), lastIndex: i - 1 }
    numberString += character
  }
  throw new Error('Could not find number')
}

const containsSymbol = (text: string) => {
  return !!text.match(/[-#!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)
}

let total: number = 0
// Loop each line
dataLines.forEach((line, lineIndex) => {
  console.log("DATA LINE: ", line, lineIndex)
  // Check each character for digits to find all numbers
  for (let k = 0; k < line.length; k++) {
    // console.log("K: ", k)
    const character = line[k]
    const isNum = !isNaN(parseInt(character))
    if (isNum) {
      const numberDetails = findNumberInString(line.substring(k))
      console.log("NUMBER DETAILS: ", numberDetails)
      // Checking the 0 or last line/index is fine because if true it means one of the other checks is true
      // Set Indexes
      const beforeIndex = k - 1 > 0 ? k - 1 : 0
      const afterIndex = (k + 1 + numberDetails.lastIndex) < line.length ? (k + 1 + numberDetails.lastIndex) : line.length-1
      const beforeLineIndex = lineIndex - 1 > 0 ? lineIndex - 1 : 0
      const afterLineIndex = lineIndex + 1 < dataLines.length ? lineIndex + 1 : dataLines.length-1

      // Grab Data Chunks
      const leftCharacter = line[beforeIndex]
      const rightCharacter = line[afterIndex]
      const lineAbove = dataLines[beforeLineIndex].substring(beforeIndex, afterIndex + 1)
      const lineBelow = dataLines[afterLineIndex].substring(beforeIndex, afterIndex + 1)

      // Check for symbols
      const SYMBOL_ON_LEFT = (containsSymbol(leftCharacter))
      const SYMBOL_ON_RIGHT = (afterIndex < line.length && containsSymbol(rightCharacter))
      const SYMBOL_ON_LINE_ABOVE = (beforeLineIndex >= 0 && containsSymbol(lineAbove))
      const SYMBOL_ON_LINE_BELOW = (afterLineIndex < dataLines.length && containsSymbol(lineBelow))
      
      console.log("----------------")
      console.log("beforeIndex: ", beforeIndex)
      console.log("afterIndex: ", afterIndex)
      console.log("beforeLineIndex: ", beforeLineIndex)
      console.log("afterLineIndex: ", afterLineIndex)
      console.log('************')
      console.log("leftCharacter: ", leftCharacter)
      console.log("rightCharacter: ", rightCharacter)
      console.log("lineAbove: ", lineAbove)
      console.log("lineBelow: ", lineBelow)
      console.log('^^^^^^^^^^^^')
      console.log("SYMBOL_ON_LEFT: ", SYMBOL_ON_LEFT)
      console.log("SYMBOL_ON_RIGHT: ", SYMBOL_ON_RIGHT)
      console.log("SYMBOL_ON_LINE_ABOVE: ", SYMBOL_ON_LINE_ABOVE)
      console.log("SYMBOL_ON_LINE_BELOW: ", SYMBOL_ON_LINE_BELOW)
      
      if (SYMBOL_ON_LEFT || SYMBOL_ON_RIGHT || SYMBOL_ON_LINE_ABOVE || SYMBOL_ON_LINE_BELOW) {
        console.log("ADD: ", numberDetails.value)
        total += numberDetails.value
      } else if (numberDetails.value === 467) {
        console.log("----------------")
        console.log("beforeIndex: ", beforeIndex)
        console.log("afterIndex: ", afterIndex)
        console.log("beforeLineIndex: ", beforeLineIndex)
        console.log("afterLineIndex: ", afterLineIndex)
        console.log('************')
        console.log("leftCharacter: ", leftCharacter)
        console.log("rightCharacter: ", rightCharacter)
        console.log("lineAbove: ", lineAbove)
        console.log("lineBelow: ", lineBelow)
        console.log('^^^^^^^^^^^^')
        console.log("SYMBOL_ON_LEFT: ", SYMBOL_ON_LEFT)
        console.log("SYMBOL_ON_RIGHT: ", SYMBOL_ON_RIGHT)
        console.log("SYMBOL_ON_LINE_ABOVE: ", SYMBOL_ON_LINE_ABOVE)
        console.log("SYMBOL_ON_LINE_BELOW: ", SYMBOL_ON_LINE_BELOW)
        
      }

      console.log("numberDetails: ", numberDetails)
      k += numberDetails.lastIndex + 1 // Skip to the next line
    }
  }
})

console.log("TOTAL: ", total)

// Loop through each character
  // If you find a digit, grab the whole number (multiple digits possible)
  // Then safely search the positions in the line before, current line, and line after (if these exist).
  // If a symbol is found, add.
