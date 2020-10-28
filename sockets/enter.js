'use strict';

module.exports = function (socket, socketID, socketid) {
    // 入室メッセージをクライアントに送信する
    socket.on('clientInRoom', function (data) {
        if(socketID[data] == null){
            socketid[data]=[];
            socketid[data].push(socket.id);
            socketID[data]=socketid[data];
            socket.broadcast.emit('serverGetClientInRoom', data+'さんが入室しました');
        }
        else {
            socketid[data].push(socket.id);
            socketID[data]=socketid[data];
        }
    });
};
