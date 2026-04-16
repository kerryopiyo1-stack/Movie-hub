//API_KEY
const API_KEY = "";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

//selecting HTML elements DOM selection)
const  moviesGrid = document.getElementById("movies-container");
const searchInput = document.getElementById("search-input");

//function for fetching movies
async function getMovies (url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

//function for displaying movies
function displayMovies(movies) {
    moviesGrid.innerHTML = "";
    movies.forEach(movie => {
        
        
    });
}
