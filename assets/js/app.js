const searchText = document.querySelector(".search-text");

searchText.addEventListener("keydown", (event)=> {   
    //if press enter
    if(event.keyCode == 13){
        searchMovie();
    }
});

async function searchMovie(){
    const req = await fetch(`http://www.omdbapi.com/?apikey=16d1336e&s=${searchText.value}`);
    const data = await req.json();
    let movies = data.Search.map(mv => {
        return {
            title : mv.Title,
            description : `${mv.Year} / ${mv.Type}`,
            imdbID : mv.imdbID,
            poster : mv.Poster == 'N/A' ? '/assets/images/default.png' : mv.Poster,
            isFavourite : false
        }
    });
    console.log(movies);
    prepareMovies(movies);
}

function prepareMovies(movies){
    document.querySelector("#movies").innerHTML = "";
    movies.forEach(movie => {
        let movieCard = document.createElement("movie-card");
        movieCard.setAttribute("title", movie.title);
        movieCard.setAttribute("poster", movie.poster);
        movieCard.innerHTML = movie.description; 
        movieCard.setAttribute("isFavourite", movie.isFavourite);
        movieCard.setAttribute("imdbID", movie.imdbID);
        document.querySelector("#movies").append(movieCard);
    });   
}