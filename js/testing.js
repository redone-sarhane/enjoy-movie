movies.map((movie, i) => {
  let genresHTML = "";

  // const genres = await getGenres(movie.genre_ids); ///// whyyy this causes a problem????
  // await genres.map((genre) => {
  //   genresHTML += `<span class="badge">${genre.name}</span>`;
  // });

  carousel.innerHTML += `

    <div class="owl-carousel-info-wrap item">
                    <img
                      src="https://image.tmdb.org/t/p/w300/${movie.poster_path}"
                      class="owl-carousel-image img-fluid"
                      alt=""
                    />
                    
  
                    <div class="owl-carousel-info">
                      <h5 class="mb-2">
                        ${movie.original_title}
                        <img
                          src="images/verifdied.png"
                          class="owl-carousel-verified-image img-fluid"
                          alt=""
                        />
                      </h5>
  
                      <span class="badge">Storytelling ${i + 1}</span>

                      ${genresHTML}

                      <span class="badge">Business${i + 1}</span>
                    </div>
  
                    <div class="social-share">
                      <ul class="social-icon">
                        <li class="social-icon-item">
                          <a href="#" class="social-icon-link bi-twitter"></a>
                        </li>
  
                        <li class="social-icon-item">
                          <a href="#" class="social-icon-link bi-facebook"></a>
                        </li>
                      </ul>
                    </div>
                  </div>
    `;
});
