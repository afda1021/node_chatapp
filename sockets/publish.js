'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessageEvent', function (data, name, date, publish_id) {

        if(data === ''){
            return false;
        }
        //console.log(name + 'の入力：' + data);
        io.sockets.emit('receiveMessageEvent', data, name, date, publish_id);

    });

    socket.on('sendReplyEvent', function(data, name, date, parent, publish_id){
        if(data === ''){
            return false;
        }
        io.sockets.emit('receiveReplyEvent', data, name, date, parent, publish_id);
    });
    socket.on('sendRemoveEvent', function(id){
        console.log(id);
        if(id === ''){
            return false;
        }
        io.sockets.emit('receiveRemoveEvent', id);
    });
};
