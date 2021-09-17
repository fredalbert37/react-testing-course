import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

const InputComponent = ({ 
    labelText, 
    type, 
    id, 
    value, 
    onChange,
    error
}) => {


  return (
    <div className="mb-3">
      <label className={classNames('form-label', {
        'text-danger': error
      })} htmlFor={id}>
        {labelText}
      </label>
      <input
        type={type}
        name={id}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={labelText}
        className={classNames('form-control', {
          'is-invalid': error
        })}
      />
      { error && <div className="invalid-feedback">{error}</div> }
    </div>
  );
};

InputComponent.propTypes = {
    labelText: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string
}

InputComponent.defaultProps = {
    type: "text",
}


export default InputComponent;
