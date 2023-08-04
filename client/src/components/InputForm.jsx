import React from "react";

const InputForm = ({ htmlFor, labelText, type, name, value, handleChange }) => {
  return (
    <>
      <div className="mb-1">
        <label htmlFor={htmlFor} className="form-label">
          {labelText}
        </label>
        <input
          type={type}
          className="form-control"
          name={name}
          value={value}
          onChange={handleChange}
        />
      </div>
    </>
  );
};

export default InputForm;
