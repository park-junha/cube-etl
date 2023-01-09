import { CubeType } from './enums/CubeType'
import { Time } from './interfaces/Time'
import { Average } from './interfaces/Average'

function parseAverageTime(avgHeader: string): number {
  const slicedAvgHeader: string[] = avgHeader.split(' ')
  return parseFloat(slicedAvgHeader[slicedAvgHeader.length - 1])
}

function parseTimeAndScramble(entry: string): Time {
  const slicedEntry: string[] = entry.split("\u{20}\u{a0}\u{20}")
  const timeString: string = slicedEntry[0]
    .split(" ")[1]
    .replace("(", "")
    .replace(")", "")
    .replace("DNF", "")
  let minutes: number = 0
  let seconds: number = 0
  if (timeString.includes(':')) {
    const timeStringSlices: string[] = timeString.split(':')
    minutes = parseInt(timeStringSlices[0])
    seconds = parseFloat(timeStringSlices[1])
  } else {
    seconds = parseFloat(timeString)
  }
  const time: number = minutes * 60 + seconds
  const scramble: string = slicedEntry[slicedEntry.length - 1]
  const returnObject: Time = {
    time: time,
    scramble: scramble,
    DNF: false
  }
  if (slicedEntry[0].includes("+")) {
    returnObject.plusTwo = true
  }
  if (slicedEntry[0].includes("DNF")) {
    returnObject.DNF = true
  }
  return returnObject
}

export function parseTimes(input: string, cubeType?: CubeType, cube?: string): Average {
  const slicedInput: string[] = input.split('\n')
  let avgIsDNF: boolean = false
  let avgTime: number = null
  if (slicedInput[0].includes('DNF')) {
    avgIsDNF = true
  } else {
    avgTime = parseAverageTime(slicedInput[0])
  }
  const times = []
  if (slicedInput[slicedInput.length - 1] === '') {
    slicedInput.pop()
  }
  for (let index = 1; index < slicedInput.length; index++) {
    const entry: string = slicedInput[index]
    if (entry === '') {
      continue
    }
    times.push(parseTimeAndScramble(entry))
  }
  return {
    times: times,
    cubeType: cubeType ?? CubeType.Three,
    cube: cube ?? null,
    average: avgTime,
    DNF: avgIsDNF
  }
}
