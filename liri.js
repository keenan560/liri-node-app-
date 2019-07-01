require("dotenv").config();

var fs = require('fs');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);


// var token = "BQDliFD1am7AHsYgTuA9rk3kxJ4cb7HGpDpN73LJMPeX3Abda4JsH2fJ1tPoqb0AQrklSud9e0JNgT9M9NsWCcpe631Osaa0LUBeGW-vfngci7nHiq8hcta4qelVjADVr0qtNi3fnplJi74BJ8TVQR7TGI0aMt0RmlURSK7L6d4tYmI";


const axios = require('axios');

var moment = require('moment');
moment().format();

var userCommand = process.argv[2];
var userInput = function () {
    var name = [];
    for (var i = 3; i < process.argv.length; i++) {
        name.push(process.argv[i]);
    }
    return name.join(" ");
}()

switch (userCommand) {
    case "concert-this":
        concertThis(userInput);
        break;
    case "spotify-this-song":
        spotifyThisSong(userInput);
        break;
    case "movie-this":
        movieThis(userInput);
        break;
    case "do-what-it-says":
        doWhatItSays(userInput);
        break;
}



function concertThis(userInput) {
    var url = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp";
    axios.get(url)
        .then(function (response) {
            var obj = response.data;
            for (var i = 0; i < obj.length; i++) {
                console.log(` Venue name: ${obj[i].venue.name}\n Venue location: ${obj[i].venue.city}, ${obj[i].venue.country}\n Date of Event: ${moment(obj[i].datetime)}\n`);
            }
        });

}

function spotifyThisSong(userInput) {

    spotify.search({ type: 'track', query: userInput }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });


}

function movieThis(userInput) {
    if (userInput === "") {
        var userInput = "Mr. Nobody";
        var url = " http://www.omdbapi.com/?i=tt3896198&apikey=1374377d&t=" + userInput;
        axios.get(url)
            .then(function (response) {
                var obj = response.data;
                var movie = {
                    Title: obj.Title,
                    Year: obj.Year,
                    IMBD: obj.Ratings[0].Value,
                    Rotten: obj.Ratings[1].Value,
                    Country: obj.Country,
                    Language: obj.Language,
                    Plot: obj.Plot,
                    Actors: obj.Actors
                }

                for (var key in movie) {
                    console.log(`* ${key}: ${movie[key]}`);
                }
            });
    } else {
        var url = " http://www.omdbapi.com/?i=tt3896198&apikey=1374377d&t=" + userInput;
        axios.get(url)
            .then(function (response) {
                var obj = response.data;
                var movie = {
                    Title: obj.Title,
                    Year: obj.Year,
                    IMBD: obj.Ratings[0].Value,
                    Rotten: obj.Ratings[1].Value,
                    Country: obj.Country,
                    Language: obj.Language,
                    Plot: obj.Plot,
                    Actors: obj.Actors
                }

                for (var key in movie) {
                    console.log(`* ${key}: ${movie[key]}`);
                }
            });

    }

}

function doWhatItSays(userInput) {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        // console.log(data);
        var breakUp = data.split(",");
        userCommand = breakUp[0];
        userInput = breakUp[1];
       
        switch (userCommand) {
            case "concert-this":
                concertThis(userInput);
                break;
            case "spotify-this-song":
                spotifyThisSong(userInput);
                break;
            case "movie-this":
                movieThis(userInput);
                break;
        }

    });
}

