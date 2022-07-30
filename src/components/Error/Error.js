import { useHistory } from 'react-router-dom';

function Error() {
  const history = useHistory();

  function handleBackClick() {
    history.goBack();
  };
  return (
    <div className='error'>
      <div className='error__container'>
        <div className='error__text-container'>
          <h1 className='error__title'>404</h1>
          <p className='error__caption'>Страница не найдена</p>
        </div>
        <button className='link link_place_error' onClick={handleBackClick}>Назад</button>
      </div>
    </div>
  );
};

export default Error;