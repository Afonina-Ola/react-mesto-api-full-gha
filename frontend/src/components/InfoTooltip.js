
import React from "react";
import signInSuccess from '../images/sign-in-success.svg';
import signInError from '../images/sign-in-error.svg';

function InfoTooltip({ mode, onInfoTooltipClick, textSuccess, textError }) {

  return (
    <div className="popup popup_opened">
      <div className="popup__container">
        <div className="popup__info-tooltip">
          <img src={mode === 'success' ? signInSuccess : signInError} className="popup__info-tooltip-img" />
          <p className="popup__info-tooltip-text">{mode === 'success' ? textSuccess : textError}</p>
        </div>
        <button onClick={onInfoTooltipClick} aria-label="закрыть" type="button" className="popup__button-close"></button>
      </div>
    </div>
  );
}

export default InfoTooltip;

