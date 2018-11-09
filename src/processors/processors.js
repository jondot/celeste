import L from 'lodash'
import type { Processor, ProcessorOpts } from './types'
import createTextProcessor from './text'
import createMarkdownProcessor from './markdown'

const createProcessor = (opts: ProcessorOpts) => {
  const textProcessor = createTextProcessor(opts)
  const markdownProcessor = createMarkdownProcessor(opts)
  const processors = {
    text: textProcessor,
    markdown: markdownProcessor
  }

  return async (path: string, content: string): Promise<string> => {
    const pipe = L.find(opts.processors, (v, k) => path.match(k))
    if (!pipe) {
      return content
    }
    return L.reduce(
      pipe,
      (p, x) => p.then(processors[x].process),
      Promise.resolve(content)
    )
  }
}
export { createProcessor, createMarkdownProcessor, createTextProcessor }
