export type LogMessage = {
  type: string,
  level: 'debug' | 'info' | 'error' | 'warn',
  payload: any
}
export type ProcessorOpts = {
  log: (msg: LogMessage) => void,
  plugins: { [string]: { [string]: any } },
  fetch: (str: string) => Promise<any>
}
export type MagicStringsOpts = ProcessorOpts & {
  replacements: { [string]: (string) => string }
}
export type LinkNode = {
  stars?: string,
  desc?: string
}
