# liri-node-app-

As part of a homework assignment I built a "LIRI" application which is stands for Language Interpretation and Recognition Interface. LIRI mimics Apple's famous SIRI but instead is ran locally with Four CLIs. Below you will find a short description of each command executed in Terminal. 


Goal - Whenever the User executes 1 of 4 commands below the Command and User Input (process.argv[2] and so on...) will be saved as variables and passed into a function based on the type of command given. 3 of the 4 functions: concert-this, spotify-this-song, and movie-this each take the User's input from the CLI and uses Axios to make a request to the relative API coded in the function. Once the server returns a response, the response is parsed and logged to both the console and a file named log.txt. However log.txt does not get overwritten each time as the code include the fs.appendFile function from the file-system package.


1. concert-this => "node liri.js concert-this kiss"
    - If the user types the name of a band/artist such as "kiss" in the above example. the console will query the Bands in Town      API via Axios.

    - If the band/artist is valid and there is event data, axios will return it back as an array of objects.

    - With a simple FOR loop LIRI is able to pass through each elemet of the array and log the details such as name, city, country,  URL, and date of the event. Note that date of the venue has been formated with the moment.js package.

    - Lastly fs.appendFile appends those same results using .join function to the log.txt file.

2. spotify-this-song => "node liri.js spotify-this-song All the Small Things"

    - If the user takes types the name of a song such as "All the Small Things" in the above example. the console will query the         Spotify Web API via Axios.

    - If the track is valid axios will return it back as an array of objects Note Spotify's search method is broad and therefore     will look for tracks that contain not just all of the title but some of it as well.

    - With a simple FOR loop LIRI is able to pass through each elemet of the array and log the details such as  artist's name,       album, and a song preview link. 

    - Lastly fs.appendFile appends those same results using .join function to the log.txt file. Note if no song is chosen then by    default Spotify will return results for "The Sign" by Ace of Base.


3. movie-this => "node liri.js movie-this Terminator"

    - If the user takes types the name of a movie such as "Terminator" in the above example. the console will query the OMDB API     via Axios.

    - If the track is valid axios will return it back as a object.

    - A new object is created by accessing the Parent and retreiving the movie's title, year, IMBD rating, Rotten Tomatoes rating, country, language, plot, and actors. These results are logged to the console.

    - Lastly fs.appendFile appends those same results using .join function to the log.txt file. Note if no movie is chosen then by   default OMDB will return results for "Mr. Nobody".


4. do-what-it-says => "node do-what-it-says"
 
    - Uses the fs.readFile function passing in the random.txt file.

    - The code breaks apart the text in the file using .splt() passing in a ",";

    - The first element is considered the command and the second if the user input relative to the command i.e. movie-this Power Rangers.

    - Then the function uses a switch statement passing in the command and for each case passes in the user input into the prior 3 commands above.

    - The user will manually update the text in the following format to successfully execute this command.
        "movie-this,Scarface".


Below is a link to a short video demonstration. Enjoy.

Demo: https://www.youtube.com/watch?v=GSkQRmaX5DQ&feature=youtu.be


