'use strict';
let MessagingHub = require('messaginghub-client');
let WebSocketTransport = require('lime-transport-websocket');
let Lime = require('lime-js');

let client = new MessagingHub.ClientBuilder()
    .withIdentifier('qcontrol')
    .withAccessKey('bzlEajBzd2JMWmhXSVVrYXlhWG8=')
    .withTransportFactory(() => new WebSocketTransport())
    .build();


client.addMessageReceiver(true, function (message) {
    console.log(message);
});

client.addMessageReceiver(function (message){
    return message.content === 'Ola' || message.content === 'oi';
}, function (message) { 
      // send a message to some user
      var msg = { type: "text/plain", content: "Seja bem vindo ao QControl", to: message.from, id: Lime.Guid()};
     
      var typingMsg = {
        "to":message.from,
        "type":"application/vnd.lime.chatstate+json",
        "content": {
            "state": "composing"
        }
    }

      var msg3 = { type: "text/plain", content: "O que voce deseja?", to: message.from, id: Lime.Guid()};
      
      client.sendMessage(msg);
      setTimeout(function (){client.sendMessage(typingMsg)}, 2000);
      setTimeout(function (){client.sendMessage(msg3)}, 3000);
});

client.addMessageReceiver(function (message){
    return message.content === 'Conectar no zabbix' || message.content === 'Logar no zabbix';
}, function (message) { 
      // send a message to some user
      var msg = { type: "text/plain", content: "ZABBIX conectado com sucesso!", to: message.from, id: Lime.Guid()};
      client.sendMessage(msg);
});

client.addMessageReceiver(function (message){
    return message.content === 'Quero saber o estado da maquina PRD01';
}, function (message) { 
      // send a message to some user
      var msg = { type: "text/plain", content: "Espaço Livre: 23%", to: message.from, id: Lime.Guid()};
      
       var typingMsg = {
         "to":message.from,
         "type":"application/vnd.lime.chatstate+json",
         "content": {
             "state": "composing"
         }
     }
 
       var msg3 = { type: "text/plain", content: "Uso da CPU: 88%", to: message.from, id: Lime.Guid()};
       
       client.sendMessage(msg);
       setTimeout(function (){client.sendMessage(typingMsg)}, 2000);
       setTimeout(function (){client.sendMessage(msg3)}, 3000);
});

client.addMessageReceiver(true, function (message) {
    console.log('terceiro receiver');
});

//log detalhado
// client.addNotificationReceiver(true, function (notification){
//     console.log(notification);
// })

client.connect()
    .then(function (session) {
        console.log('Connectado');
    })
    .catch(function (err) {
        console.log(err);
    });

    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }