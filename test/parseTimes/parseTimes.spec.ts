import { parseTimes } from '../../src/parseTimes'
import { CubeType } from '../../src/enums/CubeType'
import {
  readFileSync,
  readdirSync
} from 'fs'
import { resolve } from 'path'

describe('parseTimes', () => {
  const testCases: number = readdirSync(
    resolve(__dirname, './testCases')
  ).length / 2

  describe(`cube`, () => {
    const testInput: string = readFileSync(
      resolve(__dirname, `./testCases/testInput.0.txt`),
      'utf8'
    )

    it('should be null if no cube parameter is set by default', () => {
      expect(parseTimes(testInput).cube).toEqual(null)
    })

    it('should match the given cube parameter', () => {
      expect(parseTimes(testInput, 3, 'GANS 356').cube).toEqual('GANS 356')
    })
  })

  describe(`cubeType`, () => {
    const testInput: string = readFileSync(
      resolve(__dirname, `./testCases/testInput.0.txt`),
      'utf8'
    )

    it('should return cubeType 3 by default', () => {
      expect(parseTimes(testInput).cubeType).toEqual(3)
    })

    it('should take cubeType Pyraminx', () => {
      expect(parseTimes(testInput, CubeType.Pyraminx).cubeType).toEqual(0)
    })

    it('should take cubeType SquareOne', () => {
      expect(parseTimes(testInput, CubeType.SquareOne).cubeType).toEqual(1)
    })

    it('should take cubeType Two', () => {
      expect(parseTimes(testInput, CubeType.Two).cubeType).toEqual(2)
    })

    it('should take cubeType Three', () => {
      expect(parseTimes(testInput, CubeType.Three).cubeType).toEqual(3)
    })

    it('should take cubeType Four', () => {
      expect(parseTimes(testInput, CubeType.Four).cubeType).toEqual(4)
    })

    it('should take cubeType Five', () => {
      expect(parseTimes(testInput, CubeType.Five).cubeType).toEqual(5)
    })

    it('should take cubeType Six', () => {
      expect(parseTimes(testInput, CubeType.Six).cubeType).toEqual(6)
    })

    it('should take cubeType Seven', () => {
      expect(parseTimes(testInput, CubeType.Seven).cubeType).toEqual(7)
    })

    it('should take cubeType Skewb', () => {
      expect(parseTimes(testInput, CubeType.Skewb).cubeType).toEqual(8)
    })

    it('should take cubeType Clock', () => {
      expect(parseTimes(testInput, CubeType.Clock).cubeType).toEqual(9)
    })

    it('should take cubeType Megaminx', () => {
      expect(parseTimes(testInput, CubeType.Megaminx).cubeType).toEqual(10)
    })
  })

  for (let testCaseNumber: number = 0; testCaseNumber < testCases; testCaseNumber++) {
    describe(`Test case ${testCaseNumber}`, () => {
      const testInput: string = readFileSync(
        resolve(__dirname, `./testCases/testInput.${testCaseNumber}.txt`),
        'utf8'
      )
      const expectedOutput: any = JSON.parse(readFileSync(
        resolve(__dirname, `./testCases/testOutput.${testCaseNumber}.json`),
        'utf8'
      ))
      const res: any = parseTimes(testInput)
      const avgIsDNF: boolean = expectedOutput.DNF

      it('should return a boolean for whether the average is DNF', () => {
        expect(res.DNF).not.toBeNull()
        expect(res.DNF).not.toBeUndefined()
      })

      it(`should ${avgIsDNF ? '' : 'NOT '}be DNF`, () => {
        expect(res.DNF).toEqual(avgIsDNF)
      })

      if (!avgIsDNF) {
        it(`should have the correct average: ${expectedOutput.average}`, () => {
          expect(res.average).toEqual(expectedOutput.average)
        })
      }

      const avgLength: number = expectedOutput.times.length

      it(`should have the correct count of times: ${avgLength}`, () => {
        expect(res.times.length).toEqual(avgLength)
      })

      for (let testIndex: number = 0; testIndex < avgLength; testIndex++) {
        describe(`time and scramble ${testIndex + 1}/${avgLength}`, () => {
          const isPlusTwo: boolean = expectedOutput.times[testIndex].plusTwo ?? false
          const isDNF: boolean = expectedOutput.times[testIndex].DNF ?? false

          it(`should ${isPlusTwo ? '' : 'NOT '}be +2`, () => {
            expect(res.times[testIndex].plusTwo ?? false).toEqual(isPlusTwo)
          })

          it(`should ${isDNF ? '' : 'NOT '}be DNF`, () => {
            expect(res.times[testIndex].plusTwo ?? false).toEqual(isPlusTwo)
          })

          if (!isDNF) {
            const expectedTime: number = expectedOutput.times[testIndex].time

            it(`should have the correct time: ${expectedTime}`, () => {
              expect(res.times[testIndex].time).toEqual(expectedTime)
            })
          }
          const expectedScramble: string = expectedOutput.times[testIndex].scramble

          it(`should have the correct scramble: ${expectedScramble}`, () => {
            expect(res.times[testIndex].scramble).toEqual(expectedScramble)
          })
        })
      }
    })
  }
})

