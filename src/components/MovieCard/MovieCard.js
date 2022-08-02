import { useLocation } from "react-router";
import { beatfilmApiURL } from "../../utils/constants";
import mainApi from "../../utils/mainApi";
import { errors } from "../../utils/constants";

function MovieCard(props) {
  const location = useLocation();
  const { card } = props;

  function deleteMovieHandler() {
    props.deleteMovieHandler(card);
  }

  function sortCards(value, length) {
    const backVal = [];
    for (let i = 0; i < length; i++) {
      backVal.push(value[i]);
    }
    return backVal;
  }

  function shortFilmHandler(value) {
    return value.filter((item) => (item.duration > 40 ? false : true));
  }

  function saveMovieHandler() {
    const film = {
      country: card.country,
      director: card.director,
      duration: card.duration,
      year: card.year,
      description: card.description,
      image: beatfilmApiURL + card.image.url,
      trailer: card.trailerLink,
      nameRU: card.nameRU,
      nameEN: card.nameEN || card.nameRU,
      movieId: String(card.id),
    };

    mainApi
      .saveMovie(film)
      .then((res) => {
        const savedMovies = [
          ...JSON.parse(localStorage.getItem("savedMovies")),
          res.data,
        ];
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
        const localMovies = JSON.parse(localStorage.getItem("movies"));
        localMovies.forEach((movie) => {
          if (movie.id === Number(res.data.movieId)) {
            movie.saved = true;
            movie._id = res.data._id;
            props.setSavedMovies((savedMovies) => [...savedMovies, movie]);
          }
        });
        localStorage.setItem("movies", JSON.stringify(localMovies));
        if (props.isShortFilm) {
          props.setMovies(shortFilmHandler(localMovies));
        }
        if (!props.isShortFilm) {
          props.setMovies(sortCards(localMovies, props.movies.length));
        }
      })
      .catch((err) => {
        props.showServerErrorHandler(errors.serverResponseErr);
      });
  }

  return (
    <li className="movie-card">
      <div className="movie-card__container">
        <div className="movie-card__info">
          <h2 className="movie-card__title">{card.nameRU}</h2>
          <p className="movie-card__duration">{`${Math.floor(
            card.duration / 60
          )}ч ${card.duration % 60}м`}</p>
          {location.pathname === "/movies" && (
            <button
              className={`movie-card__save-btn ${
                card.saved ? "movie-card__saved" : ""
              }`}
              type="button"
              onClick={card.saved ? deleteMovieHandler : saveMovieHandler}
            ></button>
          )}

          {location.pathname === "/saved-movies" && (
            <button
              className="movie-card__delete-btn"
              type="button"
              onClick={deleteMovieHandler}
            />
          )}
        </div>

        <a
          className="movie-card__trailer"
          href={card.trailerLink || card.trailer}
          target="_blank"
          rel="noreferrer"
          tooltip={`Посмотреть трейлер на Youtube`}
        >
          <img
            className="movie-card__image"
            alt={card.nameRU}
            src={
              typeof card.image === "string"
                ? card.image
                : beatfilmApiURL + card.image.url
            }
          />
        </a>
      </div>
    </li>
  );
}

export default MovieCard;
