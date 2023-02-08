import express from "express";
import express_WS from "express-ws"
const app = express()
const expressWs = express_WS(app)
const PORT = 5555

const aWss = expressWs.getWss()

const init = () => {
  bindEvent()
}

const bindEvent = () => {
  app.ws("/", function (ws, res, next) {
    ws.on('open', handleOpen)
    ws.on('close', handleClose)
    ws.on('error', handleError)
    ws.on('connection', handleConnection(ws))
  })
}

const handleOpen = () => {
  console.log("webSocket连接");
}
const handleClose = () => {
  console.log("webSocket关闭");
}
const handleError = () => {
  console.log("webSocket错误");
}

const handleConnection = (ws) => {
  console.log("webSocket连接成功");
  ws.on('message', handleMessage)
}

const handleMessage = (msg) => {
  console.log("client-Msg", msg);
  aWss.clients.forEach(client => {
    client.send(msg)
  })
}
init()

app.listen(PORT, function (err) {
  console.log(`ws://localhost${PORT} server is running`);
})