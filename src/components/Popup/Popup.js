import { errors } from '../../utils/constants';

function Popup(props) {

  function closePopupHandle() {
    if(props) {
      document.removeEventListener('click', closePopupHandle);
      document.removeEventListener('keydown', closePopupHandle);
      props.showRegistrationStatus();
      return
    }
  }

  function ShowSereverMessage() { 
    if(props.serverResponceNubmber === 409 ) {
      return errors.emailBusy
    } if(props.serverResponceNubmber === 400 ) {
      return errors.badValue
    } if(props.serverResponceNubmber === 200 ) {
      return props.serevrResponseMsg
    } else {
      return errors.serverResponseErr;
    }
  }

  document.addEventListener('click', closePopupHandle);
  document.addEventListener('keydown', closePopupHandle);

  return (
    <div className='popup'>
        {props.isRequestOk && <svg className="popup__success-sign" viewBox="0 0 24 24">
          <path d="M4.1 12.7L9 17.6 20.3 6.3" fill="none" /> 
        </svg>}

        {!props.isRequestOk && <div className="popup__failure-sign popup__failure-sign_failure" >
          <div className="popup__failure-sign" />
        </div> } 

      <h2 className='popup__status-msg'>{ShowSereverMessage()}</h2>
    </div>
  )
}

export default Popup;