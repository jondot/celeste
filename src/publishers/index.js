import createFilePublisher from './file'
import createGitPublisher from './git'
import type { ProcessorOpts, PublishParams } from '../types'

const createPublisher = (opts: ProcessorOpts) => {
  const fp = createFilePublisher(opts)
  const gp = createGitPublisher(opts)
  return async (params: PublishParams) => {
    await fp(params)
    await gp(params)
  }
}

export { createPublisher, createFilePublisher, createGitPublisher }
