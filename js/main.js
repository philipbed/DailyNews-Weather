$(document).ready(function(){

  $("#weatherTab").click(function(){

    // readHtmlFile("file:///C:/Users/Computer%20User/Documents/News/weather.html");
    $("#tab1").load("weather_copy.html");
  });



});

function firstSlide(element){
  $(element).slick(function(){
      slidesToShow: 1

  });
}
