import {
  parseTimes
} from '../../src/parseTimes'
import {
  readFileSync,
  readdirSync
} from 'fs'
import { resolve } from 'path'

describe('parseTimes', () => {
  const testCases: number = readdirSync(
    resolve(__dirname, './testCases')
  ).length / 2
  for (let testCaseNumber: number = 0; testCaseNumber < testCases; testCaseNumber++) {
    describe(`should parse times correctly - test case ${testCaseNumber}`, () => {
      const testInput: string = readFileSync(
        resolve(__dirname, `./testCases/testInput.${testCaseNumber}.txt`),
        'utf8'
      )
      const expectedOutput: any = JSON.parse(readFileSync(
        resolve(__dirname, `./testCases/testOutput.${testCaseNumber}.json`),
        'utf8'
      ))
      const res: any = parseTimes(testInput)
      it(`should have the correct average: ${expectedOutput.average}`, () => {
        expect(res.average).toEqual(expectedOutput.average)
      })
      const avgLength: number = expectedOutput.times.length
      it(`should have the correct count of times: ${avgLength}`, () => {
        expect(res.times.length).toEqual(avgLength)
      })
      for (let testIndex: number = 0; testIndex < avgLength; testIndex++) {
        describe(`time and scramble ${testIndex + 1}/${avgLength}`, () => {
          const expectedTime: number = res.times[testIndex].time
          it(`should have the correct time: ${expectedTime}`, () => {
            expect(res.times[testIndex].time).toEqual(expectedTime)
          })
          const expectedScramble: string = res.times[testIndex].scramble
          it(`should have the correct scramble: ${expectedScramble}`, () => {
            expect(res.times[testIndex].scramble).toEqual(expectedScramble)
          })
          const isPlusTwo: boolean = res.times[testIndex].plusTwo ?? false
          it(`should ${isPlusTwo ? '' : 'NOT '}be +2`, () => {
            expect(res.times[testIndex].plusTwo ?? false).toEqual(isPlusTwo)
          })
        })
      }
    })
  }
})

