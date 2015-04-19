function promptMe() {
  // Recycled code is the best code. (https://github.com/sargeant45/word-a-day/blob/gh-pages/index.html)
  var request = new XMLHttpRequest();
      request.onload = function() {
          // get the file contents
          var fileContent = this.responseText;
          // split into lines
          var fileContentLines = fileContent.split( '\n' );
          // get a random index (line number)
          var randomLineIndex = Math.floor( Math.random() * fileContentLines.length );
          // extract the value
          var randomLine = fileContentLines[ randomLineIndex ];
          // add the random line in a 'p'
          document.getElementById('prompt').innerHTML = randomLine;
  };
  request.open( 'GET', 'writingprompts.txt', true );
  request.send();
  
}

function load() {
  promptMe();
  doGist();
}

function gist() {
  localStorage.setItem("gist-content", document.getElementById("input").value);
  localStorage.setItem("gist-desc", document.getElementById("prompt").innerHTML);
  window.location.href = "https://github.com/login/oauth/authorize?client_id=ccd204482758a6a9b474&scope=gist";
}

function doGist() {
  $.ajaxSetup({
    dataType: "JSONP"
  });
  $.post("https://github.com/login/oauth/access_token", {code: getUrlParameter("code"), client_secret: "aa3229767ad306831c201f4b05fbc6117b9d2800", client_id: "ccd204482758a6a9b474"})
  .done(function( data ) {
    console.log(data);
  });
  var github = new Github({
    token: access,
    auth: "oauth"
  });
  var gistopts = {
    "description": localStorage.getItem("gist-desc"),
    "public": true,
    "files": {
      "prompt.txt": {
        "content": localStorage.getItem("gist-content"),
      }
    }
  };
  github.gist.create(gistopts);
}

function getUrlParameter(sParam)
{
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}