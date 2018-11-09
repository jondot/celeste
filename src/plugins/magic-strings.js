import visit from 'unist-util-visit'
import L from 'lodash'
import type { MagicStringsOpts } from '../types'

const magicStrings = ({
  logger: { log },
  plugins: { magicStrings: magicStringsConfig }
}: MagicStringsOpts) => () => (node: any, vfile: any) => {
  if (!magicStringsConfig) {
    return null
  }
  const { replacements } = magicStringsConfig

  visit(node, 'TextNode', t => {
    const k = L.find(Object.keys(replacements), r => t.value.match(r))
    if (k != null) {
      vfile.message('found magic string', t.position)
      log({
        type: 'magic-strings/flagged',
        level: 'warn',
        payload: { value: t.value, position: t.position }
      })
      // eslint-disable-next-line
      t.value = replacements[k](t.value, k)
    }
  })
  return null
}

export default magicStrings
