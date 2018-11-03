import visit from 'unist-util-visit'
import PQueue from 'p-queue'
import type { ProcessorOpts } from '../types'

const brokenLinks = ({
  logger: { log },
  fetch,
  plugins: { brokenLinks: brokenLinksConfig }
}: ProcessorOpts) => () => (node: any) => {
  if (!brokenLinksConfig) {
    return null
  }
  const queue = new PQueue({ concurrency: 4 })
  let counter = 0

  visit(node, 'link', link => {
    const { url } = link
    if (!url || !url.match(`https?://.*`)) return
    queue
      .add(() => fetch(url))
      .then(() => {
        counter += 1
        if (counter % 10 === 0) {
          log({
            type: 'broken-links/progress',
            level: 'info',
            payload: {
              counter
            }
          })
        }
      })
      .catch(res => {
        log({
          type: 'broken-links/url-error',
          level: 'error',
          payload: {
            url,
            res
          }
        })
      })
  })
  return queue.onIdle()
}

export default brokenLinks
