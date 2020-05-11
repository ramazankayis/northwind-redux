/** @format */

import React from 'react';

const TextInput = ({ name, label, onChange, placeHolder, value, error }) => {
  let wapperClass = 'form-group';

  if (error && error.length > 0) {
    wapperClass += ' has-error';
  }

  return (
    <div className={wapperClass}>
      <label htmlfom={name}>{label}</label>

      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeHolder}
          value={value}
          onChange={onChange}
        />
        {error && <div className="alert alert-danger">{error}</div>}
      </div>
    </div>
  );
};

export default TextInput;
