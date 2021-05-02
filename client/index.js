let bulletList = document.getElementById("bulletList");
let tbLocal = document.getElementById("local-actions");
let tbRemote = document.getElementById("incoming-actions");
divOnlineContainer = document.getElementsByClassName('online-container')[0];
divOfflineContainer = document.getElementsByClassName('offline-container')[0];
let viewList = [];
localActionList = [];
remoteActionList=[];

isOnlineIndicator.addEventListener("change", networkStatusChange);

function networkStatusChange (){
    isOnline = isOnlineIndicator.checked;
    if(isOnline){
        divOnlineContainer.style.display='block'; 
        divOfflineContainer.style.display='none'; 
        sendToServer();
        renderRows();
    }
    else{
        divOfflineContainer.style.display='block'; 
        divOnlineContainer.style.display='none'; 
    }
}


function renderRows(){
    bulletList.innerHTML="";
    for(let index in viewList){
        bulletList.innerHTML+=getRowHtml(index, viewList[index]);
    }
}

function getRowHtml(rowId, text){
    rowNumber = parseInt(rowId)+1;
    return "<div class='row' id='row-"+rowId+"'>"+
    "<div class='txt-item'>"+
    "<label id="+rowId+">"+rowNumber + ".  " + text+"</label>"+
    "</div>"+
    "<button class='btn-add' id='btn-add-"+rowId+"' onclick='addRow("+rowId+")'>Add new</button>"+
    "<button class='btn-del' id='btn-del-"+rowId+"' onclick='delRow("+rowId+")'>Delete</button>"+
    "</div>";
}

function addRow(rowId){
    let text = prompt("Enter the text in the bullet");
    if(text){        
        rowId++;
        viewList.splice(rowId, 0 , text);
        renderRows();
        actionText = "Add ( "+rowId+ " , "+text+" ) ";
        tbLocal.value += actionText + "\n";
        sendToServer(JSON.stringify({
            "siteId" : document.querySelector('#siteId').value,
            "command" : actionText
          }));
        
    }
}

function delRow(rowId){
    viewList.splice(rowId, 1);
    renderRows();
    actionText = "Delete ( "+rowId+ " )";
    tbLocal.value += actionText + "\n";
    sendToServer(JSON.stringify({
        "siteId" : document.querySelector('#siteId').value,
        "command" : actionText
      }));
}

function merge(){
    incomingList = tbRemote.value.split("\n");
    for(let actionIndex in incomingList){
        if(!incomingList[actionIndex]){
            continue;
        }
        actionObject = getActionObjectFromText(incomingList[actionIndex]);
        if(actionObject.action == "Add"){
            viewList.splice(actionObject.index, 0, actionObject.text);
        }
        else if(actionObject.action == "Delete"){
            viewList.splice(actionObject.index, 1);
        }
        else{
            alert("Couldn't merge : Formatting error at "+ incomingList[actionIndex]);
        }
    }
    tbRemote.value="";
    renderRows();
}

function getActionObjectFromText(text){
    let splitList = text.split(" ");
    let actionObject =  {
            "action": splitList[0], 
            "index" : splitList[2],
        }
    if(actionObject.action=="Add"){
        actionObject.text = splitList[4];
    }
    return actionObject;
}

function sendToServer(messageObject){
    if(isOnline){
        merge();
        for(let message in localActionList){
            connection.send(localActionList[message])
        }
        if(messageObject){
            connection.send(messageObject);
        }
    }
    else if(messageObject){
        localActionList.push(messageObject);
    }
    

}
renderRows();