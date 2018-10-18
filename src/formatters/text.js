import type { LogMessage } from '../types'

const formatMessage = (msg: LogMessage): string => {
  switch (msg.type) {
    case 'plugins/fetch-stars/update':
      return `${msg.payload.title}\t +${msg.payload.diff} (${
        msg.payload.from
      } -> ${msg.payload.to})`
    case 'plugins/fetch-stars/url-error':
      return `error: ${msg.payload.url} ${msg.payload.res}`

    case 'plugins/sort-by-stars/exclude-link':
      return `excluding ${msg.payload.link}`

    default:
      return `no formatter for: ${msg.type}`
  }
}

const format = (msg: LogMessage) => {
  console.log(formatMessage(msg))
}
export default format
