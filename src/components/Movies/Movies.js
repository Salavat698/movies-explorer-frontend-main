import SearchForm from '../SearchForm/SearchForm';
import Preloader from '../Preloader/Preloader';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { useEffect, useState } from 'react';
import { errors } from '../../utils/constants'
import movieApi from '../../utils/movieApi';
import mainApi from '../../utils/mainApi';
import { isURL } from 'validator';
import { useContext  } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';

function Movies(props) {
  const currentUser = useContext(CurrentUserContext);
  const localMovies = JSON.parse(localStorage.getItem('movies'));
  const [ isShortFilm, setIsShortFilm ] = useState(false);
  const [ movieNotFound, setMovieNotFound ] = useState(false);
  const beatFilmBase = JSON.parse(localStorage.getItem('beatFilmBase'));
  const [ currentCardArrayLength, setCurrentArrayLength ] = useState(0);
  const [ isSubmiting, setIsSubmiting ] = useState(false);
  
  useEffect(() => {
    props.setMovies([]);
    toggleShortHandler(localMovies);
  }, [isShortFilm]);

  function toggleShortHandler(value) {
    if(!localMovies) return;
    if(isShortFilm) {
      if(shortFilmHandler(sortCards(value)).length === 0) {
        setMovieNotFound(true);
      };
      localMoviesHandler(shortFilmHandler(sortCards(value)));
      return
    };
    localMoviesHandler(sortCards(value));
  };
  
  function checkIsMovieSavedHandler(value) {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));  
    return value.filter((movie) => {
      return savedMovies.filter((item) => {
        if(Number(item.movieId) === movie.id) {
          movie.saved = true;
          movie._id = item._id
          return movie;
        };
      });
    });
  };

  function localMoviesHandler(value) {
    setCurrentArrayLength(value.length);

    if (value) {
      for (let i = 0; i < value.length && i < props.uploadingCards; i++) {
        props.setMovies(movies => [...movies, value[i]])
      };
    };
  };

  function preloaderToggler(val) {
    props.setIsPreloaderShowing(val)
  };

  function shortFilmHandler(value) {
    return value.filter(item => item.duration > 40 ? false : true);
  };

  function sortCards(value) {
    const sorted = value.filter(item => {
      if (item.nameRU && item.nameRU.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      } if (item.nameEN && item.nameEN.toLowerCase().includes(localStorage.getItem('movieName'))) {
        return item;
      };
    });
    return sorted;
  };

  function checkIncomingValueValidityHandler(values) {
    return values.map((item) => {
      item.saved = false;
      for (let i in item) {
        if (item[i] === null) {
          item[i] = 'Значение отсутствует';
        }; 
        if (i === 'trailerLink') {
          if (!isURL(item[i])){
            item[i] = `https://www.youtube.com/results?search_query=${item.nameEN.replaceAll(' ', '+')}`;
          };
        };
      };
      return item;
    }
  )};

  function sortDeletedCards(value, length) {
    const backVal = [];
    for (let i = 0; i < length; i++) {
      backVal.push(value[i]);
    };
    return backVal;
  };

  function separateCurrentUsersSavedMovies(value) {
    return value.filter(item => {
      if(item.owner === currentUser._id) {
        return item.saved = true;
      };
    });
  };

  function deleteMovieHandler(card) {
    mainApi.deleteMovie(card._id)
    .then((res) => {
      const deleted = props.movies.filter((movie) =>  res.message.includes(movie.nameRU));
      const checked = props.movies.filter((movie) =>  !res.message.includes(movie.nameRU));
      const localMovies = JSON.parse(localStorage.getItem('movies'));
      
      localMovies.forEach((movie) => {
        if (movie.id === deleted[0].id || movie.id === Number(deleted[0].movieId)) {
          movie.saved = false;
          movie._id = '';
        };
          localStorage.setItem('movies', JSON.stringify(localMovies));
        });
        if(isShortFilm) {
          props.setMovies(shortFilmHandler(localMovies));
        } if (!isShortFilm) {
          props.setMovies(sortDeletedCards(localMovies, props.movies.length));
        };
        props.setSavedMovies(checked);
      })
      .catch(() => {
        props.showServerErrorHandler(errors.serverResponseErr);
      });
  };

  async function getMovieHandler() {
    if(beatFilmBase) {
      await [props.setMovies([]), localStorage.removeItem('movies'), preloaderToggler(true)];
      const sorted = sortCards(beatFilmBase);
      const checkedValidityMovies = await checkIncomingValueValidityHandler(sorted); 
      const checked = await checkIsMovieSavedHandler(checkedValidityMovies)
      await localStorage.setItem('movies', JSON.stringify(checked));
      await localMoviesHandler(checked);   
      await checked.length === 0 ? setMovieNotFound(true) : setMovieNotFound(false);
      await preloaderToggler(false);
      return;
    };

    try {
      await [props.setMovies([]), localStorage.removeItem('movies'), preloaderToggler(true)];
      const allSavedMoviesByUsers = await mainApi.getMovies();
      const currentUsersSavedCards = await separateCurrentUsersSavedMovies(allSavedMoviesByUsers.data);
      await [props.setSavedMovies(currentUsersSavedCards), localStorage.setItem('savedMovies', JSON.stringify(currentUsersSavedCards))];
      const movieApiFilms = await movieApi.getMovies();
      const checkedmovieApiData = await checkIncomingValueValidityHandler(movieApiFilms);
      await localStorage.setItem('beatFilmBase', JSON.stringify(checkedmovieApiData));
      const sortedCards = await sortCards(movieApiFilms);
      const checkedValidityMovies = await checkIncomingValueValidityHandler(sortedCards);
      const checked = await checkIsMovieSavedHandler(checkedValidityMovies);
      await localStorage.setItem('movies', JSON.stringify(checked));
      await localMoviesHandler(checked);
      await localMovies === null ? setMovieNotFound(true) : setMovieNotFound(false);
    } catch (err) {
      props.showServerErrorHandler(errors.serverResponseErr);
    } finally {
      await preloaderToggler(false);
    };
  };

  function moreButtonVisibilityHandler() {
    const  status = currentCardArrayLength !== 0 && props.movies.length && !(props.movies.length === currentCardArrayLength);
    return Boolean(status);
  };

  function addMoreMovies() {
    const num = props.movies.length;
    for(let i = num; i < num + props.uploadCardsQunt; i++) {
      if(localMovies[i]){
        props.setMovies(movies => [...movies, localMovies[i]]);
      };
    };
  };

  function shortsToggler() {
    setIsShortFilm(!isShortFilm);
  };

  return (
    <div className='movies'>
      <SearchForm setMovies={props.setMovies}
                  showServerErrorHandler={props.showServerErrorHandler}
                  setDesiredMovie={props.setDesiredMovie}
                  screenWidth={props.screenWidth}
                  setIsPreloaderShowing={props.setIsPreloaderShowing}
                  getMovieHandler={getMovieHandler}
                  shortsToggler={shortsToggler}
                  searchKeyword='movieName'
                  isShortFilm={isShortFilm}
                  setIsShortFilm={setIsShortFilm} />

      <MoviesCardList setMovies={props.setMovies}
                      screenWidth={props.screenWidth}
                      isPreloaderShowing={props.isPreloaderShowing}
                      movies={props.movies}
                      showServerErrorHandler={props.showServerErrorHandler}
                      movieNotFound={movieNotFound}
                      savedMovies={props.savedMovies}
                      setSavedMovies={props.setSavedMovies}
                      localMoviesHandler={localMoviesHandler}
                      deleteMovieHandler={deleteMovieHandler}
                      isShortFilm={isShortFilm}>
          { moreButtonVisibilityHandler() && <button className='movies-card-list__more-btn' type='button' onClick={addMoreMovies}>Ещё</button>}
          </MoviesCardList>
      {props.isPreloaderShowing && <Preloader />}
    </div>
  );
};

export default Movies;
