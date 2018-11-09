import unified from 'unified'
import parseText from 'retext-latin'
import renderText from 'retext-stringify'
import type { Processor, ProcessorOpts } from './types'
import { magicStrings } from '../plugins'

export default (opts: ProcessorOpts): Processor =>
  unified()
    .use(parseText)
    .use(
      magicStrings({ ...opts, replacements: { '\\d\\d\\d\\d': () => '***' } })
    )
    .use(renderText)
