import got from 'got'

export default (cache: { [string]: string }) => (url: string) => {
  if (cache[url]) {
    return Promise.resolve(cache[url])
  }
  return got(url)
}
