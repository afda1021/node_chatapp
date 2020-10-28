'use strict';

// メモを画面上に表示する
function memo() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿文が空、空行、スペースのときは投稿不可
    if(message === '' || !message.match(/\S/g)){
        alert("空欄では投稿できません");
        return false;
    }
    // 投稿日時
    const date = new Date();
    // メモの内容を表示
    socket.emit('sendMemoEvent', message, userName, date.toLocaleString(), memo_id);
    $('#message').val('');
    return false;
}

socket.on('receiveMemoEvent', function(message, name, date, memo_id){
    var id = "memo" + "_" + memo_id;
    $('#thread').prepend(`<div id=${id}></div>`);
    $(`#${id}`).append(`<div id=${id+"_main"} class="memo"></div>`);
    $(`#${id}_main`).prepend('<p>' + name + 'さんのメモ (' + date.toLocaleString() + ')<br>' + message + '</p>');
    $(`#${id}_main`).append(`<input type="button" class="common-button remove_btn" value="削除" onclick="remove('${id}')">`);
});