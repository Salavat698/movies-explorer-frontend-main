import Promo from '../Promo/Promo';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import Portfolio from '../Portfolio/Portfolio';
import AboutMe from '../AboutMe/AboutMe';

function Main() {
  return (
    <div className='main'>
      <div className='main__container'>
        <Promo />
        <AboutProject
          id='about-project'
        />
        <Techs
          id='techs'
        />
        <AboutMe
          id='about-me'
        />
        <Portfolio />
      </div>
    </div>
  );
};

export default Main;
