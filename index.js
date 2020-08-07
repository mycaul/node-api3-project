const server = require('./server');

const port = 8000
server.listen(port, () => {
    console.log(`\n === API Server listening on port: ${port} === \n`)
})