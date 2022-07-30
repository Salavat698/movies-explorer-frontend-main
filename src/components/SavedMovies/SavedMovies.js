import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';
import mainApi from '../../utils/mainApi';
import { errors } from '../../utils/constants';

function SavedMovies(props) {
  const savedMovies = JSON.parse(localStorage.getItem('savedMovies'));
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const [ isShortFilm, setIsShortFilm ] = useState(false);
  const [ movieNotFound, setMovieNotFound ] = useState(false);
  const [ backToSavedMovies, setBackToSavedMovies ] = useState(false);
  const [ updatedCardList, setUpdetedcardList ] = useState([]);

  useEffect(() => {
    props.setSavedMovies([]);
    getSavedMoviesHandler();
  }, []);
  
  function shortsToggler() {

    if(!isShortFilm) {
      if(shortFilmHandler(updatedCardList).length === 0) {
        setMovieNotFound(true);
        setIsShortFilm(true)
      }
      props.setSavedMovies(shortFilmHandler(props.savedMovies));
      setIsShortFilm(true)
    } if(isShortFilm) {
      props.setSavedMovies(updatedCardList);
      setIsShortFilm(false)
    }
  }

  function sortSavedCards(value) {
    return value.filter(item => item.owner === currentUser._id ? item : '');
  };

  function getSavedMoviesHandler() {
    mainApi.getMovies()
      .then((res) => {
        const ownersCardsFromCommonSavedValue = sortSavedCards(res.data);
        props.setSavedMovies(ownersCardsFromCommonSavedValue);
        localStorage.setItem('savedMovies', JSON.stringify(ownersCardsFromCommonSavedValue));
        setUpdetedcardList(ownersCardsFromCommonSavedValue);
      })
      .catch(() => props.showServerErrorHandler(errors.serverResponseErr))
  };

  function preloaderToggler(val) {
    props.setIsPreloaderShowing(val);
  };

  function shortFilmHandler(value) {
    return value.filter(item => item.duration > 40 ? false : true);
  }

  function sortCards(value) {
    const sorted = value.filter(item => {
      if(item.nameRU && item.owner === currentUser._id && item.nameRU.toLowerCase().includes(localStorage.getItem('localMovieName'))) {
        return item;
      } if (item.nameEN && item.owner === currentUser._id && item.nameEN.toLowerCase().includes(localStorage.getItem('localMovieName'))) {
        return item;
      };
    });
    return sorted;
  };

  async function findInSavedMovies() {
    await preloaderToggler(true)
    await isShortFilm && props.setSavedMovies(sortCards(props.savedMovies));
    await isShortFilm && props.savedMovies.length === 0 && setMovieNotFound(true);
    await !isShortFilm && props.setSavedMovies(sortCards(JSON.parse(localStorage.getItem('savedMovies'))));
    await [!sortCards(JSON.parse(localStorage.getItem('savedMovies'))).length ? setMovieNotFound(true) : setMovieNotFound(false), setBackToSavedMovies(true)]
    await preloaderToggler(false)
  };

  function hideResetButtonHendler() {
    setBackToSavedMovies(false);
    props.setSavedMovies(savedMovies);
  };

  function deleteMovieHandler(card) {
    mainApi.deleteMovie(card._id)
      .then((res) => {
        const checked = JSON.parse(localStorage.getItem('savedMovies')).filter((movie) => !res.message.includes(movie.nameRU));
        const deleted = props.savedMovies.filter((movie) => res.message.includes(movie.nameRU));
        const localMovies = JSON.parse(localStorage.getItem('movies'));
        props.setMovies([]);

        if(localMovies) {
          localMovies.forEach((movie) => {
            if (movie.id === deleted[0].id || movie.id === Number(deleted[0].movieId)) {
              movie.saved = false;
              movie._id = '';
              props.setMovies(movies => [ ...movies, movie ]);
            };
            localStorage.setItem('movies', JSON.stringify(localMovies));
            props.setMovies(localMovies);
          })
        }

        setUpdetedcardList((checked));
        
        localStorage.setItem('savedMovies', JSON.stringify(checked));
        
        if(isShortFilm) {
          props.setSavedMovies(shortFilmHandler(checked));
        } if(!isShortFilm) {
          props.setSavedMovies(checked);
        }
      })
      .catch((err) => {

        props.showServerErrorHandler(errors.serverResponseErr);
      })
  };
  return (
    <div className='saved-movies'>
      <SearchForm getMovieHandler={findInSavedMovies}
                  shortsToggler={shortsToggler}
                  searchKeyword='localMovieName'
                  isShortFilm={isShortFilm}
                  setIsShortFilm={setIsShortFilm} />

      <MoviesCardList movies={props.savedMovies}
                      setSavedMovies={props.setSavedMovies}
                      setMovies={props.setMovies}
                      deleteMovieHandler={deleteMovieHandler} 
                      backToSavedMovies={backToSavedMovies}
                      hideResetButtonHendler={hideResetButtonHendler} 
                      movieNotFound={movieNotFound}
                      setMovieNotFound={setMovieNotFound} />
                      
      { props.isPreloaderShowing && <Preloader />}
    </div>
  )
};

export default SavedMovies;