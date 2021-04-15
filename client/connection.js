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
  document.querySelector('#incoming-actions').value += JSON.parse(event.data).command;
};

document.querySelector('#local-actions').addEventListener('change', event => {
  event.preventDefault();
  let message = {
    "site-id" : document.getElementById("siteId").value,
    "command" : document.querySelector('#local-actions').value
  }
  console.log(message)
  connection.send(JSON.stringify(message));
});