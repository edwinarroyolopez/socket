const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const mysql = require('mysql');


let messages = [{
    id:1,
    text: "This is message content",
    author: "Ed"
}];

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.status(200).send("Hello World!");
} )

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "abcd1234",
  database: "bitnami_pm",
  port: 3307
});

let lastInitialId =  initialState();
/*
    add field for email confirm
*/


io.on('connection', (socket) =>{
  console.log('Someone is connect with socket');
  socket.emit('messages',messages)


  socket.on('new-message', (data) => {
    console.log(data);
    messages.push(data);
    io.sockets.emit('messages', messages);
  })

    let newRecord =  checkIfNewRecordHasBeenAdd(lastInitialId);
    console.log(newRecord);
    console.log(lastInitialId);
    if(newRecord){

    }else {
      console.log('No hay registros nuevos');
    }

    // con.query('SELECT * FROM alertasInformacion;',
  	// 	function(err, rows) {
  	// 		if(err) throw err;
  	// 		console.log(rows);
    //     // con.end(); /* close connection */
  	// 	}
  	// );

});

 async function initialState() {
    let result = await resolveLastId();
    console.log('initialState: ',result);
    return result;
}

function resolveLastId(){
  return new Promise(resolve => {
    con.query('SELECT MAX(idAlerta) as lastId FROM alertasInformacion;',
      (err, rows) => {
        if(err) throw err;
         resolve(rows[0].lastId);
        // con.end(); /* close connection */
      }
    );
  })
}

async function  checkIfNewRecordHasBeenAdd (id){
  let result = await resolveLastId();
  let lastId = await id;
  let status = false;

  if(result>lastId){
    status = true;
  }

  console.log('result: ',result);
  console.log("last:",lastId);
  console.log('status',status);
}


server.listen(8000, () => {
  console.log("Servidor corriendo en http://localhost:8000");
})
