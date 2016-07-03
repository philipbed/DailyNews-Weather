$(document).ready(function (){
  initialize();
});

 function initialize(){
  //var link = "http://feeds.abcnews.com/abcnews/internationalheadlines";
  $.ajax({
    type: 'GET',
    contentType: 'application/x-www-form-urlencoded',
    url:'../files/rss_feed.json',
    //data:{"rss_url":link},
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
      var list = $(".row").append("<div class='card small col s4 offset-s1 z-depth-5 item zero'></div>");

   for( var i = 0;i < items.length; i++){
     // get the title, description, image and link for every
      var item = items[i];

      var title = item.title;
      var desc = item.description;
      var image = item.thumbnail;
      var link = item.link;
      var card = $(".item").eq(i);

      // add image only if it is ABC's default
      if(image.toLowerCase().indexOf("default") == -1){
        console.log(image);
        var img = "<img class='image newsImg' src=" +image+">";
        card.append("<div class='card-image waves-effect waves-block waves-light'>"+img+"</div>");
      }
      console.log(card);
      // add title and description

      card.append("<div class='card-content newsTitle'></div>");
      $(".newsTitle").eq(i).append("<span class='activator'><span class='card-title activator grey-text text-darken-4'>"+title+"<i class='material-icons right activator'>more_vert</i></span></span>");
      // card.append("<div class='card-reveal'>"+desc+"</div>");
      //
      //
      // // add link to full story
      //
      // var linkText = "Click Here";
      // var remainingLinkText = "To Read The Full Story";
      // var linkClass = 'navLink';
      // var listItem = "<li><a class="+linkClass+" href="+link+" target='_blank'>"+linkText+"</a>"+remainingLinkText+"</li>";
      // card.append("<div class="+linkClass+" 'mdl-card__actions mdl-card--border'> \
      // <a class='mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect' \
      // href="+link+" target='_blank '>"+linkText+" </a>"+remainingLinkText+"</div><br>");

    }
  }
};
