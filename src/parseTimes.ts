interface Time {
  time: number
  scramble: string
  plusTwo?: boolean
  DNF?: boolean
}

interface Average {
  times: Time[]
  average: number | null
  DNF: boolean
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
    .replace("DNF", "")
  )
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

export function parseTimes(input: string): Average {
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
    average: avgTime,
    DNF: avgIsDNF
  }
}
