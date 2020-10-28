'use strict';

// socket.ioの処理開始
const socket = io.connect();


//////////
//リプライ用の変数
let publish_id = 0;
let memo_id = 0;
let parent = null;
//////////
//リプライ用の関数
//何もない場所をクリックした場合、リプライ用のテキストエリアが表示されていればそれを削除する。
$(document).click(function(event){
    //console.log('click');
    if(!$(event.target).is('#reply_message, #reply_publish, .reply_btn')){
        cancel_reply();
    }
    if(!$(event.target).is('.menu, .option_btn, .menu-list')){
        console.log("not menu");
        cancel_menu();
    }
});
//////////
//Ctrl+Enter,Shift+Enter用の変数
let onFocus = true;
let selectedTextarea = null;
//////////