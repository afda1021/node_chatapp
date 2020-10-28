'use strict';

//並び替えで符号反転
let reverseMessage = 1;
let reverseReply = 1;

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    // 投稿文が空、空行、スペースのときは投稿不可
    if(message === '' || !message.match(/\S/g)){
        alert("空欄では投稿できません");
        return false;
    }
    // 投稿内容を送信
    const date = new Date();
    socket.emit('sendMessageEvent', message, userName, date.toLocaleString(), ++publish_id);
    $('#message').val('');
    return false;
}
 
// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessageEvent', function (data, name, date, publish_id) {
    //$('#thread').prepend('<p>' + name + 'さん (' + date + ')<br>' + data + '</p>');
    const id = name+"_"+publish_id;
    const Myname = $('#userName').val();
    if(Myname === name){
        //新しい順のとき上、古い順のとき下にコメントを追加
        if(reverseMessage === 1){
            $('#thread').prepend(`<div id=${id}></div>`);
        }else{
            $('#thread').append(`<div id=${id}></div>`);
        }
        $(`#${id}`).append(`<div id=${id+"_message"} class="message-div"></div>`);
        $(`#${id+"_message"}`).append(`<div id=${id+"_main"} class="mymessage"></div>`);
        $(`#${id}_main`).append('<p>' + name + 'さん (' + date + ')<br>' + data + '</p>');
        $(`#${id}_main`).append(`<input type="button" class="common-button option_btn" value="…" onclick="menu('${id}')">`);
        $(`#${id+"_message"}`).append(`<div id=${id+"_menu"} class="menu menu-hidden"></div>`);
        $(`#${id}_menu`).append(`<input type="button" class="menu-list reply_btn" value="返信" onclick="reply('${id}')">`);
        $(`#${id}_menu`).append(`<input type="button" class="menu-list" value="削除" onclick="remove('${id}')">`);
        $(`#${id}_menu`).append(`<input type="button" class="menu-list" value="リプライ並び替え" onclick="sort_reply('${id}')">`);
        $(`#${id}`).append(`<div id=${id+"_reply"} class="reply"></div>`);
        $(`#${id}_reply`).append(`<div id=${id+"_reply_publish"} class="reply_publish"></div>`);
        $(`#${id}_reply`).append(`<div id=${id+"_reply_sort"} class="reply_sort"></div>`);
    }
    else {
        if(reverseMessage === 1){
            $('#thread').prepend(`<div id=${id}></div>`);
        }else{
            $('#thread').append(`<div id=${id}></div>`);
        }
        $(`#${id}`).append(`<div id=${id+"_message"} class="message-div"></div>`);
        $(`#${id}_message`).append(`<div id=${id+"_main"} class="message"></div>`);
        $(`#${id}_main`).append('<p>' + name + 'さん (' + date + ')<br>' + data + '</p>');
        $(`#${id}_main`).append(`<input type="button" class="common-button option_btn" value="…" onclick="menu('${id}')">`);
        $(`#${id+"_message"}`).append(`<div id=${id+"_menu"} class="menu menu-hidden"></div>`);
        $(`#${id}_menu`).append(`<input type="button" class="menu-list reply_btn" id="${id+"_replybtn"}" value="返信" onclick="reply('${id}')">`);
        $(`#${id}_menu`).append(`<input type="button" class="menu-list" value="リプライ並び替え" onclick="sort_reply('${id}')">`);
        $(`#${id}`).append(`<div id=${id+"_reply"} class="reply"></div>`);
        $(`#${id}_reply`).append(`<div id=${id+"_reply_publish"} class="reply_publish"></div>`);
        $(`#${id}_reply`).append(`<div id=${id+"_reply_sort"} class="reply_sort"></div>`);
    }
});

//////////
//リプライメッセージをサーバーに送信する
function publish_reply(parent){
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#reply_message').val();
    // 投稿文が空、空行、スペースのときは投稿不可
    if(message === '' || !message.match(/\S/g)){
        alert("空欄では投稿できません");
        return false;
    }
    // 投稿日時
    const date = new Date();
    // 投稿内容を送信
    console.log(message, userName, date.toLocaleString());
    socket.emit('sendReplyEvent', message, userName, date.toLocaleString(), parent, ++publish_id);

    //リプライの投稿エリアを削除
    cancel_reply();
    return false;
}
//サーバから受信したリプライメッセージを画面上に表示する
socket.on('receiveReplyEvent', function(data, name, date, parent, publish_id){
    const id = name+'_'+publish_id;
    //新しい順のとき上、古い順のとき下にコメントを追加
    if (reverseReply === 1){
        $(`#${parent+"_reply_sort"}`).append(`<div id="${id}" class="message"></div>`);
    }else{
        $(`#${parent+"_reply_sort"}`).prepend(`<div id="${id}" class="message"></div>`);
    }
    $(`#${id}`).append('<p>' + name + 'さん (' + date + ')<br>' + data + '</p>');
    if(name === $('#userName').val()){
        $(`#${id}`).append(`<input type="button" class="remove_btn common-button" value="削除" onclick="remove('${id}')"></input>`);
    }
});

//返信ボタンをクリックしたらテキストエリアと投稿ボタンが表示される。
function reply(id){
    cancel_reply();
    $(`#${id}_reply_publish`).append(`<textarea id="reply_message" rows="2" class="room-message_textarea" placeholder="返信文を入力してください" onfocus="onFocus=true; selectedTextarea = 'reply_publish'" onblur="onFocus=false;"></textarea>`);
    $(`#${id}_reply_publish`).append(`<input id="reply_publish" type="button" value="投稿" class="common-button room-publish_button" onclick="publish_reply('${id}');">`);
}
//リプライ用のテキストエリアがある場合は削除する。
//別の投稿の返信ボタンを押したときや、何もないエリアをクリックした場合に実行する。
function cancel_reply(){
    $("#reply_message").remove();
    $("#reply_publish").remove();
}

//投稿したメッセージの削除
function remove(id){
    console.log(id);
    if(window.confirm('本当に削除しますか？') === true){
        socket.emit('sendRemoveEvent', id);
        //$('#'+id).remove();
    }
}
socket.on('receiveRemoveEvent', function(id){
    //console.log(id);
    $('#'+id).remove();
});

//Ctrl+Enterで投稿
document.addEventListener('keydown', (event)=>{
    //console.log('kye down');
    if(onFocus === true){
        //投稿
        if(event.ctrlKey && !event.shiftKey && event.key === 'Enter'){
            //console.log('pushed ctrl');
            if(selectedTextarea === 'message'){
                $('#publish_btn').click();
                //document.getElementById('publish').click();
            }else if(selectedTextarea === 'reply_publish'){
                $('#reply_publish').click();
            }
        }
        //メモ
        else if(event.shiftKey && !event.ctrlKey && event.key === 'Enter'){
            //console.log('pushed shift');
            if(selectedTextarea === 'message'){
                $('#memo_btn').click();
            }
        }
    }
});

//投稿文を並び替え
function sort_message(){
    $(function(){
        //thread内の全要素を取得
        const $elements = $('div#thread > *');
        //リストを全て削除
        $('div#thread').empty();
        //取得したthreadを逆順にして追加する
        $($elements.get().reverse()).each(function(){
            $('div#thread').append($(this));
        });
        reverseMessage = -reverseMessage;
    });
}

//リプライを並び替え
function sort_reply(id){
    $(function(){
        //thread内の全要素を取得
        const $elements = $(`#${id}_reply_sort > *`);
        //リストを全て削除
        $(`#${id}_reply_sort`).empty();
        //取得したthreadを逆順にして追加する  
        $($elements.get().reverse()).each(function(){
            $(`#${id}_reply_sort`).append($(this));
        });
        reverseReply = -reverseReply;
    });
}

//メニューボタン
function menu(id){
    $(`#${id}_menu`).toggleClass('menu-hidden');
}