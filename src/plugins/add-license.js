import license from 'remark-license'
import type { ProcessorOpts } from '../types'

export default ({
  log,
  plugins: { addLicense: addLicenseConfig }
}: ProcessorOpts) => {
  if (!addLicenseConfig) {
    return () => {}
  }
  return () => {
    try {
      return license(addLicenseConfig)
    } catch (err) {
      log({
        type: 'add-license/error',
        level: 'error',
        payload: { err }
      })
    }
  }
}
