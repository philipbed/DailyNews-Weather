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
      var list = $("#target").append("<ul id='item'></ul>");

    for( var i = 0;i < items.length; i++){
      var item = items[i];
      var title = item.title;
      var desc = item.description;
      var image = item.thumbnail;
      var link = item.link;

      // add title and description
      var list = $("ul").eq(i);
      list.append("<li>"+title+"</li>");
      list.append("<li>"+desc+"</li>");

      // add link to full story
      var linkText = "Click Here";
      var remainingLinkText = "To Read The Full Story";
      var linkClass = "navLink";
      var listItem = "<li><a class="+linkClass+" href="+link+" target='_blank'>"+linkText+"</a>"+remainingLinkText+"</li>";
      list.append(listItem);


      // add thumbnail image
      // var imageItem = "<li><img src="+image+"/></li>";
      // list.append(imageItem);
    }
    // $("#title").html(title);
    // $("#description").html(desc);
    // $("li #navLink").attr("href",link);
    // $("li #navLink").attr("target","_blank");
    // $("li #image").attr("src",image);
  }
};
