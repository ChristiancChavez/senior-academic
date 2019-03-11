import React, { Fragment } from 'react';
import gps from '../../assets/images/gps.png';

const Input = ({
  classNameDiv,
  classNameSpan,
  classNameInput,
  title,
  value,
  type,
  placeholder,
  birth = false,
  inputs,
  onFocus,
  onBlur,
  onChange,
  classNameSecondDiv,
  val,
  img = null
}) => {
  

  return(
  <div className={classNameDiv}>
    <span className={classNameSpan}>{title}</span>
    {!birth ?
    <Fragment>
      <input
        className={classNameInput}
        onFocus={onFocus}
        onBlur={onBlur}
        onChange={onChange}
        value={val}
        type={type}
        name={value}
        placeholder={placeholder}
        required
      /> 
      {img && 
        <img
          className={img.className}
          src={gps}
          alt={img.alt} />
      }
    </Fragment>
    :
    <div className={classNameSecondDiv}>
      {Object.values(inputs).map((input, index) => 
        <input
          className={input.className}
          onFocus={onFocus}
          onBlur={onBlur}
          value={val[input.value]}
          onChange={onChange}
          type="number"
          name={input.value}
          min={input.min}
          max={input.max}
          placeholder={input.placeholder}
          key={index}
          required
          pattern={input.pattern}
        />
      )}
    </div>
    }
  </div>
)};

export default Input;