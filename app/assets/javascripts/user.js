$(function(){
  var search_list = $("#user-search-result");

  function appendUser(user) {
    var html = ` <div class="chat-group-user clearfix">
    <p class="chat-group-user__name">${user.name}</p>
    <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</div>
  </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(user){
    var html = `
    <div class="chat-group-user clearfix">
     <p class="chat-group-user__name">${msg}</p>
    </div>`
    search_list.append(html);
  }

  function appendUserName(name, id){
    var html  = `
              <div class='chat-group-user clearfix js-chat-member' data-id='${ id }'>
              <input name='group[user_ids][]' type='hidden' value='${id}'>  
              <p class='chat-group-user__name'>${ name }</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
            </div>
            `
    $(".chat-group-users.js-add-user").append(html)
  }

  $(document).on("click", ".user-search-add",function(){
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
    $(this).parent().remove();
    
    appendUserName(name, id)
  });

  $(document).on("click", ".user-search-remove",function(){
    $(this).parent().remove();
    var name = $(this).data("user-name");
    var id = $(this).data("user-id");
  });
  
  $("#user-search-field").on("keyup", function(){
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input},
      dataType: 'json'
    })
    .done(function(users){
      if (users.length === 0 ) {
        $("#user-search-result").empty();
       }
      else if (input.length !== 0){    
        $('#user-search-result').empty();
        users.forEach(function(user){
          appendUser(user)
        });
      }
      else {
        $('#user-search-result').empty();
        appendErrMsgToHTML("一致する名前はありません");
      }
    })
    .fail(function(){
      alert('検索に失敗しました');
    })
  });
});