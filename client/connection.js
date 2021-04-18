const connection = new WebSocket('ws://localhost:8080');

connection.onopen = () => {
  console.log('connected');
};

connection.onclose = () => {
  console.error('disconnected');
};

connection.onerror = error => {
  console.error('failed to connect', error);
};

connection.onmessage = event => {
  console.log('received', event.data);
  let response = JSON.parse(event.data)
  if(response.command === "Connected to server"){
    document.querySelector('#siteId').value=parseInt(response.siteId);
  }
  else{
    document.querySelector('#incoming-actions').value += response.command;
    merge();
  }
};
