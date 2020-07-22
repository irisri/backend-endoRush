
module.exports = connectSockets
const userIdToSocketMap = {}

function sendMsg(userId,msg){
    // const socket = userIdToSocketMap[userId]
    socket.emit('chat addMsg', msg)
}
function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg=>{
            console.log(msg)
            //everyone
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            //  io.to(socket.destUser).emit('chat addMsg', msg)
             socket.emit('chat addMsg', msg)

             io.to(socket.destEvento).emit('chat addMsg', msg)
            // io.emit('chat receivedMsg', msg);

             
        })
        // socket.on('to user', userName=>{
        //     if (socket.destUser) {
        //         socket.leave(socket.destUser)
        //     }
        //     socket.join(userName)
        //     socket.destUser = userName;
        // })

        socket.on('identify', userId=>{
 
            userIdToSocketMap[userId]=socket
        })

        socket.on('of evento', eventoId=>{
            if (socket.destEvento) {
                socket.leave(socket.destEvento)
            }
            socket.join(eventoId)
            console.log('evId',eventoId)
            socket.destEvento = eventoId;
        })
    })
}



