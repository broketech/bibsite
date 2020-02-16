

function autofillRequest(ID){
  let IDstring = ID.toString();
  console.log('ID' + IDstring)
  var inputText = document.getElementById(IDstring).value
  var autofillClient = new HttpClient();
  console.log('inputText '+inputText)
  autofillClient.get(bibapiUrl + 'predict/'  + inputText, function(response) {
    console.log('response ' + typeof response)
    let listName = document.getElementById(IDstring + '-datalist');
    let child;
    while (child = listName.firstChild) {
      child.remove();
    }
    for(let x of response){
      let option = document.createElement('option');
      option.value = x;
      listName.appendChild(option);
    }
  });
}
