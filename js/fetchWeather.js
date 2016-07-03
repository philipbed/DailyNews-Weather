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
   * @param: {forecast [JSON Object] } - the deferred retrieve method call
   * @param: {weatherForecast [JSON Object] } -  is the week's forecast in json.
   */
  $.when(forecast).done(function(weatherForecast){
      /** @see parseDayWeather(weather) */
      var forecastObj = weatherapp.parseAll(weatherForecast.simpleforecast);
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
  this.apiLink = "http://api.wunderground.com/api/"+apiKey+"/forecast10day/q/"+this.stateCode+"/"+this.cityName+".json",

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
      url: "../files/Rochester.json",
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
   * @param { weather [JSON Object] } -
   */
  this.parseDayWeather = function(today,numClass){
    // today
    // var today = weather.forecastday[0];
    // get Date
    var date = today.date;
    var month = date.month;
    var day = date.day;
    var year = date.year;

    var degreeSym = String.fromCharCode(176);
    // store date object
    date = new Date(year,month,day);

    var forecastData = new DayForecast(date,today);

    //$("#date").text(month+"/"+day+"/"+year);
    //$(".weather").append("<ul class='weatherItem'></ul>");

    //var list = $(".weatherItem");
    var titleText = $(numClass+" .card-title");
    // var titleText = $(".mdl-card__title-text");
    titleText.prepend(month+"/"+day+"/"+year);

    var media = $(numClass+" .card-image");

    $(numClass+" .image").attr("src",forecastData.getIconUrl());

    $(numClass+" figcaption").text(forecastData.getDayConditions());

    var high = $(numClass+" .high");
    high.text("High: "+forecastData.getHighTemp()+degreeSym);

    var low = $(numClass+" .low");
    low.text("Low: "+forecastData.getLowTemp()+degreeSym);

    var windSpeed = $(numClass+" .windSpeed").text();
    var newWindSpeedText = appendText(windSpeed, forecastData.getMaxWindSpeed()+" mph, headed "+forecastData.getDirection());
    $(numClass+" .windSpeed").text(newWindSpeedText);

    var humidity = $(numClass+" .humidity").text();
    var newText = appendText(humidity, forecastData.getHumidity()+" %");
    $(numClass+" .humidity").text(newText);


    /*
    list.append("<li class='high'>"+forecastData.getHighTemp()+"</li>");
    list.append("<li class='low'>"+forecastData.getLowTemp()+"</li>");
    list.append("<li class='wind'>"+forecastData.getMaxWindSpeed()+"</li>");
    list.append("<li class='humidity'>"+forecastData.getHumidity()+"</li>");
    list.append("<li class='conditions'>"+forecastData.getDayConditions()+"</li>")

    // add thumbnail image

    var imageItem = "<li><img src="+forecastData.getIconUrl()+"></li>";
    list.append(imageItem);
    */
  };

  this.parseAll = function(weather){
    var numClasses = [".zero",".one",".two",".three",".four",".five",".six"];
    var week = 7;
  //  for(var idx = 0; idx < weather.forecastday.length; idx++){
  for(var idx = 0; idx < week; idx++){
     var numClass = numClasses[idx];
     this.parseDayWeather(weather.forecastday[idx],numClass );
   }
 };


};

/**
 * This class will hold all necessary data for the forecast
 * of a certain day. Not all of the info provided by wunderground is
 * relevant so this class is made to store all of the data that we want
 *
 * @constructor
 * @param {date [Date Object] } - Date object representing today's date
 * @param {forecastInfo [JSON Object] } - holds the forecastInfo for today.
 *          Data was pulled from Wunderground. Not all attributes are relevant.
 */
function DayForecast( date, forecastInfo ){
  /** @private member variables */
  var directions = {
                    "E":"East",
                    "N":"North",
                    "S":"South",
                    "W":"West"
                  };

  var high = forecastInfo.high.fahrenheit;
  var low = forecastInfo.low.fahrenheit;
  var conditions = forecastInfo.conditions;
  var icon = forecastInfo.icon_url;
  var windMax = forecastInfo.maxwind.mph;

  var humidity = forecastInfo.avehumidity;

  /**
   * @return {date [Date Object]} - today's date
   */
  this.getDate = function(){

    return date;
  };

  /**
   * @return (high) - The high temp for the day
   */
  this.getHighTemp = function(){
    return high;
  };

  /**
   * @return {low} - The low temp for the day
   */
  this.getLowTemp = function(){
    return low;
  };

  /**
   * @return {conditions} - The weather conditions for that day
   */
  this.getDayConditions = function(){
    return conditions;
  };

  /**
   * @return {icon} - The weather icon image for the day
   */
  this.getIconUrl = function(){
    return icon;
  };

  /**
   * {windMax} - the max wind speed for the day
   */
  this.getMaxWindSpeed = function(){
    return windMax;
  };

  /**
   * {humidity} - the avg humidity for the day
   */
  this.getHumidity = function(){
    return humidity;
  };

  this.getDirection = function(){
    var windDir = forecastInfo.avewind.dir;

    if(windDir.length == 1){

      return directions[forecastInfo.avewind.dir];}
    else if(windDir.length > 1){

      windDir = windDir.split("");
      var completeWindDir = "";
      for(var idx in windDir){

          if(idx == windDir.length -1){
            completeWindDir += directions[windDir[idx]];
          }
          else{
          completeWindDir += directions[windDir[idx]];
          completeWindDir += "-";
        }
      }

      return completeWindDir;
    }

  }


}

function appendText(origText, textToAppend){
  return origText + textToAppend
};
