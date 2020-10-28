'use strict';

// プライベートメッセージをサーバに送信する
function private_message() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    //送信先のユーザ名を取得
    const targetName = $('#private_name').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿文が空、空行、スペースのときは投稿不可
    if(message === '' || !message.match(/\S/g)){
        alert("空欄では投稿できません");
        return false;
    }
    // 投稿内容を送信
    const date = new Date();
    socket.emit('sendprivateMessageEvent', message, userName, date.toLocaleString(), targetName);
    $('#message').val('');
    return false;
};

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveprivateMessageEvent', function (data, name, date, targetname) {
    const MyName = $('#userName').val();
    if(MyName === name || MyName === targetname){
        const id = name+"_"+targetname;
        $('#thread').prepend(`<div id=${id}></div>`);
        $(`#${id}`).append(`<div id=${id+"_main"} class="privatemessage"></div>`);
        $(`#${id}_main`).append('<p>' + name + '==>' + targetname + '(' + date + ')<br>' + data + '</p>');
        $(`#${id}`).append(`<div id=${id+"_reply"} class="reply"></div>`);
        $(`#${id}_reply`).append(`<div id=${id+"_reply_publish"} class="reply_publish"></div>`);
    }

});

socket.on('userNotfoundEvent', function(){
    alert("ユーザが見つかりません");
});