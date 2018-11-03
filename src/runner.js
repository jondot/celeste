import fs from 'fs'
import { createProcessor } from './processors'
import text from './formatters/text'
import json from './formatters/json'
import createCachedFetch from './cached-fetch'
import Logger from './logger'
import type { Formatter, LogMessage } from './types'

const formatters: { [string]: Formatter } = {
  text,
  json
}

export default async (
  args: { [string]: any },
  config: { [string]: any }
): Promise<Logger> => {
  const out = args.out ? fs.openSync(args.out, 'w') : 1

  const formatter = formatters[args.report] || text
  const logger = new Logger(formatter)
  const opts = {
    logger,
    plugins: config.plugins,
    fetch: createCachedFetch({})
  }
  const content: string = fs.readFileSync(args.file).toString()
  const processor = createProcessor(opts)
  try {
    const res = await processor(content)
    await fs.write(out, res, () => {})
  } catch (err) {
    logger.log({
      type: 'celeste',
      level: 'error',
      payload: { err }
    })
  }
  return logger
}
