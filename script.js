//API_KEY
// Use the variable provided by Vite's environment loader
const API_KEY = import.meta.env.VITE_API_KEY;

const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

//selecting HTML elements DOM selection
const moviesGrid = document.getElementById("movies-container");
const searchInput = document.getElementById("search-input");

//Check if required elements exist
if (!moviesGrid || !searchInput) {
    console.error("Required HTML elements not found");
}

//function for fetching movies
async function getMovies(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.results && Array.isArray(data.results)) {
            showMovies(data.results);
        } else {
            console.error("No results found in API response");
            if (moviesGrid) moviesGrid.innerHTML = "<p class='p-4'>No movies found</p>";
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        if (moviesGrid) moviesGrid.innerHTML = "<p class='p-4 text-red-500'>Error loading movies. Please try again.</p>";
    }
}

//function for displaying movies
function showMovies(movies) {
    moviesGrid.innerHTML = "";
    movies.forEach(movie => {  
        const { id, poster_path, title, vote_average } = movie;
        
        //looping through movies 
        const image = poster_path ? IMAGE_BASE_URL + poster_path : '';

        //creating a movieCard element/ creates another div
        const movieCard = document.createElement("div");
        movieCard.className = "bg-green-800 rounded-lg shadow-lg hover:scale-105 transform transition duration-300";
        
        //inserting HTML inside card
        const trailerButton = document.createElement("button");
        trailerButton.className = "bg-red-500 px-4 py-2 rounded";
        trailerButton.textContent = "watch trailer";
        trailerButton.addEventListener("click", () => getTrailer(id));

        movieCard.innerHTML = `
<div class="relative group">
    <img src="${image}" class="w-full h-64 object-cover rounded-t-lg" alt="${title}"/>
    <div class="absolute inset-0 bg-black bg-opacity-75 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-center items-center text-center p-4 rounded-b-lg" data-trailer-slot="true"></div>
    <div class="p-4">    
        <h2 class="text-lg font-bold mb-2">${title}</h2>
        <p class="text-yellow-400 mb-2">${vote_average}</p>
    </div>
</div>
        `;
        const trailerSlot = movieCard.querySelector('[data-trailer-slot="true"]');
        if (trailerSlot) {
            trailerSlot.appendChild(trailerButton);
        }
        
        //Adding cards to the page 
        moviesGrid.appendChild(movieCard);
    });
}

//fetching Trailer
async function getTrailer(movieId) {
    const videoContainer = document.getElementById("video-container");
    if (!videoContainer) {
        console.error("Video container not found");
        return;
    }

    try {
        const response = await fetch(
            `${BASE_URL}/movie/${encodeURIComponent(movieId)}/videos?api_key=${encodeURIComponent(API_KEY)}`
        );
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!data.results || !Array.isArray(data.results)) {
            throw new Error("Invalid trailer response");
        }

        const trailer = data.results.find(video => video.type === "Trailer" && video.site === "YouTube");
        
        if (trailer) {
            showTrailer(trailer.key);
        } else {
            videoContainer.innerHTML = "<p class='p-4 text-yellow-400'>Trailer not available for this movie</p>";
            videoContainer.scrollIntoView({ behavior: "smooth" });
        }
    } catch (error) {
        console.error("Error fetching trailer:", error);
        videoContainer.innerHTML = "<p class='p-4 text-red-500'>Error loading trailer</p>";
    }
}
 

//showing trailer (adds an iframe to play the trailer)
function showTrailer(videoKey) {
    const videoContainer = document.getElementById("video-container");
    if (!videoContainer) {
        console.error("Video container not found");
        return;
    }
    videoContainer.innerHTML = `
    <div class="relative">
        <iframe width="100%" height="400" src="https://www.youtube.com/embed/${videoKey}" 
        frameborder="0" allowfullscreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"></iframe>
        <button class="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded">Close</button> 
    </div>
    `;
    const closeButton = videoContainer.querySelector("button");
    closeButton.addEventListener("click", closeTrailer);
    videoContainer.scrollIntoView({ behavior: "smooth" });
}

// Close trailer removes video completely
function closeTrailer() {
    const videoContainer = document.getElementById("video-container");
    if (videoContainer) {
        videoContainer.innerHTML = "";
    }
}

//loading movies automatically when the page loads
if (moviesGrid && searchInput) {
    getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
}

//searching for movies
if (searchInput) {
    searchInput.addEventListener("keyup", (e) => {
        const searchTerm = e.target.value.trim();
        if (searchTerm) {
            getMovies(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${searchTerm}`);
        } else {
            getMovies(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
        }
    });
}


window.getMovies = getMovies;
window.getTrailer = getTrailer;
window.showTrailer = showTrailer;
window.closeTrailer = closeTrailer;