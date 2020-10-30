const form = document.getElementById("form");
const search = document.getElementById("search");
const moviesId = document.getElementById("moviesId");

const anime = document.getElementById("anime");
const manga = document.getElementById("manga");

// const apiKey = "7a2fe517"; //omdbapi.com

form.addEventListener("submit", (event) => {
    event.preventDefault();
    let searchValue = search.value;

    getMovies(searchValue);
});


// airing: false
// end_date: "2016-03-26T00:00:00+00:00"
// episodes: 13
// image_url: "https://cdn.myanimelist.net/images/anime/7/73852.jpg?s=f1d9b26774a18fa61eddd81b951e7fb1"
// mal_id: 27631
// members: 390929
// rated: "R"
// score: 7.34
// start_date: "2015-07-12T00:00:00+00:00"
// synopsis: "The year is 2071. Humanity has been pushed to the brink of extinction following the emergence of man-eating monsters called "Aragami" that boast an immunity to conventional weaponry. They ravaged the..."
// title: "God Eater"
// type: "TV"
// url: "https://myanimelist.net/anime/27631/God_Eater"

// home
async function getMovies(search) {
    try {
        const response = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${search}`);
        console.log(response);

        let movies = response.data.results;
        let output = "";

        movies.forEach((value, index, movie) => {
            output += `
                <div class='movieContainer'>
                    <div class='movie'>
                        <img src='${movie[index].image_url}'>
                        <h4>${movie[index].title}</h4>
                        <a href='#' onclick="movieSelected('${movie[index].mal_id}')" class='btn-movie'>Detalhes</a>
                    </div>
                </div>
            `;
        });

        moviesId.innerHTML = output;
    } catch (error) {
        alert(error);
    }
}

function movieSelected(id) {
    sessionStorage.setItem("movieId", id);

    window.location = "src/pages/movie.html";
    return false;
}

async function getMovie() {
    let movieId = sessionStorage.getItem("movieId");

    try {
        const response = await axios.get(`https://api.jikan.moe/v3/anime/${movieId}`);
        console.log(response);

        let movie = response.data;
        let output = `
                    <div class='movieSelected'>
                        <img src='${movie.image_url}'>
                        <div class='d1'>
                            <h4>${movie.title}</h4>
                            <ul>
                                <li><strong>duração: </strong>${movie.duration}</li>
                                <li><strong>tipo: </strong>${movie.type}</li>
                                <li><strong>pais: </strong>${movie.Country}</li>
                                <li><strong>gênero: </strong>${movie.Genre}</li>
                                <li><strong>lançamento: </strong>${movie.Released}</li>
                                <li><strong>avaliado: </strong>${movie.Rated}</li>
                                <li><strong>avaliação IMDb: </strong>${movie.imdbRating}</li>
                                <li><strong>diretor: </strong>${movie.Director}</li>
                                <li><strong>atores: </strong>${movie.Actors}</li>
                                <li><strong>escritor: </strong>${movie.Writer}</li>
                                <li><strong>produtora: </strong>${movie.studios[0].name}</li>
                            </ul>
                            <div class='sinopse'>
                                <strong>sinopse: </strong>
                                <p>${movie.synopsis}</p>
                                <hr>
                                <div class='buttons'>
                                    <a href="${movie.url}" target="_blank" class="btn-movie">Ver em MAL</a>
                                    <a href="../../index.html" class="btn-movie">Voltar para busca</a>
                                </div>
                            </div>
                        </div>
                    </div>
            `;
        moviesId.innerHTML = output;
    } catch (error) {
        alert(error);
    }
}

/*
aired: {from: "2015-07-12T00:00:00+00:00", to: "2016-03-26T00:00:00+00:00", prop: {…}, string: "Jul 12, 2015 to Mar 26, 2016"}
airing: false
background: null
broadcast: "Sundays at 22:30 (JST)"
duration: "23 min per ep"
ending_themes: (3) ["#1: "Feed A" by OLDCODEX (ep 1)", "#2: "Kouhai Chi (荒廃地)" by Go Shiina feat. naomi (eps 2-4, 6-7, 10-13)", "#3: "Human After All" by GHOST ORACLE DRIVE feat. BiSH (ep 5)"]
episodes: 13
favorites: 1758
genres: (4) [{…}, {…}, {…}, {…}]
image_url: "https://cdn.myanimelist.net/images/anime/7/73852.jpg"
licensors: [{…}]
mal_id: 27631
members: 390819
opening_themes: [""Feed A" by OLDCODEX (eps 2-8, 11-12)"]
popularity: 295
premiered: "Summer 2015"
producers: (3) [{…}, {…}, {…}]
rank: 2133
rating: "R - 17+ (violence & profanity)"
related: {Prequel: Array(1), Alternative setting: Array(1)}
request_cache_expiry: 199261
request_cached: true
request_hash: "request:anime:98a5bc3d8d6d35b7e5844f40c16ea1bc9bbd01c0"
score: 7.34
scored_by: 172484
source: "Game"
status: "Finished Airing"
studios: [{…}]
synopsis: "The year is 2071. Humanity has been pushed to the brink of extinction following the emergence of man-eating monsters called "Aragami" that boast an immunity to conventional weaponry. They ravaged the land, consuming almost everything in their path and leaving nothing in their wake. To combat them, an organization named Fenrir was formed as a last-ditch effort to save humanity through the use of "God Eaters"—special humans infused with Oracle cells, allowing them to wield the God Arc, the only known weapon capable of killing an Aragami. One such God Eater is Lenka Utsugi, a New-Type whose God Arc takes the form of both blade and gun. Now, as one of Fenrir's greatest weapons, Lenka must master his God Arc if he is to fulfill his desire of wiping out the Aragami once and for all. The monsters continue to be born en masse while the remnants of humanity struggle to survive the night. Only God Eaters stand between the Aragami and complete and total annihilation of the human race. [Written by MAL Rewrite]"
title: "God Eater"
title_english: "God Eater"
title_japanese: "GOD EATER"
title_synonyms: []
trailer_url: "https://www.youtube.com/embed/2LUfrT5hZM4?enablejsapi=1&wmode=opaque&autoplay=1"
type: "TV"
url: "https://myanimelist.net/anime/27631/God_Eater"
*/