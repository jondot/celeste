#!/usr/bin/env node

import yargs from 'yargs'
import path from 'path'
import formatters from './formatters'
import runner from './runner'

async function main() {
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

  // eslint-disable-next-line
  const config = argv.config ? require(path.join(process.cwd(), argv.config)) : {}

  const errors = await runner(argv, config)
  if (errors.length > 0) {
    process.exit(1)
  }
}
main()
