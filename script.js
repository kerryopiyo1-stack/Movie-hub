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

//looping through movies 
const image = poster_path ? IMAGE_BASE_URL + poster_path : 'https://via.placeholder.com/300x450';

//creating a moviecard element
const movieCard = document.createElement("div")
movieCard.className = "bg-green-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300";
movieCard.innerHTML = 
<div classs= "relative group">
    <img src="${image}" alt="${title}" class="w-full h-64 object-cover rounded-t-lg">
    <div class="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-4 rounded-b-lg">
        <h2 class="text-lg font-bold mb-2">${title}</h2>
        <p class="text-sm mb-4">${overview}</p>
        <span class="bg-red-500 text-white px-2 py-1 rounded">${vote_average}</span>
    </div>

</div>

