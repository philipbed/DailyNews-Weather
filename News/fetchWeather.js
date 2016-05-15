
$(document).ready(function(){

  var weatherapp = new Weather("NY","Rochester");
  var forecast = weatherapp.retrieve();
  $.when(forecast).done(function(weatherForecast){
      console.log("finished loading");
      weatherapp.parseDayWeather(weatherForecast.simpleforecast);
  });




});

/**
 * Weather object responsible for making the initial ajax call
 * To Wunderground's API service. Will use this to get the forecast.
 *
 * @constructor
 * @param {state} the State to pull weather from
 * @param {city} the city to pull weather from
 */
function Weather(state,city){
  this.stateCode = state;
  this.cityName = city;

  /** @private */
  var apiKey = "6f6e312e456560e4";


  /**
   * This link can be formatted to find the weather in different cities and different states.
   * You can also change the type of forecast it returns
   * (e.g 10hourday - the 10 hour forecast for that day).
   * Right now it is set to the 5 days forecast. (Section: "/'forecast'/")
   * @private
  */
  this.apiLink = "http://api.wunderground.com/api/"+apiKey+"/forecast/q/"+this.stateCode+"/"+this.cityName+".json",

  /**
   * This function will make the call to retrieve the 5 day forecast
   * for Rochester, NY.
   *
   * @return {JSON Object}
   */


  this.retrieve = function(){
    console.log("retrieve");

    var deferred = $.Deferred();
    var dailyForecast;
    function callback(){
      deferred.resolve(dailyForecast);

    }
    jqxhr = $.ajax({
      type: 'GET',
      contentType: 'application/x-www-form-urlencoded',
      url: this.apiLink,
      dataType: "JSON",
      success: function(data){
        console.log("success");
        return data
      },
    }).done(function(){
      console.log("done");
      dailyForecast = jqxhr.responseJSON.forecast;
      callback();

    });

    return deferred.promise();
  };

  /**
   * This function will handle parsing through the weather for a day.
   *
   */
  this.parseDayWeather = function(weather){
    console.log("parse Weather");
    console.log(weather);
  };
};
