require("dotenv").config();

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

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
    console.log("Check out this great concert!");
}

function spotifyThisSong(userInput) {
    console.log("Check out this cool song");
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
    console.log("Do it now!");
}