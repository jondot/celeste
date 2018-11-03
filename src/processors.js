import unified from 'unified'
import parse from 'remark-parse'
import parseText from 'retext-latin'
import renderText from 'retext-stringify'
import stringify from 'remark-stringify'
import type { Processor, ProcessorOpts } from './types'
import sortByStars from './plugins/sort-by-stars'
import fetchStars from './plugins/fetch-stars'
import dedupLinks from './plugins/dedup-links'
import createToc from './plugins/toc'
import createAddLicense from './plugins/add-license'
import createGitContributors from './plugins/git-contributors'
import magicStrings from './plugins/magic-strings'
import brokenLinks from './plugins/broken-links'

const createTextProcessor = (opts: ProcessorOpts): Processor =>
  unified()
    .use(parseText)
    .use(
      magicStrings({ ...opts, replacements: { '\\d\\d\\d\\d': () => '***' } })
    )
    .use(renderText)

const createMarkdownProcessor = (opts: ProcessorOpts): Processor =>
  unified()
    .use(parse)
    .use(dedupLinks(opts))
    .use(brokenLinks(opts))
    .use(fetchStars(opts))
    .use(stringify, {
      bullet: '*',
      listItemIndent: 1
    })
    .use(createToc(opts))
    .use(sortByStars(opts))
    .use(createGitContributors(opts))
    .use(createAddLicense(opts))

const createProcessor = (opts: ProcessorOpts) => async (
  content: string
): Promise<string> => {
  const textProcessor = createTextProcessor(opts)
  const markdownProcessor = createMarkdownProcessor(opts)
  return markdownProcessor.process(await textProcessor.process(content))
}

export { createProcessor, createMarkdownProcessor, createTextProcessor }
