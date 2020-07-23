
module.exports = connectSockets
const userIdToSocketMap = {}

function sendMsg(userId,msg){
    // const socket = userIdToSocketMap[userId]
    socket.emit('chat addMsg', msg)
}
function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('chat newMsg', msg=>{
            // console.log(msg)
            //everyone
            // io.emit('chat addMsg', msg)
            // emits only to sockets in the same room
            //  io.to(socket.destUser).emit('chat addMsg', msg)
            //  socket.emit('chat addMsg', msg)
             io.to(socket.destEvento).emit('chat addMsg', msg)
             io.to(socket.destUser).emit('chat addMsg2', msg)
             console.log('msg', msg);
             console.log('socket-user', socket.destUser);
             console.log('socket-evento', socket.destEvento);
            //  io.to(socket.destUser).emit('chat addMsg', msg)    
            // io.emit('chat receivedMsg', msg);      
        })
        socket.on('to user', userId=>{
            if (socket.destUser) {
                socket.leave(socket.destUser)
            }
            socket.join(userId)
            socket.destUser = userId;
            console.log('touser',userId)
        })
        
        socket.on('of evento', eventoId=>{
            if (socket.destEvento) {
                socket.leave(socket.destEvento)
            }
            socket.join(eventoId)
            // console.log('evId',eventoId)
            socket.destEvento = eventoId;
        })
    })
}



        // socket.on('identify', userId=>{
 
        //     userIdToSocketMap[userId]=socket
        //     console.log('back',userId,userIdToSocketMap)




        // })




