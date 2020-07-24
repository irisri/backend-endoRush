
module.exports = connectSockets
const userIdToSocketMap = {}

function sendMsg(socket,msg){
    // const socket = userIdToSocketMap[userId]
    io.to(socket).emit('chat addMsg', msg)
    // socket.emit('chat addMsg', msg)
}

// socket.on('identify', userId=>{
//     userIdToSocketMap[userId]=socket
// })

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg => {
        
            //everyone
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            console.log('destusr',socket.destUser)
             io.to(socket.destUser).emit('chat addMsg', msg)
            console.log('destev',socket.destEvento)
            io.to(socket.destEvento).emit('chat addMsg', msg)
              
        })   
        socket.on('of evento', eventoId => {
            if (socket.destEvento) {
                socket.leave(socket.destEvento)
            }
            
            socket.join(eventoId)
            socket.destEvento = eventoId;
        })

        socket.on('to user', ownerId => {
            userIdToSocketMap[ownerId] = socket;
            if (socket.destUser) {
                socket.leave(socket.destUser)
            }
            socket.join(ownerId)
            socket.destUser = ownerId;
        })
     
    })
}






