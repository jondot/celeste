export type LogMessage = {
  type: string,
  level: 'debug' | 'info' | 'error',
  payload: any
}
export type ProcessorOpts = {
  log: (msg: LogMessage) => void
}
export type LinkNode = {
  stars?: string,
  desc?: string
}
