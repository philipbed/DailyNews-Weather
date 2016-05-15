/**
 * @author: Philip Bedward
 */
$(document).ready(function(){
  // Make a new weather object
  var weatherapp = new Weather("NY","Rochester");

  /** @see retrieve() */
  var forecast = weatherapp.retrieve();

  /**
   * Uses Deferred on the retrieve call in order to
   * only call parseDayWeather when the retrieve method is done.
   *
   * @param: forecast {JSON Object} - the deferred retrieve method call
   * @param: weatherForecast {JSON Object} -  is the week's forecast in json.
   */
  $.when(forecast).done(function(weatherForecast){
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
   * @return {JSON Object} - the weather information as json
   */
  this.retrieve = function(){
    // Declare Deferred to enforce synchronization
    var deferred = $.Deferred();
    var dailyForecast;

    /**
     * this method is called when the ajax call is
     * done gathering the information that we need
     */
    function sendForecast(){

      // resolve/fulfill our promise and send the dailyForecast
      deferred.resolve(dailyForecast);

    }
    jqxhr = $.ajax({
      type: 'GET',
      contentType: 'application/x-www-form-urlencoded',
      url: this.apiLink,
      dataType: "JSON",
      success: function(data){
        return data
      },
    }).done(function(){
      dailyForecast = jqxhr.responseJSON.forecast;

      // fulfill the promise we made
      sendForecast();

    });
    // promises that this method is not finished and we
    // will handle some type of action when it is done.
    return deferred.promise();
  };

  /**
   * This function will handle parsing through the weather for a day.
   * @param weather {JSON Object} -
   */
  this.parseDayWeather = function(weather){
    console.log(weather);
  };
};
