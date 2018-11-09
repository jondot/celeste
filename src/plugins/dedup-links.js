import visit from 'unist-util-visit'
import type { ProcessorOpts } from '../types'

const brokenLinks = ({
  logger: { log },
  plugins: { dedupLinks: dedupLinksConfig }
}: ProcessorOpts) => () => (node: any) => {
  if (!dedupLinksConfig) {
    return null
  }
  const linkmap: { [string]: boolean } = {}
  visit(node, 'link', link => {
    const { url } = link
    if (linkmap[url]) {
      log({
        type: 'dedup-links/dupe',
        level: 'error',
        payload: {
          url
        }
      })
    }
    linkmap[url] = true
  })
}

export default brokenLinks
