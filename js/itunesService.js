  //This service is what will do the 'heavy lifting' and get our data from the iTunes API.
  //Also not that we're using a 'service' and not a 'factory' so all your method you want to call in your controller need to be on 'this'.

  //Write a method that accepts an artist's name as the parameter, then makes a 'JSONP' http request to a url that looks like this
  //https://itunes.apple.com/search?term=' + artist + '&callback=JSON_CALLBACK'
  //Note that in the above line, artist is the parameter being passed in. 
  //You can return the http request or you can make your own promise in order to manipulate the data before you resolve it.

var app = angular.module('itunes');

app.factory('itunesService', function ($http, $q) {
  
  var service = {};

  service.getData = function (artistName) {
    var deferred = $q.defer();
    console.log('This is deferred', deferred);

    $http.jsonp('https://itunes.apple.com/search?term=' + artistName + '&callback=JSON_CALLBACK')
      .success(function (response){
        var allData = [];
        var rawArr = response.results;

        rawArr.forEach(function (item, index) {
          var object = {
            AlbumArt: item['artworkUrl100'],
          Artist: item['artistName'],
          Collection: item['collectionName'],
          CollectionPrice: item['trackPrice'],
          Play: item['previewUrl'],
          Song: item['trackName'],
          Type: item['kind']
          }

          allData.push(object);
        })

          deferred.resolve(allData);
      });
    return deferred.promise;
  }
  return service;
});