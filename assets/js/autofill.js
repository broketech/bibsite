

function autofillRequest(ID){
  let IDstring = ID.toString();
  console.log('ID' + IDstring)
  var inputText = document.getElementById(IDstring).value
  var autofillClient = new HttpClient();
  console.log('inputText '+inputText)
  autofillClient.get(bibapiUrl + 'predict/'  + inputText, function(response) {
    console.log('response ' + response)
  });
}
