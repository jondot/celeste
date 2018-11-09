// $FlowFixMe
import fs from 'fs-extra'
import report from 'vfile-reporter'
import globby from 'globby'
import vfile from 'vfile'
import { createProcessor } from './processors/processors'
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
    processors: config.processors,
    fetch: createCachedFetch({})
  }
  const processor = createProcessor(opts)
  const publisher = createPublisher(opts)
  const files = await globby(args.input)
  // eslint-disable-next-line
  for (const path of files) {
    try {
      const contents: string = (await fs.readFile(path)).toString()
      const vf = vfile({ path, contents })
      const res = await processor(vf)
      console.log(report(res))
      const publishContent = { path: args.output, content: res }
      await publisher(publishContent)
    } catch (err) {
      logger.log({
        type: 'celeste',
        level: 'error',
        payload: { err, stack: err.stack }
      })
    }
  }
  return logger
}
