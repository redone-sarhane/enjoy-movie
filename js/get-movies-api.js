"use strict";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkNjE0NDU1NmU1NDhhNjZjMGM5ZGI4ZjY2NmU1YjdhNCIsInN1YiI6IjY2MjA2ODE3ZTRjOWViMDE3Y2Y0ZGQ1NiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.hBRTBKSL0xej6dPssUsBlak8MxtZbKpo0Ybl3HGvdFU",
  },
};
const baseUrl = "https://api.themoviedb.org/3";
const baseImg = "https://image.tmdb.org/t/p/w500/";
const getMovies = "discover/movie";
const latest = "sort_by=popularity.desc";

const getDataApi = async function (api) {
  const response = await fetch(api, options);
  const data = await response.json();
  return data;
};

const fetchMovies = async function () {
  const data = await getDataApi(`${baseUrl}/${getMovies}`);
  setCarousel(data.results);
  getMovieDetails(data.results);
  // setLatestMovies();
};

const setCarousel = async function (movies) {
  const carousel = document.querySelector(".owl-carousel");
  // console.log(movies);
  for (const movie of movies) {
    carousel.innerHTML += `
        <div class="owl-carousel-info-wrap item">

        <img
          src="images/${movie.adult ? "plus18" : "verified"}.png"
          class="owl-carousel-verified-image img-fluid"
          alt=""
        />
        
        <img
          src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
          class="owl-carousel-image img-fluid"
          alt=""
        />
        <div class="owl-carousel-info">
          <h6 class="mb-2">
            ${sliceString(movie.original_title, 10)}
          </h6>
          <span class="badge">${movie.original_language}</span>
          <span class="badge">${movie.release_date.split("-")[0]}</span>
        </div>
        </div>
  `;
  }

  $(".owl-carousel").owlCarousel({
    center: true,
    loop: true,
    margin: 30,
    autoplay: false,
    responsiveClass: true,
    responsive: {
      0: {
        items: 2,
      },
      767: {
        items: 3,
      },
      1200: {
        items: 4,
      },
    },
  });
};

const getMovieDetails = function (movies) {
  const containerLatestMovies = document.querySelector(
    ".latest-podcast-section .container .row"
  );

  let moviesUrls = [];
  for (const movie of movies) {
    moviesUrls.push(`${baseUrl}/movie/${movie.id}`);
  }
  // console.log(moviesUrls);
  moviesUrls.slice(0, 2).forEach(async (movieUrl) => {
    const data = await getDataApi(movieUrl);

    const neccesaryDataMovie = {
      imgPoster: data.poster_path
        ? `${baseImg}/${data.poster_path}`
        : "../images/imagenotfoundportrait.png",

      overview: data.overview
        ? sliceString(data.overview, 90)
        : "sorry we dont have an overview yet...",

      runtime: data.runtime ? minutesToHours(data.runtime) : "---",

      title: data.original_title
        ? sliceString(data.original_title, 20)
        : "---------",

      vote: `${
        data.vote_average.toFixed(1) ? data.vote_average.toFixed(1) : "---"
      }/10(${data.vote_count ? numberShorter(data.vote_count) : "---"})`,

      popularity: data.popularity ? data.popularity : "---",

      releaseYear: data.release_date ? data.release_date.split("-")[0] : "----",

      companyName: data.production_companies[0].name
        ? data.production_companies[0].name
        : "--------",
      companyOrigin: data.production_companies[0].origin_country
        ? data.production_companies[0].origin_country
        : "--",

      companyLogo: data.production_companies[0].logo_path
        ? `${baseImg}/${data.production_companies[0].logo_path}`
        : "../images/imagenotfoundsquare.png",
    };

    containerLatestMovies.innerHTML += `
    <div class="col-lg-6 col-12 mb-4">
    <div class="custom-block d-flex">
    <div class="">
    <div class="custom-block-icon-wrap">
          <div class="section-overlay"></div>
          <a href="detail-page.html" class="custom-block-image-wrap">
            <img
              src="${neccesaryDataMovie.imgPoster}"

              class="custom-block-image img-fluid"
              alt=""
            />

            <a href="#" class="custom-block-icon">
              <i class="bi-play-fill"></i>
            </a>
          </a>
        </div>

        <div class="mt-2">
          <a href="#" class="btn custom-btn"> Watch Now </a>
        </div>
      </div>

      <div class="custom-block-info">
        <div class="custom-block-top d-flex mb-1">
          <small class="me-4">
            <i class="bi-clock-fill custom-icon"></i>
            ${neccesaryDataMovie.runtime}
          </small>

          <small>
          <i class="bi-calendar3 custom-icon"></i>

          ${neccesaryDataMovie.releaseYear}
          
          
          </small>
        </div>

        <h5 class="mb-2">
          <a href="detail-page.html"> ${neccesaryDataMovie.title} 
          </a>
        </h5>

        <div class="profile-block d-flex">
          <img
          src="${neccesaryDataMovie.companyLogo}"
            class="profile-block-image img-fluid"
            alt=""
          />


          <p>
            ${data.production_companies[0].name}
            <img
            src="images/verified.png"
            class="verified-image img-fluid"
            alt=""
            />
            <strong>${neccesaryDataMovie.companyOrigin}</strong>
          </p>
        </div>

        <p class="mb-0">${neccesaryDataMovie.overview}</p> 

        <div
          class="custom-block-bottom d-flex justify-content-between mt-3"
        >
          <a href="#" class="bi-star me-1">
            <span>${neccesaryDataMovie.vote}</span>
          </a>

          <a href="#" class="bi-heart me-1">
            <span>42.5k</span>
          </a>

          <a href="#" class="bi-graph-up-arrow">
            <span>${data.popularity}</span>
          </a>
        </div>
      </div>

      <div class="d-flex flex-column ms-auto">
        <a href="#" class="badge ms-auto">
          <i class="bi-heart"></i>
        </a>

        <a href="#" class="badge ms-auto">
          <i class="bi-bookmark"></i>
        </a>
      </div>
    </div>
  </div>




    `;
  });
};

//fetch instant data
fetchMovies();

const renderSearchByKw = async function (keyword) {
  const data = await getDataApi(
    `${baseUrl}/search/movie?query=${keyword.split(" ").join("%20")}`
  );
  const searchContainer = document.querySelector(
    ".search-section .search-results"
  );

  if (!data.results.length) {
    searchContainer.innerHTML = `<h3 class="text-white text-center col-12">Oppps, no results</h3>`;
    return;
  }

  const results = data.results;
  results.forEach((el) => {
    searchContainer.innerHTML += `
          <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
            <div class="custom-block custom-block-overlay">
              <a href="detail-page.html" class="custom-block-image-wrap">
                <img
                  src="${baseImg}/${el.poster_path}"
                  class="custom-block-image img-fluid"
                  alt=""
                />
              </a>

              <div class="custom-block-info custom-block-overlay-info">
                <h5 class="mb-1">
                  <a href="listing-page.html"> ${el.original_title} </a>
                </h5>

                <p class="badge mb-0">${
                  el.release_date ? el.release_date.split("-")[0] : "----"
                }</p>
              </div>
            </div>
          </div>
  `;
  });
};

//fetch data from search
const searchBtn = document.getElementById("submit-search-btn");
let inputVal = document.getElementById("search-input").value;

searchBtn.addEventListener("click", async function (e) {
  e.preventDefault();
  const searchContainer = document.querySelector(
    ".search-section .search-results"
  );
  searchContainer.innerHTML = "";

  inputVal = document.getElementById("search-input").value;
  // console.log(inputVal);

  // console.log(renderSearchByKw(inputVal));
  // let resultsStatus = await renderSearchByKw(inputVal);

  // if (!resultsStatus) {
  //   searchContainer.innerHTML = `<h3 class="text-white text-center col-12">
  //   Oppps, no results match \`${inputVal}\`
  //   </h3>`;
  //   return;
  // }

  renderSearchByKw(inputVal);
});

//** Simplifier functions::

const sliceString = (str, charLimit) => {
  const isLong = str.split("").length > charLimit;
  if (isLong) {
    return str.split("").slice(0, charLimit).join("") + "...";
  } else {
    return str;
  }
};

const numberShorter = (num) => {
  let finalNum;
  if (num >= 1_000_000_000) {
    finalNum = (num / 1_000_000_000).toFixed(1) + "B";
  } else if (num >= 1_000_000) {
    finalNum = (num / 1_000_000).toFixed(1) + "M";
  } else if (num >= 1_000) {
    finalNum = (num / 1_000).toFixed(1) + "K";
  } else {
    finalNum = String(num);
  }
  return finalNum;
};

const minutesToHours = (minutes) => {
  let finalVal;
  if (minutes < 60) {
    return minutes + "m";
  } else if (minutes % 60 == 0) {
    finalVal = minutes / 60 + "h";
  } else if (minutes > 60) {
    finalVal = Math.floor(minutes / 60) + "h" + (minutes % 60) + "m";
  }
  return finalVal;
};

//** */ General functions::

// focus on pressing "/" key
(() => {
  document.addEventListener("keyup", (event) => {
    if (event.key == "/") {
      const searchInput = document.getElementById("search-input");
      searchInput.focus();
    }
  });
})();

console.log("i used ready template HTML/CSS and modified javscript API part");
console.log("this is project is not comlpeted yet(still under development");
