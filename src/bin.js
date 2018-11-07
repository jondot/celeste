#!/usr/bin/env node

import yargs from 'yargs'
import path from 'path'
import formatters from './formatters'
import runner from './runner'

async function main() {
  const { argv } = yargs.usage('Usage: $0 <commands> [options]').options({
    input: { alias: 'i', describe: 'input file', demandOption: true },
    config: { alias: 'c', describe: 'configuration file' },
    output: {
      alias: 'o',
      describe: 'File to output to',
      demandOption: true
    },
    format: {
      alias: 'f',
      describe: 'Output format',
      choices: Object.keys(formatters)
    }
  })

  // eslint-disable-next-line
  const config = argv.config ? require(path.join(process.cwd(), argv.config)) : {}

  const logger = await runner(argv, config)
  if (logger.errors.length > 0) {
    logger.log({
      type: 'celeste/error-summary',
      level: 'info',
      payload: {
        errors: logger.errors
      }
    })
    process.exit(1)
  }
}
main()
