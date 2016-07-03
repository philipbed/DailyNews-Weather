$(document).ready(function(){

  function changeColor(elem,color){
    if(elem.find("a").hasClass("active")){
      elem.children().css("color",color);
      $(".indicator").css("background-color", color);
  }
  else
    elem.children().css("color",color);
  };


    $("li.tab").hover(function(){
      changeColor($(this),"#06c5dd");
    }, function(event){
      changeColor($(this), "#aedee4");
    });

    // $.get("news.html",function(data){
    //
    //   var scripts = $(data).filter("script");
    //
    //   scripts.each(function(){
    //     var script = $(this);
    //     $("body").append(script);
    //   })
    //
    //   var news = $(data).filter('.row');
    //   $("#tab2").append(news);
    //
    // });

    $.get("weather.html",function(data){
      var scripts = $(data).filter("script");

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
