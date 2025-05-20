import { Server } from 'socket.io'

export function setupSocketServer (server, compiler) {
  const io = new Server(server)

  // 🔁 Escucha cuando Webpack recompila
  compiler.hooks.done.tap('webpackReloadPlugin', () => {
    console.log('🔁 Webpack recompilado, emitiendo "reload"')
    io.emit('reload') // enviar evento a todos los clientes conectados
  })

  io.on('connection', socket => {
    console.log('🟢 Cliente conectado')

    socket.on('disconnect', () => {
      console.log('🔴 Cliente desconectado')
    })
  })

  return io
}
