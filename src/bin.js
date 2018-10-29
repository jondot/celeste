#!/usr/bin/env node

import yargs from 'yargs'
import fs from 'fs'
import path from 'path'
import { createProcessor } from './processors'
import text from './formatters/text'
import json from './formatters/json'
import createCachedFetch from './cached-fetch'

const formatters = {
  text,
  json
}

const { argv } = yargs.usage('Usage: $0 <commands> [options]').options({
  file: { alias: 'f', describe: 'input file', demandOption: true },
  config: { alias: 'c', describe: 'configuration file' },
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

// todo: replace this with bubbling up config
const config = argv.config ? require(path.join(process.cwd(), argv.config)) : {}

const out = argv.out ? fs.openSync(argv.out, 'w') : 1

const log = formatters[argv.report] || text
const opts = {
  log,
  plugins: config.plugins,
  fetch: createCachedFetch({})
}
async function main() {
  const content = fs.readFileSync(argv.file).toString()
  const processor = createProcessor(opts)
  try {
    const res = await processor(content)
    await fs.write(out, res, () => {})
  } catch (err) {
    log({
      type: 'celeste',
      level: 'error',
      payload: { err }
    })
  }
}
main()
