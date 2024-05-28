'use strict'
import movies from "./movies.js"
import {select, selectAll, onEvent, modifyWords} from "./utility.js"

const moviesTitles = [];
const userInput = select(".userInput");
const list = select(".results-list ul");
const movieCard = select(".movie-info")
const movieImage = select(".movie-image");
const movieTitle = select(".movie-details h2");
const movieYear = select(".movie-year");
const movieDescription = select(".movie-description");
const movieDuration = select(".movie-duration span");
const genders = select(".movie-genders");
const searchBtn = select(".search-btn");
const alertSpan = select(".alert-span");

movies.forEach(movie => moviesTitles.push(modifyWords(movie.title)))
searchBtn.onclick = () => {showMovieInfo(userInput.value)}

onEvent(userInput, "input", () => {
    let input = modifyWords(userInput.value)

    if (input.length >= 3){
        let resultArray = searchForMatches(input)
        list.innerHTML = '';
        alertSpan.textContent = "Alert";
        alertSpan.style.visibility = "hidden";
        userInput.style.borderColor = "#000";
        resultArray = resultArray.slice(0, 4)
        resultArray.forEach(result => {
            let li = document.createElement('li')
            li.textContent = typeof result == "string" ? result : result.title
            typeof result == "string" ? li.style.pointerEvents = 'none' :  li.style.cursor = "pointer"
            li.onclick = () => {
                userInput.value = result.title;
                list.style.visibility = "hidden"
            }
            list.appendChild(li)
        })
        list.style.visibility = "visible"
    } 
    else {
        list.style.visibility = "hidden"
    }

})

function searchForMatches(wordToSearch) {
    let resultArray = []
    movies.forEach(movie => {
        if (movie.title.includes(wordToSearch)) {
            resultArray.push(movie)
        }
    })

    if(resultArray.length != 0) {
        return resultArray
    }
    else {
        resultArray.push("No Matches Found")
        return resultArray
    }
}

function showMovieInfo(title) {
    cleanMovieInfo()
    if(userInput.value == "" || userInput.value.length <= 2){
        alertSpan.textContent = "Enter at least 3 letters";
        alertSpan.style.visibility = "visible";
        userInput.style.borderColor = "#ff0000";
        movieCard.style.visibility = "hidden";
    } 
    else {
        let movie = movies.find(movie => movie.title == title)

        if(movie === undefined) {
            alertSpan.textContent = "Movie not found. Select an option below or try again";
            alertSpan.style.visibility = "visible";
            userInput.style.borderColor = "#ff0000";
            list.style.visibility = "hidden"
            movieCard.style.visibility = "hidden";
        }
        else {            
            movieCard.style.visibility = "visible"
        
            movieImage.src = movie.poster;
            movieTitle.textContent = movie.title;
            movieYear.textContent = movie.year;
            movieDescription.textContent = movie.description;
            movieDuration.textContent = movie.runningTime;
            movie.genre.forEach(gender => {
                let span = document.createElement("span");
                span.className = "gender-span";
                span.textContent = gender;
                genders.appendChild(span)
            })        
            userInput.value = "";
        }
    }
}

function cleanMovieInfo() {
    movieImage.src = '';
    movieTitle.textContent = '';
    movieYear.textContent = '';
    movieDescription.textContent = '';
    movieDuration.textContent = '';
    const gendersTag = selectAll(".gender-span");
    gendersTag.forEach(gender => gender.remove())
}