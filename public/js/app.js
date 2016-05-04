var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');
var socket = io();
var $yourname = jQuery('.yourname');
$yourname.text(name);

jQuery('.room-title').text(room);

console.log(name + ' wants to join ' + room);
socket.on('connect', function () {
   console.log('Connected to socket.io server!');
   socket.emit('joinRoom', {
      name: name,
      room: room
   });
});

socket.on('message',function (message) {
   var momentTimestamp = moment.utc(message.timestamp);
   var $messages = jQuery('.messages');

   var $message = jQuery('<li class="list-group-item"></li>');

   console.log('New message:');
   console.log(message.text);


   $message.prepend('<p><strong>' + message.name + ' ' + momentTimestamp.local().format('h:mm a') + '</strong></p>');
   $message.prepend('<p>' + message.text + '</p>');
   $messages.prepend($message);
});

// handles submitting of new message
var $form = jQuery('#message-form');



$form.on('submit',function(event) {
   event.preventDefault();

   var $message = $form.find('input[name=message]');

   socket.emit('message',{
      name: name,
      text:$message.val()
   });

   $message.val('');

});
