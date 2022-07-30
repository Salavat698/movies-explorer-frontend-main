import React from 'react';
import './AboutProject.css';

function AboutProject() {
  return (
    <div className='about-project'>
      <div className='about-project__container'>
        <h2 className='block-title'>О проекте</h2>
        <ul className='about-project__table'>
          <li className='about-project__table-cell'>
            <h3 className='about-project__table-heading'>Дипломный проект включал 5 этапов</h3>
            <p className='about-project__table-text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </li>
          <li className='about-project__table-cell'>
            <h3 className='about-project__table-heading'>На выполнение диплома ушло 5 недель</h3>
            <p className='about-project__table-text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </li>
        </ul>
        <div className='about-project__terms'>
          <div className='about-project__tech about-project__tech_backend'>
            <h3 className='about-project__term about-project__term_backend'>1 неделя</h3>
            <p className='about-project__tech-name'>Back-end</p>
          </div>
          <div className='about-project__tech'>
            <h3 className='about-project__term'>4 недели</h3>
            <p className='about-project__tech-name'>Front-end</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default AboutProject;