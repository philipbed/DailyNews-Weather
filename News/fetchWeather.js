
$(document).ready(function(){
  var weatherapp = new Weather("NY","Rochester");
  weatherapp.retrieve();


});

function Weather(state,city){
  this.apiKey = "6f6e312e456560e4";
  this.stateCode = state;
  this.cityName = city;
  this.apiLink = "http://api.wunderground.com/api/"+this.apiKey+"/forecast/q/"+this.stateCode+"/"+this.cityName+".json",

  this.retrieve = function(){
    $.ajax({
      type: 'GET',
      url: this.apiLink,

      success: function(result){
        console.log("We're OK");
      },
      error: function(result){
        console.error(result);
      },
    });
  };
};
