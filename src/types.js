export type LogMessage = {
  path?: String,
  type: string,
  level: 'debug' | 'info' | 'error' | 'warn',
  payload: any
}
export type Processor = {
  +process: (text: string) => string
}
export type Formatter = (msg: LogMessage) => void
export type Logger = {
  +log: Formatter,
  errors: Array<LogMessage>
}
export type ProcessorOpts = {
  logger: Logger,
  processors: { [string]: [string] },
  plugins: { [string]: { [string]: any } },
  publishers: { [string]: { [string]: any } },
  fetch: (str: string) => Promise<any>
}
export type PublishParams = {
  contents: string,
  path: string,
  messages: [string]
}

export type MagicStringsOpts = ProcessorOpts & {
  replacements: { [string]: (string) => string }
}
export type LinkNode = {
  stars: string,
  desc: string
}
