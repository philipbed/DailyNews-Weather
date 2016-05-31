$(document).ready(function (){
  initialize();
});

var initialize = function(){
  var link = "http://feeds.abcnews.com/abcnews/internationalheadlines";
  $.ajax({
    type: 'GET',
    contentType: 'application/x-www-form-urlencoded',
    url:'http://rss2json.com/api.json',
    data:{"rss_url":link},

    dataType:'json',
    success: function(result){
      $("#feed").html(parse(result));
    }

  });

  function parse(fetchedData){
    var feed = fetchedData.feed;
    var title = feed.title;
    var items = fetchedData.items;

    parseItems(items);
    return title;
  };

  function parseItems(items){

    for( var i = 0;i < items.length;i++)
      // var list = $("#target").append("<ul class='item'></ul>");
      var list = $("body").append("<div class='item mdl-card mdl-shadow--16dp'></div><br><br>");

   for( var i = 0;i < items.length; i++){
      var item = items[i];
      // var item = items[0];
      var title = item.title;
      var desc = item.description;
      var image = item.thumbnail;
      var link = item.link;

      // add title and description
      var lst = $(".item").eq(i);
      lst.append("<div class='newsTitle mdl-card__title'></div>")
      $(".newsTitle").eq(i).append("<h2 class='mdl-card__title-text'>"+title+"</h2>");
      lst.append("<div class='mdl-card__supporting-text'>"+desc+"</div>");

      // add link to full story
      var linkText = "Click Here";
      var remainingLinkText = "To Read The Full Story";
      var linkClass = 'navLink';
      var listItem = "<li><a class="+linkClass+" href="+link+" target='_blank'>"+linkText+"</a>"+remainingLinkText+"</li>";

      lst.append("<div class="+linkClass+" 'mdl-card__actions mdl-card--border'> \
      <a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' \
      href="+link+" target='_blank '>"+linkText+" </a>"+remainingLinkText+"</div><br>");


      // add thumbnail image
      // var imageItem = "<li><img src="+image+"></li>";
      // list.append(imageItem);
    }
    // $("#title").html(title);
    // $("#description").html(desc);
    // $("li #navLink").attr("href",link);
    // $("li #navLink").attr("target","_blank");
    // $("li #image").attr("src",image);
  }
};
