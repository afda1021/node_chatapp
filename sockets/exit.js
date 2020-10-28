'use strict';

module.exports = function (socket, socketID) {
    // 退室メッセージをクライアントに送信する
    socket.on('clientOutRoom', function (data) {
        var index = socketID[data].indexOf(socket.id);
        if(index >= 0){
            socketID[data].splice(index, 1);
        }
        if(socketID[data].length === 0){
            socket.broadcast.emit('serverGetClientOutRoom', data+'さんが退出しました');
            socketID[data] = null;
        }
        console.log(socketID[data]);
    });
};
