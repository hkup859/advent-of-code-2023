import fs from 'fs'

console.log("Advent Of Code Day 4")

const fileInput: string = fs.readFileSync('./data/day4.txt', 'utf8').toString()

const dataLines: string[] = fileInput.split('\n')

// Array of array pairs with winning and current numbers
let cardDetails: any = dataLines.map(
  line => {
    const cardNumberSets = line.split(": ")
    if (cardNumberSets.length > 1) {
      const cardNumberSplit = cardNumberSets[0].split(" ")
      const cardNumber = cardNumberSplit[cardNumberSplit.length - 1]
      const cardValues = cardNumberSets[1].split(" | ").map(numberSet => (numberSet.split(" ").filter(number => number !== '')))
      return { card: cardNumber, values: cardValues }
    }
  }
).filter(cardDetail => cardDetail !== undefined)


const originalCardDetails = JSON.parse(JSON.stringify(cardDetails))
let totalCards = 0
for (let i = 0; i < cardDetails.length; i++) {
  const card = cardDetails[i]
  const values: any[][] = card?.values
  if (values?.length !== 2) continue
  const winningNumbers = values[0]
  const cardNumbers = values[1]
  const matchingNumbers = winningNumbers.filter(wn => cardNumbers.includes(wn))

  // Copy wins
  for (let k = 0; k < matchingNumbers.length; k++) {

    // Find futureCard - ()
    const cardNumberToCopy = (parseInt(card.card) + k + 1)
    // console.log("cardNumberToCopy: ", cardNumberToCopy)
    const futureCard = originalCardDetails.find(c => parseInt(c.card) === cardNumberToCopy)
    // Add the copy/future card in the next slot
    if (futureCard) cardDetails.push(futureCard)
  }


  totalCards++
}
console.log("TOTAL: ", totalCards)


