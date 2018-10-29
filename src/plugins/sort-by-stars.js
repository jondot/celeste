import L from 'lodash'
import { starsFromLink } from '../ast'
import type { ProcessorOpts } from '../types'

const sortByStars = ({
  log,
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
        const link = listItem.children[0].children[0]
        if (link.type === 'link') {
          const { stars } = starsFromLink(link)
          if (stars) {
            const s = -1 * parseInt(stars, 10)
            return s
          }

          log({
            type: 'sort-by-stars/exclude-link',
            level: 'debug',
            payload: { link }
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
