import fs from 'fs-extra'
import { createProcessor } from './processors'
import formatters from './formatters'
import createCachedFetch from './cached-fetch'
import Logger from './logger'
import { createPublisher } from './publishers'

export default async (
  args: { [string]: any },
  config: { [string]: any }
): Promise<Logger> => {
  const formatter = formatters[args.format] || formatters.text
  const logger = new Logger(formatter)
  const opts = {
    logger,
    publishers: config.publishers,
    plugins: config.plugins,
    fetch: createCachedFetch({})
  }
  const content: string = (await fs.readFile(args.input)).toString()
  const processor = createProcessor(opts)
  const publisher = createPublisher(opts)
  try {
    const res = await processor(content)
    const publishContent = { path: args.output, content: res }
    await publisher(publishContent)
  } catch (err) {
    logger.log({
      type: 'celeste',
      level: 'error',
      payload: { err, stack: err.stack }
    })
  }
  return logger
}
