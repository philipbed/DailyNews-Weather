$(document).ready(function(){

  //$("#weatherTab").click(function(){

    // readHtmlFile("file:///C:/Users/Computer%20User/Documents/News/weather.html");




    $("li.tab").hover(function(event){

      // var weatherTabHovered = tabs[0].is(":hover");
      // if(weatherTabHovered){
        if($(this).find("a").hasClass("active")){
        $(this).children().css("color","#06c5dd");
        $(".indicator").css("background-color", "#06c5dd");
      }
      else{$(this).children().css("color","#06c5dd");}
      // }

      // else{
      //   $(tabs[1]).css("color","#06c5dd");
      //   $(tabs[1]).css("background-color", "#06c5dd");
      // }

    }, function(event){
      // console.log($(this));
      // var weatherTabHovered = event.target.is(":hover");
      // if(weatherTabHovered){
      if($(this).find("a").hasClass("active")){
      $(this).children().css("color","#aedee4");
      $(".indicator").css("background-color", "#aedee4");
    }
    else{$(this).children().css("color","#aedee4");}

        // /$(".indicator").css("background-color", "#aedee4");

      // }
      //
      // else{
      //   $(tabs[1]).css("color","#aedee4");
      //   $(tabs[1]).css("background-color", "#aedee4");
      // }
    });
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
              dist:-100,
              shift:0,
              padding:300,

        });
    },"html");
  //});


});

function firstSlide(element){
  $(element).slick(function(){
      slidesToShow: 1

  });
}
