'use strict';

module.exports = function (socket, io, socketID) {
    // 投稿メッセージを送信する
    socket.on('sendMemoEvent', function (data, name, date, memo_id) {
        socketID[name].forEach( function (value) {
            io.to(value).emit('receiveMemoEvent', data, name, date, memo_id);
        });
        return false;
    });
};