import unified from 'unified'
import parse from 'remark-parse'
import stringify from 'remark-stringify'
import type { ProcessorOpts } from './types'
import sortByStars from './plugins/sort-by-stars'
import fetchStars from './plugins/fetch-stars'
import createToc from './plugins/toc'

const createProcessor = (opts: ProcessorOpts) =>
  unified()
    .use(parse)
    .use(fetchStars(opts))
    .use(createToc())
    .use(stringify, {
      bullet: '*',
      listItemIndent: 1
    })
    .use(sortByStars(opts))

export default createProcessor
