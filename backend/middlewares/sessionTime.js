// middleware/sessionTime.js

export function setRemainingSessionTime (req, res, next) {
  if (req.session && req.session.user && req.session.cookie?.expires) {
    const currentTime = new Date()
    const remainingTime = req.session.cookie.expires - currentTime
    res.locals.remainingSessionTime = remainingTime
  }
  next()
}

export function sessionTimeEndpoint (req, res) {
  if (req.session && req.session.user && req.session.cookie?.expires) {
    const currentTime = new Date()
    const remainingTime = req.session.cookie.expires - currentTime
    return res.json({ remainingSessionTime: remainingTime })
  } else {
    return res.status(401).json({ error: 'Sesión no válida o expirada' })
  }
}
