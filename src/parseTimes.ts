interface Time {
  time: number
  scramble: string
  plusTwo?: boolean
}

interface Average {
  times: Time[]
  average: number
}

function parseAverageTime(avgHeader: string): number {
  const slicedAvgHeader: string[] = avgHeader.split(' ')
  return parseFloat(slicedAvgHeader[slicedAvgHeader.length - 1])
}

function parseTimeAndScramble(entry: string): Time {
  const slicedEntry: string[] = entry.split("\u{20}\u{a0}\u{20}")
  const time: number = parseFloat(slicedEntry[0]
    .split(" ")[1]
    .replace("(", "")
    .replace(")", "")
  )
  const scramble: string = slicedEntry[slicedEntry.length - 1]
  const returnObject: Time = {
    time: time,
    scramble: scramble
  }
  if (slicedEntry[0].includes("+")) {
    returnObject.plusTwo = true
  }
  return returnObject
}

export function parseTimes(input: string): Average {
  const slicedInput: string[] = input.split('\n')
  const avgTime: number = parseAverageTime(slicedInput[0])
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
    average: avgTime
  }
}
