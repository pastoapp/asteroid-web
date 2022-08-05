/**
 * This file handles the server side rendering of the pages.
 */
import express from 'express'
import compression from 'compression'
import { renderPage } from 'vite-plugin-ssr'

const isProduction = process.env.NODE_ENV === 'production'
const root = `${__dirname}/..`

startServer()

/**
 * Starts the server. See https://vite-plugin-ssr.com/file-structure
 */
async function startServer() {
  const app = express()

  app.use(compression())

  if (isProduction) {
    const sirv = require('sirv')
    app.use(sirv(`${root}/dist/client`))
  } else {
    const vite = require('vite')
    const viteDevMiddleware = (
      await vite.createServer({
        root,
        server: { middlewareMode: 'ssr' },
      })
    ).middlewares
    app.use(viteDevMiddleware)
  }
  app.get('*', async (req, res, next) => {
    const url = req.originalUrl
    const pageContextInit = {
      url,
    }
    const pageContext = await renderPage(pageContextInit)
    const { httpResponse } = pageContext
    if (!httpResponse) return next()
    const { body, statusCode, contentType } = httpResponse
    res.status(statusCode).type(contentType).send(body)
  })

  // set default port
  const port = process.env.PORT || 5371
  app.listen(port)
  console.log(`Server running at http://localhost:${port}`)
}
