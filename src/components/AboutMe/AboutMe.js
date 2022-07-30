import React from 'react';
import './AboutMe.css';
import { Link } from 'react-router-dom';

function AboutMe() {
  return (
    <div className='about-me'>
      <div className='about-me__container'>
        <h2 className='block-title'>Студент</h2>
        <div className='about-me__info-container'>
          <div className='about-me__info'>
            <h3 className='about-me__name'>Салават</h3>
            <p className='about-me__additional-info'>Фронтенд-разработчик, 29 лет</p>
            <p className='about-me__personal'>
            Я родился и живу в Набережны Челны. Я люблю слушать музыку, а ещё увлекаюсь плаванем,велоспорт. Недавно начал кодить. С 2015 года работаю на себя. Прошёл курс по веб-разработке в "Яндекс Практикум" .Плюс куча видео на Ютубе=)
            </p>
            <div className='about-me__connections'>
              <a href='https://github.com/Salavat698' className='link link_place_about-me' target='_blank'>Facebook</a>
              <a  href='https://github.com/Salavat698' className='link link_place_about-me' target='_blank'>Github</a>
            </div>
          </div>
          <div className='about-me__avatar' />
        </div>
      </div>
    </div>
  )
};

export default AboutMe;