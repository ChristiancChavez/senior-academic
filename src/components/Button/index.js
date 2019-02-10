import React from 'react';
import './button.scss';

const Button = ({
  className,
  onChangeRegisterFormStatus,
  isAform,
  onSubmitForm,
  children
}) => {
  const onClickFun = isAform
    ? () => onSubmitForm()
    : () => onChangeRegisterFormStatus(true);
  return (
    <button className={`button ${className}`} onClick={onClickFun} type={isAform ? 'submit' : ''}>
      {children}
    </button>
  );
};

export default Button;
