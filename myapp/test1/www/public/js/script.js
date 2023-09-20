'use strict';

$(function() {

    if ($('#sample2').length > 0) {

        //初回表示を作成
        $.ajax({
            url:'http://localhost:3000/api/read'
        })
        .done((json) => {
            const contents = document.querySelector('#contents');
            contents.innerHTML = '<tr class="table-primary"><th>メッセージ</th></tr>';
            json.contents.forEach(line => {
              contents.innerHTML += ('<tr><td>' + line + '</td></tr>');
            });
         })
        .fail((error) => { console.log(error); });

        //送信ボタンクリックを作成
        $('#submit_click').on('click', () => {
            const data = Object.fromEntries(new FormData(document.forms.myform));
            $.ajax({
                url:'http://localhost:3000/api/update',
                type: 'POST',
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(data)
            })
            .done((json) => {
                const contents = document.querySelector('#contents');
                contents.innerHTML = '<tr class="table-primary"><th>メッセージ</th></tr>';
                json.contents.forEach(line => {
                  contents.innerHTML += ('<tr><td>' + line + '</td></tr>');
                });
            })
            .fail((error) => { console.log(error); })
            .always(() => { document.querySelector('#message').value = ''; });
        });

    }

})