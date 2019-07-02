require("dotenv").config();

var fs = require('fs');

var Spotify = require('node-spotify-api');

var keys = require("./keys.js");

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
                console.log(` Venue name: ${obj[i].venue.name}\n Venue location: ${obj[i].venue.city}, ${obj[i].venue.country}\n Date of Event: ${moment(obj[i].datetime).format("MM-DD-YYYY")}\n`);
            }

        });

}

function spotifyThisSong(userInput) {
    var spotify = new Spotify(keys.spotify);

    if ( userInput === "") {
        spotify.search({ type: 'track', query: "The Sign"}, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var obj = data.tracks.items;
            for (var i = 0; i < obj.length; i++) {
                console.log(`Artist Name: ${obj[i].artists[0].name} \nSong: ${obj[i].name} \nAlbum: ${obj[i].album.name} \nSong Preview Link: ${obj[i].external_urls.spotify} \n--------------------------`);
            }
        });
    } else {
        spotify.search({ type: 'track', query: userInput }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            var obj = data.tracks.items;
            for (var i = 0; i < obj.length; i++) {
                console.log(`Artist Name: ${obj[i].artists[0].name} \nSong: ${obj[i].name} \nAlbum: ${obj[i].album.name} \nSong Preview Link: ${obj[i].external_urls.spotify} \n--------------------------`);
            }
        });
    }



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

                fs.appendFile('log.txt', `\n-------------Movie-This Results----------- \nTitle: ${movie.Title} \nYear: ${movie.Year} \nIMBD: ${movie.IMBD} \nRotten: ${movie.Rotten} \nCountry: ${movie.Country} \nLanguage: ${movie.Language} \nPlot: ${movie.Plot} \nActors: ${movie.Actors}`,  function(err, movie) {
                    if (err) throw err;
                });
            });

    }

}

function doWhatItSays(userInput) {
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) throw err;
        // console.log(data);
        var breakUp = data.split(",");
        userCommand = breakUp[0];
        userInput = breakUp[1].trim();

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

