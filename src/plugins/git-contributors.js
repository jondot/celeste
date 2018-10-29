import gitContributors from 'remark-git-contributors'
import type { ProcessorOpts } from '../types'

export default ({
  plugins: { gitContributors: gitContributorsConfig }
}: ProcessorOpts) => {
  if (!gitContributorsConfig) {
    return () => {}
  }
  return () => gitContributors(gitContributorsConfig)
}
