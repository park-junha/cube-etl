import { parseTimes } from '../src/parseTimes'
import { readFileSync } from 'fs'
import { resolve } from 'path'

if (process.argv.length !== 3) {
  throw new Error('Please provide a relative path for the file to parse.')
}

const testInput: string = readFileSync(
  resolve(__dirname, process.argv[2]),
  'utf8'
)
console.log(JSON.stringify(parseTimes(testInput), null, 2))
