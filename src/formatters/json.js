import type { LogMessage } from '../types'

export default (msg: LogMessage) => console.log(JSON.stringify(msg))
