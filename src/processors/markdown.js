import unified from 'unified'
import parse from 'remark-parse'
import stringify from 'remark-stringify'
import type { Processor, ProcessorOpts } from './types'
import {
  sortByStars,
  fetchStars,
  dedupLinks,
  createToc,
  createAddLicense,
  createGitContributors,
  brokenLinks
} from '../plugins'

export default (opts: ProcessorOpts): Processor =>
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
