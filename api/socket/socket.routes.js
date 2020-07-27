
module.exports = connectSockets
const userIdToSocketMap = {}

function connectSockets(io) {
    io.on('connection', socket => {
        socket.on('newMsg', msg => {
            // emits only to sockets in the same room
            io.to(socket.destUser).emit('sentMsg', msg)
            io.to(socket.destEvento).emit('sentMsg', msg)  
        })   

        socket.on('chat msg',msg =>{
            io.to(socket.userToRoom).emit('chat newMsg', msg) 
        })

        socket.on('of evento', eventoId => {
            if (socket.destEvento) {
                socket.leave(socket.destEvento)
            }
            socket.join(eventoId)
            socket.destEvento = eventoId;
        })
        socket.on('to user', ownerId => {
            if (socket.destUser) {
                socket.leave(socket.destUser)
            }
            socket.join(ownerId)
            socket.destUser = ownerId;
        })

        socket.on("chat join", payload =>  {
            socket.join(payload.eventoId);
            socket.userToRoom = payload.eventoId
        })



        // socket.on('evento room', userId => {
        //     userIdToSocketMap[ownerId] = socket;
        //     if (socket.destUser) {
        //         socket.leave(socket.destUser)
        //     }
        //     socket.join(ownerId)
        //     socket.destUser = ownerId;
        // })
     
    })
}


// function sendMsg(socket,msg){
//     // const socket = userIdToSocketMap[userId]
//     io.to(socket).emit('chat addMsg', msg)
//     // socket.emit('chat addMsg', msg)
// }
// // socket.on('identify', userId=>{
// //     userIdToSocketMap[userId]=socket
// // })






