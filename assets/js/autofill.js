async function autofillRequest(ID){
  let IDstring = ID.toString();
  let autofillClient = new HttpClient();
  //console.log('ID' + IDstring)
  var inputText = document.getElementById(IDstring).value
  //console.log('inputText '+inputText)
  let child;
  let listName = document.getElementById(IDstring + '-datalist');
  while (child = listName.firstChild) {
    child.remove();
  }
  autofillClient.get(bibapiUrl + 'predict/'  + inputText, function(response) {
    //console.log('response ' + typeof response)
    for(let x of response){
      let option = document.createElement('option');
      option.value = x;
      listName.appendChild(option);
    }

  });
}
