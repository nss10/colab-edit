const connection = new WebSocket('ws://localhost:8080');
isOnlineIndicator = document.getElementById('chkbx-online')
let isOnline=false;
connection.onopen = () => {
  console.log('connected');
  isOnlineIndicator.checked=true;
  isOnline=true;  
  networkStatusChange();
};

connection.onclose = () => {
  console.error('disconnected');
};

connection.onerror = error => {
  console.error('failed to connect', error);
  alert("Couldn't connect to server");
  document.querySelector('#siteId').value=-1;
};

connection.onmessage = event => {
  console.log('received', event.data);
  let response = JSON.parse(event.data)
  if(response.command === "Connected to server"){
    document.querySelector('#siteId').value=parseInt(response.siteId);
  }
  else{
    document.querySelector('#incoming-actions').value += response.command;
    document.querySelector('#incoming-actions').value += "\n";
    if(isOnline){
      merge();
    }
  }
};
