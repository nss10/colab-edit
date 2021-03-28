let bulletList = list = document.getElementById("bulletList");
let viewList = [];

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
        console.log("Add("+rowId+ ","+text+")")
    }
}

function delRow(rowId){
    viewList.splice(rowId, 1);
    renderRows();
    console.log("Delete("+rowId+ ")")
}

renderRows();