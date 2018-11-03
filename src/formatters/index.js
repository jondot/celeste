import text from './text'
import json from './json'
import type { Formatter } from '../types'

const formatters: { [string]: Formatter } = {
  text,
  json
}

export default formatters
