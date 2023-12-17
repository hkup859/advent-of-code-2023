import fs from 'fs'

console.log("Advent Of Code Day 4")

const fileInput: string = fs.readFileSync('./data/day4.txt', 'utf8').toString()

const dataLines: string[] = fileInput.split('\n')

// Array of array pairs with winning and current numbers
const cardValues: any = dataLines.map(
  line => {
    const cardNumberSets = line.split(": ")
    if (cardNumberSets.length > 1) return cardNumberSets[1].split(" | ").map(numberSet => (numberSet.split(" ").filter(number => number !== '')))
  }
)

let total = 0
for (let i = 0; i < cardValues.length; i++) {
  const card = cardValues[i]
  if (card?.length !== 2) continue
  const winningNumbers = card[0]
  const cardNumbers = card[1]
  const matchingNumbers = winningNumbers.filter(wn => cardNumbers.includes(wn))
  const cardWorth = matchingNumbers.length > 0 ? Math.pow(2, matchingNumbers.length - 1) : 0
  total += cardWorth
}
console.log("TOTAL: ", total)


