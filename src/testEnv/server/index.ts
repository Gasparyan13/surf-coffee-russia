import { DefaultBodyType, matchRequestUrl, MockedRequest } from 'msw'
import { SetupServerApi } from 'msw/node'

export const waitForRequest = (
  server: SetupServerApi,
  method: string,
  url: string | RegExp,
) =>
  new Promise<MockedRequest>((resolve, reject) => {
    let requestId = ''

    const onRequestStart = (req: MockedRequest<DefaultBodyType>) => {
      const matchesMethod = req.method.toLowerCase() === method.toLowerCase()
      const matchesUrl = matchRequestUrl(req.url, url).matches
      if (matchesMethod && matchesUrl) {
        requestId = req.id
      }
    }

    const onRequestUnhandled = (req: MockedRequest<DefaultBodyType>) => {
      if (req.id === requestId) {
        reject(
          new Error(`The ${req.method} ${req.url.href} request was unhandled.`),
        )
      }
    }

    const onRequestMatch = (req: MockedRequest<DefaultBodyType>) => {
      if (req.id === requestId) {
        server.events.removeListener('request:start', onRequestStart)
        server.events.removeListener('request:unhandled', onRequestUnhandled)
        server.events.removeListener('request:match', onRequestMatch)

        resolve(req)
      }
    }

    server.events.on('request:start', onRequestStart)
    server.events.on('request:unhandled', onRequestUnhandled)
    server.events.on('request:match', onRequestMatch)
  })

export * from 'msw/node'
