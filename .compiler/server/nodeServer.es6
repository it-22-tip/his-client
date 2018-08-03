'use-strict'

import Promise from 'bluebird'
import Koa from 'koa'
import serve from 'koa-static'
import { ServerPath } from '../constant'
import { createServer } from 'http'
import socketIO from 'socket.io'

const nodeServer = function () {
  const app = new Koa()
  app.use(async (ctx, next) => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
    await next()
  })
  app.use(serve(ServerPath))
  const server = createServer(app.callback())
  const io = socketIO(server)

  io.on('connection', function (socket) {
    console.log('connected')
    socket.on('chat', function(msg){
        console.log(msg)
        io.emit('chat', msg + "222222")
    })
  })
  server.listen(4500)
  return Promise.resolve()
}

export default nodeServer
