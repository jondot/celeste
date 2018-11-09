// $FlowFixMe
import Octokit from '@octokit/rest'
import type { ProcessorOpts, PublishParams } from '../types'

const b64 = c => Buffer.from(c.toString()).toString('base64')

const createGitPublisher = ({
  logger: { log },
  publishers: { github }
}: ProcessorOpts) => async (params: PublishParams) => {
  if (!github) {
    return
  }

  if (!params.path || !params.content) {
    throw new Error(`Not all params given ${JSON.stringify(params)}`)
  }

  const { auth, context, client } = github
  const gh = new Octokit(client || {})
  if (auth) {
    gh.authenticate(auth)
  }
  log({
    level: 'info',
    type: 'git-publisher/publishing',
    payload: {
      path: params.path,
      len: params.content.length
    }
  })
  const content = await gh.repos.getContent({
    ref: 'master',
    ...context,
    path: params.path
  })

  await gh.repos.updateFile({
    ref: 'master',
    ...context,
    sha: content.data.sha,
    path: params.path,
    content: b64(params.content),
    message: params.message || context.defaultCommitMessage
  })
  log({
    level: 'info',
    type: 'git-publisher/done',
    payload: {
      path: params.path
    }
  })
}

export default createGitPublisher
