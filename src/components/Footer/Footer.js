function Footer() {
  return (
    <div className='footer'>
      <div className='footer__container'>
        <p className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__rows'>
          <p className='footer__author'>&copy;2021</p>
          <ul className='footer__row-links'>
            <a className='link link_place_footer' href='https://practicum.yandex.ru/' target='_blank' rel='noreferrer' >Яндекс.Практикум</a>
            <a className='link link_place_footer' href='https://github.com' target='_blank' rel='noreferrer' >Github</a>
            <a className='link link_place_footer' href='https://facebook.com' target='_blank' rel='noreferrer' >Facebook</a>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
