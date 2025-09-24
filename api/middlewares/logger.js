export default function logger(req, res, next) {
  const timestamp = new Date().toISOString()
  const method = req.method
  const url = req.originalUrl || req.url
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress

  console.log(`[${timestamp}] ${method} ${url} from ${ip}`)
  next()
}