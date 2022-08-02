import { Link } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/contexts";
import auth from "../../utils/auth";
import { useHistory } from "react-router-dom";
import { errors } from "../../utils/constants";

function Profile(props) {
  const currentUser = useContext(CurrentUserContext);
  const history = useHistory();
  function signOutHandler() {
    props.setIsLogged(false);
    auth
      .signOut()
      .then(() => {
        localStorage.clear();
        props.setCurrentUser(null);
        setTimeout(() => {});
      })
      .then(() => history.push("/"))
      .catch(() => props.showServerErrorHandler(errors.serverResponseErr));
  }

  return (
    <div className="profile">
      <div className="profile__container">
        <h1 className="profile__greeting">Привет, {currentUser.name}!</h1>
        <div className="profile__data-container">
          <div className="profile__name-container">
            <p className="profile__name-title">Имя</p>
            <p className="profile__name">{currentUser.name}</p>
          </div>
          <div className="profile__underline" />
          <div className="profile__email-container">
            <p className="profile__email-title">E-mail</p>
            <p className="profile__email">{currentUser.email}</p>
          </div>
        </div>
        <div className="profile__links">
          <Link to="/edit-profile" className="link link_place_profile">
            Редактировать
          </Link>
          <Link
            to="/signin"
            className="link link_place_profile"
            onClick={signOutHandler}
          >
            Выйти из аккаунта
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
