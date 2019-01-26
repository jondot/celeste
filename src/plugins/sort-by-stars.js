import L from 'lodash'
import { starsFromLink } from '../ast'
import type { ProcessorOpts } from '../types'

const sortByStars = ({
  logger: { log },
  plugins: { sortByStars: sortByStarsConfig }
}: ProcessorOpts) => {
  if (!sortByStarsConfig) {
    return () => null
  }
  function sortByStarsFn() {
    const self: any = this
    const {
      Compiler: {
        prototype: { visitors }
      }
    } = self
    const { list: original } = visitors

    visitors.list = function list(node) {
      // eslint-disable-next-line
      node.children = L.sortBy(node.children, listItem => {
        // TODO: search for first link within listItem instead of hardcoding
        const link = listItem.children[0].children.find(l => l.type === 'link')
        if (link.type === 'link') {
          const { desc, stars } = starsFromLink(link)
          if (stars.length > 0) {
            const s = -1 * parseInt(stars, 10)
            return s
          }

          log({
            type: 'sort-by-stars/exclude-link',
            level: 'debug',
            payload: { title: desc, url: link.url }
          })
          return 0
        }
      })
      // eslint-disable-next-line
      return original.apply(this, arguments)
    }
  }
  return sortByStarsFn
}
export default sortByStars
