function runCell() {
    text = document.getElementById(selectedCellNumber).children[1].value;

    document.getElementById('run').disabled = true;
    fetch('/evaluate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            command: text
        })
    }).then((response)=>response.json()).then((data)=>{
        document.getElementById(selectedCellNumber).children[2].innerText = data.result;
        document.getElementById('run').disabled = false;
    });
}
