const http = require('http')
const app = require('../app')
const PORT = process.env.PORT
const server = http.createServer(app)

server.listen(PORT, () => {
    console.log('Fancy-ToDo server is running on port:',PORT)
})