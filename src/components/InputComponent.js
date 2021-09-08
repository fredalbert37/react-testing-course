import React from "react";
import PropTypes from "prop-types";

const InputComponent = ({ 
    labelText, 
    type, 
    id, 
    value, 
    onChange 
}) => {


  return (
    <div className="mb-3">
      <label className="form-label" htmlFor={id}>
        {labelText}
      </label>
      <input
        type={type}
        name={id}
        value={value}
        id={id}
        onChange={onChange}
        placeholder={labelText}
        className="form-control"
      />
    </div>
  );
};

InputComponent.propTypes = {
    labelText: PropTypes.string,
    type: PropTypes.string,
    id: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
}

InputComponent.defaultProps = {
    type: "text",
}


export default InputComponent;
