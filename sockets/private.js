'use strict';

module.exports = function (socket, io, socketID) {
    // 投稿メッセージを送信する
    socket.on('sendprivateMessageEvent', function (data, name, date, targetname) {
        if(data === ''){
            return false;
        }
        if(socketID[targetname] != null){
            socketID[targetname].forEach(function (value) {
                console.log(name + 'の入力：' + data+ 'for'+ value);
                io.to(value).emit('receiveprivateMessageEvent', data, name, date, targetname);
            });
            socketID[name].forEach(function (value) {
                console.log(name + 'の入力：' + data+ 'for'+ value);
                io.to(value).emit('receiveprivateMessageEvent', data, name, date, targetname);
            });
        }
        else {
            io.to(socketID[name]).emit('userNotfoundEvent');
            return false;
        }
    });
};