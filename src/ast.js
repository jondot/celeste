import type { LinkNode } from './types'

const starsFromLink = (link: any): LinkNode => {
  const text = link.children[0].value
  const res = text.match(`(.* )★(.*)`)
  if (res) {
    const [, desc, stars] = res
    return { desc, stars: stars || '0' }
  }
  return {}
}

const starsToLink = (link: any, { desc, stars }: LinkNode) => {
  // if (desc && stars) {
  // eslint-disable-next-line
  link.children[0].value = `${desc}★${stars}`
  // }
  return link
}

export { starsToLink, starsFromLink }
