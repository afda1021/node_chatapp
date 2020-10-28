'use strict';

module.exports = function (server) {

    const socketIo = require('socket.io')(server, { wsEngine: 'ws' });
    const io = socketIo.listen(server);
    var socketID = {};
    var socketid = new Array();

    io.sockets.on('connection', function (socket) {
       // 入室モジュールの呼出
       require('./enter')(socket, socketID, socketid);
               
        // 投稿モジュールの呼出
        require('./publish')(socket, io);

        require('./private')(socket, io, socketID)
        
        require('./memo')(socket, io, socketID)

        // 退室モジュールの呼出
        require('./exit')(socket, socketID);
    });
};
