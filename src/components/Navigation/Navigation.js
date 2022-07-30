import { Link } from 'react-router-dom';

function Navigation(props) {
  function closeMenuHandler(e) {
    if (!e.srcElement.className.includes('navigation') || e.key === 'Escape') {
      window.removeEventListener('keydown', closeMenuHandler);
      window.removeEventListener('click', closeMenuHandler);
      props.menuHandler();
    };
  };

  if(props.isOpen){
    window.addEventListener('click', closeMenuHandler);
    window.addEventListener('keydown', closeMenuHandler);
  };

  return (
    <div className={`navigation ${props.isOpen && props.screenWidth < 769 ? 'navigation_opened' : ''}`}>
        {props.screenWidth < 769 && <button className='navigation__close-menu' type='button' onClick={props.menuHandler}/>}
        {props.screenWidth < 769 && <Link to='/' className='link link_place_side-menu-opened '>Главная</Link>}
        <Link to='/movies' href='#' className={`link  ${props.screenWidth < 769 ? 'link_place_side-menu-opened': 'link_place_navigation'}`} onClick={props.menuHandler}>{'Фильмы'}</Link>
        <Link to='/saved-movies' href='#' className={`link  ${props.screenWidth < 769 ? 'link_place_side-menu-opened' :'link_place_navigation'}`} onClick={props.menuHandler}>{'Сохраненные фильмы'}</Link>
        <Link to='/profile' href='#' className='navigation__account-btn' onClick={props.menuHandler}/>
    </div>
  );
};

export default Navigation;
