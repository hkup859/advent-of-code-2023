import fs from 'fs'

console.log("Advent Of Code Day 3")

const fileInput: string = fs.readFileSync('./data/day3.txt', 'utf8').toString()
// console.log("FILE INPUT: ", fileInput)

// Split into lines
const dataLines: string[] = fileInput.split('\n')
// console.log("dataLines: ", dataLines)


const isNumber = (num: number): boolean => {
  return !isNaN(parseInt(num))
}

// Assumes the starting index given is somewhere in the number
const findCompleteNumberInString = (text: string, digitIndex: number): number => {
  let numberString = text[digitIndex]
  // Go backwards
  for (let i = digitIndex - 1; i >= 0; i--) {
    const character = text[i]
    if (isNumber(character)) numberString = character + numberString
    else break
  }

  // Go Forwards
  for (let i = digitIndex + 1; i < text.length; i++) {
    const character = text[i]
    if (isNumber(character)) numberString += character
    else break
  }

  return numberString
}

const findSymbolPosition = (text: string) => {
  return text.search(/[-@#!$%^&*()_+|~=`{}\[\]:";'<>?,\/]/)
}

const findNumberPosition = (text: string) => {
  return text.search(/[1234567890]/)
}

// Finds if a number has any surrounding symbols and if true, returns the value of the number found.
const findSurroundingNumbers = (dataLines: string[], line: string, characterIndex: number, lineIndex: number) => {

  // Checking the 0 or last line/index is fine because it's at worst just redundant - if true it means one of the other checks is true
  // Set Indexes
  const beforeIndex = characterIndex - 1 > 0 ? characterIndex - 1 : 0
  const afterIndex = (characterIndex + 1) < line.length ? (characterIndex + 1) : line.length - 1
  const beforeLineIndex = lineIndex - 1 > 0 ? lineIndex - 1 : 0
  const afterLineIndex = lineIndex + 1 < dataLines.length ? lineIndex + 1 : dataLines.length - 1

  // Grab Datas
  const leftCharacter = line[beforeIndex]
  const rightCharacter = line[afterIndex]
  const lineAbove = dataLines[beforeLineIndex].substring(beforeIndex, afterIndex + 1)
  const lineBelow = dataLines[afterLineIndex].substring(beforeIndex, afterIndex + 1)

  // Check for symbols
  const leftNumberIndex = findNumberPosition(leftCharacter)
  const rightNumberIndex = findNumberPosition(rightCharacter)
  const aboveNumberIndex = findNumberPosition(lineAbove)
  const belowNumberIndex = findNumberPosition(lineBelow)

  

  // Check for any number
  const positionsWithNumbers = []
  if (leftNumberIndex !== -1) positionsWithNumbers.push({lineIndex, characterIndex: beforeIndex})
  if (rightNumberIndex !== -1) positionsWithNumbers.push({lineIndex, characterIndex: afterIndex})
  if (aboveNumberIndex !== -1) {
    positionsWithNumbers.push({lineIndex: beforeLineIndex, characterIndex: characterIndex + aboveNumberIndex - 1})
    const TWO_NUMBERS_EXIST = isNumber(lineAbove[0]) && !isNumber(lineAbove[1]) && isNumber(lineAbove[2])
    if (TWO_NUMBERS_EXIST) positionsWithNumbers.push({lineIndex: beforeLineIndex, characterIndex: characterIndex + aboveNumberIndex + 1})  
  }
  if (belowNumberIndex !== -1) {
    positionsWithNumbers.push({lineIndex: afterLineIndex, characterIndex: characterIndex + belowNumberIndex - 1})
    const TWO_NUMBERS_EXIST = isNumber(lineBelow[0]) && !isNumber(lineBelow[1]) && isNumber(lineBelow[2])
    if (TWO_NUMBERS_EXIST) positionsWithNumbers.push({lineIndex: afterLineIndex, characterIndex: characterIndex + aboveNumberIndex+2})
  }

  return positionsWithNumbers
}

let total: number = 0
// Loop each line
dataLines.forEach((line, lineIndex) => {
  // Check each character for digits to find all numbers
  for (let k = 0; k < line.length; k++) {
    const character = line[k]
    const isAsterisk = character === '*' // isAsterisk

    // Skip non-numbers
    if (!isAsterisk) continue

    // Check for numbers in surrounding sections
    const positionsWithNumbers = findSurroundingNumbers(dataLines, line, k, lineIndex)

    if (positionsWithNumbers.length === 2) {
      // Find the whole numbers
      const num1 = findCompleteNumberInString(dataLines[positionsWithNumbers[0].lineIndex], positionsWithNumbers[0].characterIndex)
      const num2 = findCompleteNumberInString(dataLines[positionsWithNumbers[1].lineIndex], positionsWithNumbers[1].characterIndex)
      total += num1 * num2
    }
  }

})

console.log("TOTAL: ", total)