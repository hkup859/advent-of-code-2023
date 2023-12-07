import fs from 'fs'

console.log("Advent Of Code Day 2")

const fileInput: string = fs.readFileSync('./data/day2_sample.txt', 'utf8').toString()

// Split into games
const gameTexts: string[] = fileInput.split('\n')
let passedGameTotal: number = 0

// Possible Number Of Cubes

gameTexts.forEach(gameText => {
  // Parse data from game
  const colonIndex: number = gameText.indexOf(':')
  const gameNumber: number = parseInt(gameText.substring(5, colonIndex))
  const setTexts: string[] = gameText.substring(colonIndex + 2).split('; ')
  const sets: string[][] = setTexts.map(setText => setText.split(', '))
  const minimumCubes: { count: number, color: string }[] = []
  sets.forEach(set => {
    set.forEach(cubeDetails => {
      const values: string[] = cubeDetails.split(' ')
      const cubeNumber: number = parseInt(values[0])
      const cubeColor: string = values[1]
      const minimumCubeIndex = minimumCubes.findIndex(minimumCube => minimumCube.color === cubeColor)
      if (minimumCubeIndex === -1) minimumCubes.push({ count: cubeNumber, color: cubeColor })
      else if (cubeNumber > minimumCubes[minimumCubeIndex].count) minimumCubes[minimumCubeIndex].count = cubeNumber
    })
  })
  console.log("Game Minimums: ", minimumCubes)
})

// console.log("Total of game numbers from possible games: ", passedGameTotal)