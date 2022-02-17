// Selector****
let main = document.getElementById("main");
let latestBtn = document.getElementById("latestBtn");
let toprated = document.getElementById("topRatedbtn");
let homebtn = document.getElementById("homebtn");
let searchbtn = document.getElementById('search');
let barsbtn = document.querySelector('.bars');
let btnscontainer = document.querySelector('.btns-container')
// Api
let apikey = "04c35731a5ee918f014970082a0088b1";
let apiurl = "https://api.themoviedb.org/3/";
let imageurl = "https://image.tmdb.org/t/p/w1280";
// Event Handling****
latestBtn.addEventListener("click", Get_latest);
toprated.addEventListener("click", Get_TopRated);
homebtn.addEventListener("click", getmovie);
searchbtn.addEventListener('input' , searchMovie)
// Functions****
async function getmovie() {
  homebtn.classList.add('active')
  latestBtn.classList.remove('active')
  toprated.classList.remove('active')
  let response = await fetch(
    `${apiurl}discover/movie?sort_by=popularity.desc&api_key=${apikey}`
  );
  let data = await response.json();
  let str = "";
  data.results.forEach((element) => {
    str += `
        <div class="movie-box">
            <img 
            src="${imageurl + element.poster_path}" 
            alt="${element.title}">
            <div class="name-box">
                <p class="movie-name">${element.title}</p>
                <h5 class="rating">${element.vote_average}</h5>
                <div class="overview">
                    <p>${element.release_date}</p>
                    <h2>Overview</h2>
                <p>${element.overview}</p> 
                <button class="similarmovies" type="button" id="${element.id}"onclick="Get_Similar(this.id)">Similar Movies</button>
                </div>
            </div>
        </div>
        `;
  });
  main.innerHTML = str;
}
getmovie();
async function Get_latest() {
  homebtn.classList.remove('active')
  latestBtn.classList.add('active')
  homebtn.classList.remove('active')
  let response = await fetch(
    `${apiurl}movie/upcoming?api_key=${apikey}&language=en-US`
  );
  let data = await response.json();
  let str = "";
  data.results.forEach((element) => {
    str += `
    <div class="movie-box">
    <img 
    src="${imageurl + element.poster_path}" 
    alt="${element.title}">
    <div class="name-box">
    <p class="movie-name">${element.title}</p>
    <h5 class="rating">${element.vote_average}</h5>
    <div class="overview">
    <p>${element.release_date}</p>
    <h2>Overview</h2>
    <p>${element.overview}</p> 
    <button class="similarmovies" type="button" id="${element.id}"onclick="Get_Similar(this.id)">Similar Movies</button>
    </div>
    </div>
    </div>
    `;
  });
  main.innerHTML = str;
}
// Top Reted Movies
async function Get_TopRated() {
  homebtn.classList.remove('active')
  latestBtn.classList.remove('active')
  toprated.classList.add('active')
  let response = await fetch(
    `${apiurl}movie/top_rated?api_key=${apikey}&language=en-US&page=1`
  );
  let data = await response.json();
  let str = "";
  data.results.forEach((element) => {
    str += `
    <div class="movie-box">
    <img 
    src="${imageurl + element.poster_path}" 
    alt="${element.title}">
    <div class="name-box">
    <p class="movie-name">${element.title}</p>
    <h5 class="rating">${element.vote_average}</h5>
    <div class="overview">
    <p>${element.release_date}</p>
    <h2>Overview</h2>
    <p>${element.overview}</p> 
    <button class="similarmovies" type="button" id="${element.id}"onclick="Get_Similar(this.id)">Similar Movies</button>
    </div>
    </div>
    </div>
    `;
  });
  main.innerHTML = str;
}
// Similar Movies***
async function Get_Similar(id) {
  homebtn.classList.remove('active')
  latestBtn.classList.remove('active')
  homebtn.classList.remove('active')
    console.log(id);
    let response = await fetch(
      `${apiurl}movie/${id}/similar?api_key=${apikey}&language=en-US`
    );
    let data = await response.json();
    let str = "";
    data.results.forEach((element) => {
      str += `
          <div class="movie-box">
              <img 
              src="${imageurl + element.poster_path}" 
              alt="${element.title}">
              <div class="name-box">
                  <p class="movie-name">${element.title}</p>
                  <h5 class="rating">${element.vote_average}</h5>
                  <div class="overview">
                      <p>${element.release_date}</p>
                      <h2>Overview</h2>
                  <p>${element.overview}</p> 
                  <button class="similarmovies" type="button" id="${element.id}"onclick="Get_Similar(this.id)">Similar Movies</button>
                  </div>
              </div>
          </div>
          `;
    });
    main.innerHTML = str;
  }
// Searching a Movie****
async function searchMovie() {
  homebtn.classList.remove('active')
  latestBtn.classList.remove('active')
  toprated.classList.remove('active')
    let movieName = searchbtn.value;
    let response = await fetch(
      `${apiurl}search/movie?api_key=${apikey}&language=en-US&query=${movieName}`
    );
    let data = await response.json();
    let str = "";
    data.results.forEach((element) => {
      str += `
          <div class="movie-box">
              <img 
              src="${imageurl + element.poster_path}" 
              alt="${element.title}">
              <div class="name-box">
                  <p class="movie-name">${element.title}</p>
                  <h5 class="rating">${element.vote_average}</h5>
                  <div class="overview">
                      <p>${element.release_date}</p>
                      <h2>Overview</h2>
                  <p>${element.overview}</p> 
                  <button class="similarmovies" type="button" id="${element.id}"onclick="Get_Similar(this.id)">Similar Movies</button>
                  </div>
              </div>
          </div>
          `;
    });
    main.innerHTML = str;
  }

  // Setting hamburger btn***
  barsbtn.addEventListener('click',()=>{
    btnscontainer.classList.toggle('show')
    btnscontainer.classList.toggle('visibile')
    barsbtn.classList.toggle('rotate')
  })