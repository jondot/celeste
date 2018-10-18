import visit from 'unist-util-visit'
import PQueue from 'p-queue'
import got from 'got'
import cheerio from 'cheerio'
import { starsFromLink, starsToLink } from '../ast'
import type { ProcessorOpts } from '../types'

const fetchStars = ({ log }: ProcessorOpts) => () => (node: any) => {
  const queue = new PQueue({ concurrency: 4 })
  visit(node, 'link', link => {
    const { url } = link
    if (!url || !url.match(`https://github.com/([^/]*?)/([^/]*?)/?$`)) return
    queue
      .add(() => got(url))
      .then(({ body }) => {
        const $ = cheerio.load(body)
        const stars = parseInt(
          $('.js-social-count')
            .text()
            .toString()
            .replace(',', '')
            .trim(),
          10
        )
        if (stars > 0) {
          const { desc, stars: oldStars } = starsFromLink(link)
          if (desc && oldStars) {
            starsToLink(link, { desc, stars: stars.toString() })
            // eslint-disable-next-line

            const from = parseInt(oldStars, 10)
            log({
              type: 'plugins/fetch-stars/update',
              level: 'info',
              payload: {
                title: link.children[0].value,
                diff: stars - from,
                from,
                to: stars
              }
            })
          }
        }
      })
      .catch(res => {
        log({
          type: 'plugins/fetch-stars/url-error',
          level: 'error',
          payload: {
            url,
            res
          }
        })
      })
  })
  return queue.onEmpty()
}

export default fetchStars
