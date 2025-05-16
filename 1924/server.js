require('dotenv').config()
const express = require('express')
const cors = require('cors')
const nunjucks = require('nunjucks')
const { connectDB } = require('./config/db')
const http = require('http')
const crypto = require('crypto')

// Importar la función de configuración de WebSocket
const setupWebSocket = require('./webSocket')

// Configurar sesiones
const sessionConfig = require('./config/sessionConfig')

const {
  setRemainingSessionTime,
  sessionTimeEndpoint
} = require('./middlewares/sessionTime')
// Importar rutas
const authRoutes = require('./routes/authRoutes')
const profileRoutes = require('./routes/profileRoutes')
const accountRoutes = require('./routes/accountRoutes')
const apiRoutes = require('./routes/apiRoutes')
const crudRoutes = require('./routes/crudRoutes')
const pageRoutes = require('./routes/pageRoutes')

// Inicializar Express
const app = express()
const port = process.env.PORT || 3000

// Configurar sesiones
app.use(sessionConfig())

// Configurar middleware
app.use(express.static('public'))
app.use(express.json())
app.use(cors())

// Conectar a MongoDB
connectDB()

// Configurar Nunjucks
const env = nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true
})

// ✅ Ahora sí, puedes agregar el filtro
env.addFilter('tojson', function (obj) {
  return JSON.stringify(obj)
})

// Crear servidor HTTP compartido entre Express y WebSocket
const server = http.createServer(app)

// Configurar WebSocket
setupWebSocket(server)

app.use((req, res, next) => {
  // Generar un nonce aleatorio y pasarlo a las plantillas
  res.locals.nonce = crypto.randomBytes(16).toString('base64')
  next()
})

// Rutas
app.get('/', (req, res) => {
  if (req.session && req.session.user) {
    return res.redirect('/dashboard')
  } else {
    return res.redirect('/home')
  }
})

// Usar rutas modularizadas
app.use('/api', apiRoutes, authRoutes, profileRoutes, accountRoutes, crudRoutes) // API de rutas
app.use(pageRoutes) // Rutas dinámicas
app.use(setRemainingSessionTime) // Aquí estamos usando el middleware

// Endpoint para obtener tiempo restante
// app.get('/session-time', sessionTimeEndpoint);

// Manejo de rutas no encontradas
app.use((req, res) => {
  if (req.headers.accept?.includes('application/json')) {
    return res.status(404).json({ error: 'Ruta no encontrada' })
  }
  res.status(404).send('<h1>404 - Página no encontrada</h1>')
})

// Iniciar servidor HTTP con Express y WebSocket en el mismo puerto
server.listen(port, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${port}`)
  console.log(`🔄 WebSocket activo en el mismo puerto`)
})
