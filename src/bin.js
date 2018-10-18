#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs'
import createProcessor from './processor'
import text from './formatters/text'
import json from './formatters/json'

const formatters = {
  text,
  json
}

const { argv } = yargs.usage('Usage: $0 <commands> [options]').options({
  file: { alias: 'f', describe: 'input file', demandOption: true },
  out: {
    alias: 'o',
    describe: 'File to output to'
  },
  report: {
    alias: 'r',
    describe: 'Report format',
    choices: Object.keys(formatters)
  }
})

const content = fs.readFileSync(argv.file).toString()
const out = argv.out ? fs.openSync(argv.out, 'w') : 1
const processor = createProcessor({
  log: formatters[argv.report]
})
async function main() {
  const res = await processor.process(content)
  await fs.write(out, res, () => {})
}
main()
