function sendEventListener() {
    var message = document.getElementById("message");
    var name = document.getElementById("name");
    var data = '<p>' + name.value + ':' + message.value + '</p>';
  
    // Send composed message to the server
    if (connection != null) {
      connection.send(data);
    }
  
    clearField("message");
    clearField("name");
  }