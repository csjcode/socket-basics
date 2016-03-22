var socket = io();
socket.on('connect',function () {
   console.log('Connected to socket.io sever!');
});

socket.on('message',function (message) {
   console.log('New message:');
   console.log(message.text);
});

// handles submitting of new message
var $form = jQuery('#message-form');



$form.on('submit',function(event) {
   event.preventDefault();

   var $message = $form.find('input[name=message]');

   socket.emit('message',{
      text:$message.val()
   });

   $message.val('');

});
