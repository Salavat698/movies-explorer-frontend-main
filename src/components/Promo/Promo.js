import NavTab from '../NavTab/NavTab'

function Promo() {
  return (
    <div className='promo'>
      <div className='promo__container'>
        <h1 className='promo__title'>
          Учебный проект студента факультета <br></br> Веб-разработки.
        </h1>
        <div className='promo__subtitle'>
          Листайте ниже, чтобы узнать больше про этот <br></br> проект и его создателя.
        </div>
        
        <div class="promo__landing-logo"></div>
        
      <NavTab />
      </div>
    </div>
  );
};

export default Promo;