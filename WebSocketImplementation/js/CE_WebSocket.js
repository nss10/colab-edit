function start_websocket(){
    var server_destination = "ws://wlcl061218.wlcl.siu.edu:9000/";
	connection  = new WebSocket(server_destination);

    connection.onopen = function () {
        console.log('Connection Opened');
    };

    connection.onerror = function (error) {
        console.log('WebSocket Error ' + error);
    };

    connection.onclose = function(){
        //try to reconnect in 5 seconds
        setTimeout(function(){start_websocket();}, 20000);
		connection = null;
    };


    connection.onmessage = function (e) {
        const chat = document.getElementById("chat");
        chat.innerHTML += event.data;
    };

} 

function sendMessage(msg){
  connection.send(msg);
}