import fs from 'fs'

console.log("Advent Of Code Day 3")

const fileInput: string = fs.readFileSync('./data/day3.txt', 'utf8').toString()
// console.log("FILE INPUT: ", fileInput)

// Split into lines
const dataLines: string[] = fileInput.split('\n')
// console.log("dataLines: ", dataLines)

// Assumes the first character in the string is the starting digit
// TODO - Find a better name for this function
const findNumberInString = (text: string): { value: number, lastIndex: number } => {
  let numberString = text[0]
  for (let i = 1; i < text.length; i++) {
    const character = text[i]
    if (isNaN(parseInt(character))) return { value: parseInt(numberString), lastIndex: i - 1 }
    numberString += character
  }
  return { value: parseInt(numberString), lastIndex: text.length - 1 }
}


const containsSymbol = (text: string) => {
  return !!text.match(/[-@#!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)
}

// Finds if a number has any surrounding symbols and if true, returns the value of the number found.
const findSurroundingSymbols = (dataLines: string[], line: string, characterIndex: number, lineIndex: number, numberEndIndex) => {

  // Checking the 0 or last line/index is fine because it's at worst just redundant - if true it means one of the other checks is true
  // Set Indexes
  const beforeIndex = characterIndex - 1 > 0 ? characterIndex - 1 : 0
  const afterIndex = (characterIndex + 1 + numberEndIndex) < line.length ? (characterIndex + 1 + numberEndIndex) : line.length - 1
  const beforeLineIndex = lineIndex - 1 > 0 ? lineIndex - 1 : 0
  const afterLineIndex = lineIndex + 1 < dataLines.length ? lineIndex + 1 : dataLines.length - 1

  // Grab Datas
  const leftCharacter = line[beforeIndex]
  const rightCharacter = line[afterIndex]
  const lineAbove = dataLines[beforeLineIndex].substring(beforeIndex, afterIndex + 1)
  const lineBelow = dataLines[afterLineIndex].substring(beforeIndex, afterIndex + 1)

  // Check for symbols
  const SYMBOL_ON_LEFT = (containsSymbol(leftCharacter))
  const SYMBOL_ON_RIGHT = (afterIndex < line.length && containsSymbol(rightCharacter))
  const SYMBOL_ON_LINE_ABOVE = (beforeLineIndex >= 0 && containsSymbol(lineAbove))
  const SYMBOL_ON_LINE_BELOW = (afterLineIndex < dataLines.length && containsSymbol(lineBelow))

  // Check for any symbol
  if (SYMBOL_ON_LEFT || SYMBOL_ON_RIGHT || SYMBOL_ON_LINE_ABOVE || SYMBOL_ON_LINE_BELOW) return true

  return false
}

let total: number = 0
// Loop each line
dataLines.forEach((line, lineIndex) => {
  // Check each character for digits to find all numbers
  for (let k = 0; k < line.length; k++) {
    const character = line[k]
    const isNum = !isNaN(parseInt(character))

    // Skip non-numbers
    if (!isNum) continue

    // Find start and end of number
    const numberDetails = findNumberInString(line.substring(k))

    // Check for neighboring symbols
    const SYMBOL_FOUND = findSurroundingSymbols(dataLines, line, k, lineIndex, numberDetails.lastIndex)
    if (SYMBOL_FOUND) total += numberDetails.value

    // Skip to the character after this number (k++ will then increment to the next character not bordering this number)
    k += numberDetails.lastIndex + 1
  }

})

console.log("TOTAL: ", total)