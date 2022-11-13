let numSelect = 1;
let maxCells = 1;

function update(text) {
    let result_element = document.querySelector("#highlighting-content");
    result_element.innerText = text;
    Prism.highlightElement(result_element);
  }


function selectedCell(cell){
    if(numSelect){
        document.getElementById(numSelect).style.backgroundColor = "white";
    }
    numSelect = cell.id;
    document.getElementById(numSelect).style.backgroundColor = "rgb(163, 148, 218)";
}

// automatically select the first cell
selectedCell(document.getElementById("1"))

function addCell(){
    maxCells ++;
    document.getElementById("cell-list").insertAdjacentHTML( 'beforeend', 
    `<div class="cell" id="${maxCells}" onclick="selectedCell(this)"> 
    <h4>[${maxCells}]</h4>
    <textarea onkeyup="do_resize(this);"></textarea>
    <p></p>
    </div>`);
    selectedCell(document.getElementById(maxCells));
}

function do_resize(textbox) {

    var maxrows=100; 
    var cols=textbox.cols;
  
    var arraytxt=textbox.value.split('\n');
    var rows=arraytxt.length; 
  
   for (i=0;i<arraytxt.length;i++) 
    rows+=parseInt(arraytxt[i].length/cols);
  
   if (rows>maxrows) textbox.rows=maxrows;
    else textbox.rows=rows;
   }