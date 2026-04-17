//API_KEY
const API_KEY = "8bea28b7fc513253b2e5d30bec9123c9";
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
        const { poster_path, title, vote_average } = movie;
        
        //looping through movies 
        const image = poster_path ? IMAGE_BASE_URL + poster_path : 'https://via.placeholder.com/300x450';

        //creating a moviecard element/ creates another div
        const movieCard = document.createElement("div");
        movieCard.className = "bg-green-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300";
        
        //inserting HTML inside card
        movieCard.innerHTML = `
<div class="relative group">
    <img src="${image}" alt="${title}" class="w-full h-64 object-cover rounded-t-lg"/>
    <div class="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-4 rounded-b-lg">
      
    <!--trailer button -->
    <button class="bg-red-500 px-4 py-2 rounded">View</button>
    </div>
    <div class="p-4">
        <h2 class="text-lg font-bold mb-2">${title}</h2>
        <p class="text-yellow-400 mb-2">${vote_average}</p>
    </div>
</div>
        `;
        
        //Adding cards to the page 
        moviesGrid.appendChild(movieCard);
    });
}
//loading movies  automatically when the page loads
getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);


//searching for movies
searchInput.addEventListener("keyup", (e) => {
    const searchTerm = e.target.value.trim();
    if  (searchTerm) {
        getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
    }
}
);
 //fetching Trailer
 async function getTrailer(movieId) {
    try {
        const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`);//api request fetches  trailer clips

        const data = await response.json();

        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        
        if (trailer) {
            showTrailer(trailer.key)//if trailer found, show trailer;
        }else {
            alert("Trailer not available");//if there is no trailer, show alert
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
        
    }
}


