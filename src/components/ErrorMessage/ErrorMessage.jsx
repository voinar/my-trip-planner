import React, { useState } from "react";
import { useErrorMessage } from "./useErrorMessage";

import IconError from "img/icons/icon-error.svg";
import IconCancel from "img/icons/icon-cancel.svg";

// eslint-disable-next-line react/prop-types
const ErrorMessage = ({ errorMessage, setErrorMessage }) => {

  return !errorMessage ? null : (
    <div className="error-message">
      <img src={IconError} />
      {errorMessage}
      <button onClick={() => setErrorMessage("")}>
        <img src={IconCancel} />
      </button>
    </div>
  );
};

export default ErrorMessage;
