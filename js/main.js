$(document).ready(function(){

  $("#weatherTab").click(function(){

    // readHtmlFile("file:///C:/Users/Computer%20User/Documents/News/weather.html");
    $("#tab1").load("weather.html #tab1");
  });


});

function readHtmlFile(file)
{
    var rawFile = new File([""],file);
    var reader = new FileReader();

    reader.onload = function(event){
      console.log(rawFile.getAsText("utf-8"));
    }

    reader.readAsText(rawFile);

}
