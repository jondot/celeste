import L from 'lodash'
import type { ProcessorOpts } from '../types'
import createTextProcessor from './text'
import createMarkdownProcessor from './markdown'

const createProcessor = (opts: ProcessorOpts) => {
  const textProcessor = createTextProcessor(opts)
  const markdownProcessor = createMarkdownProcessor(opts)
  const processors = {
    text: textProcessor,
    markdown: markdownProcessor
  }

  return async (vf: any): Promise<any> => {
    // $FlowFixMe
    const pipe = L.find(opts.processors, (v, k) => vf.path.match(k))
    if (!pipe) {
      return vf
    }
    return L.reduce(
      pipe,
      (p, x) => p.then(processors[x].process),
      Promise.resolve(vf)
    )
  }
}
export { createProcessor, createMarkdownProcessor, createTextProcessor }
