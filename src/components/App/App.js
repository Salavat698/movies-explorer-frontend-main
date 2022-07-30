import '../../index.css';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register'
import Profile from '../Profile/Profile';
import Error from '../Error/Error';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies'
import ScrollUp from '../ScrollUp/ScrollUp';
import EditProfile from '../EditProfile/EditProfile';
import ModalPopup from '../ModalPopup/ModalPopup';
import Popup from '../Popup/Popup';
import { Route, Switch, useLocation, useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/contexts';
import ProtectedRoute from  '../ProtectedRoute/ProtectedRoute';
import auth from '../../utils/auth';
import { errors, registrationSucceed } from '../../utils/constants';
import mainApi from '../../utils/mainApi';

function App() {
  const [ isMenuOpen, setIsMenuOpen ] = useState(false);
  const [ screenWidth, setScreenWidth ] = useState(document.documentElement.clientWidth);
  const [ isModalOpen, setIsModalOpen ] = useState(false);
  const [ modalError, setModalError ] = useState('');
  const [ isPreloaderShowing, setIsPreloaderShowing ] = useState(false);
  const [ isResetButtonPushed, setIsResetButtonPushed ] = useState(false)
  const [ isLogged, setIsLogged ] = useState(false);
  const [ isRequestOk, setIsRequestOk ] = useState(true);
  const [ isRegisterPopupShowing, setIsRegPopupShowing ] = useState(false);
  const [ serverResponceNubmber, setServerResponseNumber ] = useState(0);
  const [ serevrResponseMsg, setServerResponseMsg ] = useState('');
  const [ movies, setMovies ] = useState([]);
  const [ savedMovies, setSavedMovies ] = useState([]);
  const location = useLocation();
  const uploadingCards = screenWidth < 480 ? 5 : screenWidth < 769 ? 8 : 12;
  const uploadCardsQunt = screenWidth < 769 ? 2 : 3;
  const history = useHistory();
  const isLoggedIn = localStorage.getItem('isLoggedIn');
  const [ currentUser, setCurrentUser ] = useState(JSON.parse(localStorage.getItem('currentUser')));
  const [ submitting, setIsSubmitting ] = useState(false);

  useEffect(() => {
    window.addEventListener('resize', handleWidth, { passive: true });
    return () => {
      window.removeEventListener('rezize', handleWidth);
    };
  }, []);

  if(!currentUser && isLogged) {
    mainApi.getProfileData()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch((err) => {
        if(err === 401) {
          showServerErrorHandler(errors.loginFail);
          return
        }
        showServerErrorHandler(errors.serverResponseErr);
      })
  }

  function handleCheckToken() {
    auth.checkToken()
      .then(() => {
        setIsLogged(true);
      })
      .catch((err) => {
        if (err.status === 401) {
          setIsLogged(false);
          localStorage.clear();
        };
      })
  };

  useEffect(() => {
    if(isLoggedIn){
      handleCheckToken();
    };
  }, []);

  function handleSignUp({ name, password, email }) {
    auth.signUp({ name, password, email: email.toLowerCase() })
      .then((res) => {
        setServerResponseMsg(registrationSucceed);
        setIsRequestOk(true);
        setServerResponseNumber(200);
        handleSignIn({ email: res.email, password })
      })
      .catch((err) => {
        setIsRequestOk(false);
        setServerResponseNumber(err.status);
      })
      .finally(() =>  setIsRegPopupShowing(true))
  };
  
  function handleSignIn({ email, password }) {
    auth.signIn({ email: email.toLowerCase(), password })
      .then((res) => {
        localStorage.setItem('currentUser', JSON.stringify(res));
        localStorage.setItem('isLoggedIn', true);
        setIsLogged(true);
        history.push('/movies')
      })
      .catch(() => {
        showServerErrorHandler(errors.loginFail);
      })
      .finally(() => setIsSubmitting(false))
  };

  function handleWidth() {
    setScreenWidth(document.documentElement.clientWidth);
  };

  function menuOpenHandler() {
    setIsMenuOpen(!isMenuOpen);
  };
  
  function showRegistrationStatus() {
    setIsRegPopupShowing(false);
    setServerResponseNumber(0);
  };

  function showServerErrorHandler(error) {
    setIsModalOpen(true);
    setModalError(error);
  };

  function hideServerErrorHandler() {
    setIsModalOpen(false);
    setModalError('');
  };

  return (
    <CurrentUserContext.Provider value={ isLogged ? currentUser : ''}>
        <div className='page'>{
          isModalOpen && <ModalPopup closeModal={hideServerErrorHandler}
                                     isModalOpen={isModalOpen}
                                     error={modalError} />
          }<div className={`page__container ${isMenuOpen && screenWidth < 769 ? 'page__container_dark' : ''}`}>
            { location.pathname !== '/signin'
            && location.pathname !== '/signup'
            && <Header menuHandler={menuOpenHandler}
                       menuStatus={isMenuOpen}
                       screenWidth={screenWidth}
                       isMenuOpen={isMenuOpen}
                       isLoggedIn={isLoggedIn} />}

            {isRegisterPopupShowing && <Popup  isRequestOk={isRequestOk}
                    serverResponceNubmber={serverResponceNubmber} 
                    showRegistrationStatus={showRegistrationStatus}
                    serevrResponseMsg={serevrResponseMsg} />}
            
            <Switch>
              <Route  exact path='/'>
                <Main />
              </Route>
              
              <ProtectedRoute component={EditProfile}
                              path='/edit-profile'
                              isLoggedIn={isLoggedIn}
                              showServerErrorHandler={showServerErrorHandler} 
                              setIsRequestOk={setIsRequestOk}
                              setServerResponseNumber={setServerResponseNumber}
                              setServerResponseMsg={setServerResponseMsg}
                              setIsRegPopupShowing={setIsRegPopupShowing} 
                              setIsLogged={setIsLogged}/>
              
              <ProtectedRoute component={Movies}
                              path='/movies'
                              setMovies={setMovies}
                              movies={movies}
                              showServerErrorHandler={showServerErrorHandler}
                              screenWidth={screenWidth}
                              isPreloaderShowing={isPreloaderShowing}
                              setIsPreloaderShowing={setIsPreloaderShowing}
                              uploadingCards={uploadingCards}
                              uploadCardsQunt={uploadCardsQunt}
                              isLoggedIn={isLoggedIn}
                              savedMovies={savedMovies}
                              setSavedMovies={setSavedMovies} />
              
              <ProtectedRoute component={SavedMovies}
                              path='/saved-movies'
                              isLoggedIn={isLoggedIn}
                              isPreloaderShowing={isPreloaderShowing}
                              setIsPreloaderShowing={setIsPreloaderShowing}
                              showServerErrorHandler={showServerErrorHandler}
                              savedMovies={savedMovies}
                              setSavedMovies={setSavedMovies}
                              setMovies={setMovies} 
                              setIsResetButtonPushed={setIsResetButtonPushed}
                              isResetButtonPushed={isResetButtonPushed} />

              <ProtectedRoute component={Profile}
                              path='/profile'
                              isLoggedIn={isLoggedIn}
                              setIsLogged={setIsLogged}
                              showServerErrorHandler={showServerErrorHandler}
                              setCurrentUser={setCurrentUser} />

              {!isLoggedIn && <Route path = '/signin'>
                <Login onSubmit={handleSignIn} 
                       submitting={submitting}
                       setIsSubmitting={setIsSubmitting} />
              </Route>}
              
              {!isLoggedIn && <Route path = '/signup'>
                <Register onSubmit={handleSignUp} 
                          setIsRequestOk={setIsRequestOk}
                          setServerResponseNumber={setServerResponseNumber} />
              </Route>}
              
              {(isLogged || !isLoggedIn) && <Route path="" component={Error} />}
            </Switch>
            { location.pathname !== '/profile'
            && location.pathname !== '/signin'
            && location.pathname !== '/signup'
            && location.pathname !== '/edit-profile'
            && <Footer />}
            <ScrollUp />
          </div>
        </div>
    </CurrentUserContext.Provider>
  );
};

export default App;