$(function(){
  function buildHTML(message){
    var img = message.image.url ? `<img src= ${ message.image.url }>` : "";
    
    var html =  `<div class="message-box"> 
                  <div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name"> 
                        ${message.name}
                      </div>
                      <div class="upper-message__date"> 
                        ${message.created_at} 
                      </div> 
                    </div> 
                    <div class="lower-message">
                      <div class="lower-message__content"> 
                        ${message.content}
                      </div>
                      <div class="lower-message__image"> 
                        ${img} 
                      </div>  
                    </div>
                  </div>
                </div>`

                 return html;
                 
  }

  $("#new_message").on("submit", function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');

    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })

    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html)
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight })
      $('form').get(0).reset();
      $('input').prop('disabled', false);
      
    })
    .fail(function(){
      alert('ユーザー検索に失敗しました');
    });
  });
});


