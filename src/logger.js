import type { LogMessage, Formatter } from './types'

export default class {
  errors: Array<LogMessage> = []

  formatter: Formatter = () => {}

  constructor(formatter: Formatter) {
    this.formatter = formatter
  }

  log = (msg: LogMessage) => {
    if (msg.level === 'error') {
      this.errors.push(msg)
    }
    this.formatter(msg)
  }
}
