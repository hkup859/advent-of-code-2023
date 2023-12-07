import fs from 'fs'

console.log("Advent Of Code Day 2")

const fileInput: string = fs.readFileSync('./data/day2.txt', 'utf8').toString()

// Split into games
const gameTexts: string[] = fileInput.split('\n')
let passedGameTotal: number = 0

// Possible Number Of Cubes
const cubeCounts: { count: number, color: string }[] = [
  {
    count: 12,
    color: 'red'
  },
  {
    count: 13,
    color: 'green'
  },
  {
    count: 14,
    color: 'blue'
  }
]

gameTexts.forEach(gameText => {
  // Parse data from game
  const colonIndex: number = gameText.indexOf(':')
  const gameNumber: number = parseInt(gameText.substring(5, colonIndex))
  const setTexts: string[] = gameText.substring(colonIndex + 2).split('; ')
  const sets: string[][] = setTexts.map(setText => setText.split(', '))
  let isGamePossible: boolean = true
  sets.forEach(set => {
    set.forEach(cubeDetails => {
      const values: string[] = cubeDetails.split(' ')
      const cubeNumber: number = parseInt(values[0])
      const cubeColor: string = values[1]
      const cubeMax: number = cubeCounts.find(cubeCount => cubeCount.color === cubeColor)?.count || 0
      if (cubeMax === 0) throw new Error('Issue parsing cube count from set')

      if (cubeNumber > cubeMax) isGamePossible = false
    })
  })
  if (isGamePossible) {
    console.log(`${gameText} => ${gameNumber}`)
      passedGameTotal += gameNumber
  }
})

console.log("Total of game numbers from possible games: ", passedGameTotal)