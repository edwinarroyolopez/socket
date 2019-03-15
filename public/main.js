const socket = io.connect('http://localhost:8000', { 'forceNew': true });

socket.on('messages', (data) => {
  console.log(data);
  render(data);
})

function render(data) {
  let html = data.map( (message, index) =>{
      return(`<div>
                <strong>${message.author}</strong>:
                <em>${message.text}</em>
              </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  let payload = {
    author: document.getElementById('username').value,
    text: document.getElementById('text').value
  };
  console.log('submit');
  socket.emit('new-message', payload );
  return false;
}
