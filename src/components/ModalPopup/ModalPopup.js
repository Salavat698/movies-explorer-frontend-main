function ModalPopup(props) {
  function closeModalHandle() {
    props.closeModal(false);
    document.removeEventListener('keyup', closeModalHandle);
    document.removeEventListener('click', closeModalHandle);
  };

  window.addEventListener('click', closeModalHandle);
  window.addEventListener('keydown', closeModalHandle);

  return (
    <div className='modal-popup'>
      <div className='modal-popup__container'>
        <p className='modal-popup__message'>{props.error}</p>
      </div>
    </div>
  );
};

export default ModalPopup;