const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let messages = [{
    id:1,
    text: "This is message content",
    author: "Ed"
}];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).send("Hello World!");
} )

io.on('connection', (socket) =>{
  console.log('Someone is connect with socket');
  socket.emit('messages',messages)


  socket.on('new-message', (data) => {
    console.log(data);
    messages.push(data);
    io.sockets.emit('messages', messages);
  })
});


server.listen(8000, () => {
  console.log("Servidor corriendo en http://localhost:8000");
})
