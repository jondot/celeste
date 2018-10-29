import chalk from 'chalk'
import type { LogMessage } from '../types'

const levels = {
  info: { icon: 'ℹ', color: chalk.white },
  debug: { icon: '…', color: chalk.gray },
  warn: { icon: '⚠', color: chalk.yellow },
  error: { icon: '✖', color: chalk.red }
}
const printWithMessage = (msg: LogMessage) => (str: string) =>
  levels[msg.level].color(`${levels[msg.level].icon} [${msg.type}] ${str}`)

const formatMessage = (msg: LogMessage): string => {
  const print = printWithMessage(msg)
  switch (msg.type) {
    case 'fetch-stars/update':
      return print(
        `${msg.payload.title}\t +${msg.payload.diff} (${msg.payload.from} -> ${
          msg.payload.to
        })`
      )

    case 'fetch-stars/url-error':
      return print(`${msg.payload.url} ${msg.payload.res}`)

    case 'broken-links/url-error':
      return print(`${msg.payload.url} ${msg.payload.res}`)

    case 'sort-by-stars/exclude-link':
      return print(`excluding <${msg.payload.link}>`)

    case 'magic-strings/flagged':
      return print(
        `found '${msg.payload.value}' at Ln ${
          msg.payload.position.start.line
        }, Col ${msg.payload.position.start.column}`
      )

    case 'celeste':
      return print(`<${msg.payload.err}>`)

    default:
      return `no formatter for: ${msg.type}`
  }
}

const format = (msg: LogMessage) => {
  console.log(formatMessage(msg))
}
export default format
