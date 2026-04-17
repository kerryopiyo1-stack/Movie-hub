//API_KEY
// Use the variable provided by Vite's environment loader
const API_KEY = import.meta.env.VITE_API_KEY;

console.log("API Key:", API_KEY); // Log

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

//selecting HTML elements DOM selection
const  moviesGrid = document.getElementById("movies-container");
const searchInput = document.getElementById("search-input");

//function for fetching movies
async function getMovies (url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        showMovies(data.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

//function for displaying movies
function showMovies(movies) {
    moviesGrid.innerHTML = "";
    movies.forEach(movie => {  
        const { id, poster_path, title, vote_average } = movie;
        
        //looping through movies 
        const image = poster_path ? IMAGE_BASE_URL + poster_path : 'https://via.placeholder.com/300x450';

        //creating a movieCard element/ creates another div
        const movieCard = document.createElement("div");
        movieCard.className = "bg-green-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300";
        
        //inserting HTML inside card
        movieCard.innerHTML = `
<div class="relative group">
    <img src="${image}" class="w-full h-64 object-cover rounded-t-lg"/>

    <div class="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-4 rounded-b-lg">
    <button onclick="getTrailer(${id})" class="bg-red-500 px-4 py-2 rounded">
    watch trailer
    </button>
    </div>
    </div>
    <div class="p-4">     //movie title and rating
        <h2 class="text-lg font-bold mb-2">${title}</h2>
        <p class="text-yellow-400 mb-2">${vote_average}</p>
</div>
        `;
        
        //Adding cards to the page 
        moviesGrid.appendChild(movieCard);
    });
}

//fetching Trailer
 async function getTrailer(movieId) {
    try {
       const response = await fetch(
  `${BASE_URL}/movie/${encodeURIComponent(movieId)}/videos?api_key=${encodeURIComponent(API_KEY)}`
);
        const data = await response.json();

        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        
        if (trailer) {
            showTrailer(trailer.key); //if trailer found, show trailer
        } else {
            alert("Trailer not available");//if there is no trailer, show alert
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
        
    }
}
 

//showing trailer(selects the video container and adds an iframe to play the trailer)
function showTrailer(videoKey) {
    const videoContainer = document.getElementById("video-container");
    videoContainer.innerHTML = `
    <div class = "relative">
    <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoKey}" 
    frameborder="0"
     allowfullscreen></iframe>
    
    //removes video playing when close button is clicked
    <button on click="closeTrailer()" class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Close</button> 
    </div>
    `;
}

// Close trailer removes video completely
function closeTrailer() {
  document.getElementById("video-container").innerHTML = "";
}

//loading movies  automatically when the page loads
getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);


//searching for movies
searchInput.addEventListener("keyup", (e) => {     //listens when user types in the search input and triggers a function that fetches movies based on the search term
    const searchTerm = e.target.value.trim();
   if (searchTerm) {          //if user types something in the search input, it will fetch movies based on the search term, otherwise it will show popular movies
    getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
} else {
    getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
}        ;
    });


window.getMovies = getMovies;
window.getTrailer = getTrailer;
window.showTrailer = showTrailer;
window.closeTrailer = closeTrailer;