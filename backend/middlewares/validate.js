export default function logger(req, res, next) {
  const timestamp = new Date().toISOString()
  const method = req.method
  const url = req.originalUrl
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress

  console.log(`📡 [${timestamp}] ${method} ${url} – IP: ${ip}`)
  next()
}