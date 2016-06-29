$(document).ready(function(){

  $("#weatherTab").click(function(){

    // readHtmlFile("file:///C:/Users/Computer%20User/Documents/News/weather.html");
    $.get("weather_copy.html",function(data){
      var scripts = $(data).filter("script");
      $
      scripts.each(function(){
        var script = $(this);
        $("body").append(script);
      })

      var weather = $(data).filter(".carousel");

      $("#tab1").append(weather);
      $('.carousel').carousel({
              dist:0,
              shift:0,
              padding:300,

        });
    },"html");
  });


});

function firstSlide(element){
  $(element).slick(function(){
      slidesToShow: 1

  });
}
