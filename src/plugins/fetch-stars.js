import visit from 'unist-util-visit'
import PQueue from 'p-queue'
import cheerio from 'cheerio'
import { starsFromLink, starsToLink } from '../ast'
import type { ProcessorOpts } from '../types'

const fetchStars = ({
  logger: { log },
  fetch,
  plugins: { fetchStars: fetchStarsConfig }
}: ProcessorOpts) => () => (node: any) => {
  if (!fetchStarsConfig) {
    return null
  }
  const queue = new PQueue({ concurrency: 4 })
  const starmap = {}
  let counter = 0

  visit(node, 'link', link => {
    const { url } = link
    if (!url || !url.match(`https://github.com/([^/]*?)/([^/]*?)/?$`)) return
    queue
      .add(() => fetch(url))
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
        starmap[url] = stars
        counter += 1
        if (counter % 10 === 0) {
          log({
            type: 'fetch-stars/progress',
            level: 'info',
            payload: {
              counter
            }
          })
        }
      })
      .catch(res => {
        log({
          type: 'fetch-stars/url-error',
          level: 'error',
          payload: {
            url,
            res
          }
        })
      })
  })
  return queue.onIdle().then(() => {
    visit(node, 'link', link => {
      const { url } = link
      const stars = starmap[url]
      if (stars) {
        const { desc, stars: oldStars } = starsFromLink(link)
        starsToLink(link, {
          desc: desc.length > 0 ? desc : `${link.url} `,
          stars: stars.toString()
        })
        const from = parseInt(oldStars, 10)
        log({
          type: 'fetch-stars/update',
          level: 'info',
          payload: {
            title: link.children[0].value,
            diff: stars - from,
            from,
            to: stars
          }
        })
      }
      return link
    })
  })
}

export default fetchStars
