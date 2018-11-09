// $FlowFixMe
import fs from 'fs-extra'
import type { ProcessorOpts, PublishParams } from '../types'

const createFilePublisher = ({
  logger: { log },
  publishers: { file }
}: ProcessorOpts) => async (params: PublishParams) => {
  if (!file) {
    return
  }
  if (!params.path || !params.content) {
    throw new Error(`Not all params given ${JSON.stringify(params)}`)
  }

  log({
    level: 'info',
    type: 'file-publisher/publishing',
    payload: {
      path: params.path,
      len: params.content.length
    }
  })
  // write to temp file and move
  await fs.writeFile(params.path, params.content)
  log({
    level: 'info',
    type: 'file-publisher/done',
    payload: {
      path: params.path
    }
  })
}

export default createFilePublisher
