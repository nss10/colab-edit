let bulletList = document.getElementById("bulletList");
let tbLocal = document.getElementById("local-actions");
let tbRemote = document.getElementById("incoming-actions");
let viewList = [];
localActionList = [];
remoteActionList=[];

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
        localActionList.push({"action" : "Add", "index" : rowId, "text" : text});
        tbLocal.value += actionText + "\n";
        console.log(actionText);
        
    }
}

function delRow(rowId){
    viewList.splice(rowId, 1);
    renderRows();
    actionText = "Delete ( "+rowId+ " )";
    localActionList.push({"action" : "Delete", "index" : rowId});
    tbLocal.value += actionText + "\n";
    console.log(actionText);
}

function merge(){
    remoteActionList = [];
    incomingList = tbRemote.value.split("\n");
    for(let actionIndex in incomingList){
        if(!incomingList[actionIndex]){
            continue;
        }
        actionObject = getActionObjectFromText(incomingList[actionIndex]);
        remoteActionList.push(actionObject);
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
    console.log(remoteActionList);
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

renderRows();