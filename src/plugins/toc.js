import toc from 'remark-toc'
import type { ProcessorOpts } from '../types'

export default ({ plugins: { toc: tocConfig } }: ProcessorOpts) => {
  if (!tocConfig) {
    return () => {}
  }
  return toc
}
