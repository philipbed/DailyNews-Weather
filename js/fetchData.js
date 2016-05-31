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

  /**
   * This method parses the json converted from the
   * ABC RSS feed.
   *
   **/
  function parse(fetchedData){
    var feed = fetchedData.feed;
    var title = feed.title;
    var items = fetchedData.items;

    parseItems(items);
  };

  /**
   * A helper method to generate and populate
   * Google MDL cards with the news data.
   **/
  function parseItems(items){

    // add a google card for every news story
    for( var i = 0;i < items.length;i++)
      var list = $("body").append("<div class='item mdl-card mdl-shadow--16dp'></div><br><br>");

   for( var i = 0;i < items.length; i++){
     // get the title, description, image and link for every
      var item = items[i];

      var title = item.title;
      var desc = item.description;
      var image = item.thumbnail;
      var link = item.link;

      // add title and description
      var card = $(".item").eq(i);
      card.append("<div class='newsTitle mdl-card__title'></div>")
      $(".newsTitle").eq(i).append("<h2 class='mdl-card__title-text'>"+title+"</h2>");
      card.append("<div class='mdl-card__supporting-text'>"+desc+"</div>");

      // add image only if it is ABC's default
      if(image.toLowerCase().indexOf("default") == 0){
        var img = "<img class='newsImg' src="+image+">";
        card.append("<div class='mdl-card__media'>"+img+"</div>");
      }
      // add link to full story

      var linkText = "Click Here";
      var remainingLinkText = "To Read The Full Story";
      var linkClass = 'navLink';
      var listItem = "<li><a class="+linkClass+" href="+link+" target='_blank'>"+linkText+"</a>"+remainingLinkText+"</li>";
      card.append("<div class="+linkClass+" 'mdl-card__actions mdl-card--border'> \
      <a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' \
      href="+link+" target='_blank '>"+linkText+" </a>"+remainingLinkText+"</div><br>");

    }
  }
};
