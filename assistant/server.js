const app = require('http');

app.createServer().listen(3001, () => {
  console.log('Server started at: http://localhost:3001/');
})