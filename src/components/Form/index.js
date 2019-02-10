import React, { Component, Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import Social from '../Social';
import firebase from '../../firebase';
import Photo from '../Photo';
import RegisterImages from '../RegisterImages';
import gps from '../../assets/images/gps.png';
import './form.scss';

const InputWithLabel = ({
  name,
  label,
  isRequired,
  placeholder,
  type,
  containerClass
}) => (
  <div className={containerClass}>
    <label htmlFor={name} className="form__label">
      {label} {isRequired && <span>*</span>}
    </label>
    <Field
      type={type}
      name={name}
      className="form__input"
      placeholder={placeholder}
    />
    <ErrorMessage name={name} component="div" />
  </div>
);

const DateInputWithLabel = ({ label, isRequired, className }) => (
  <div>
    <label className="form__label">
      {label} {isRequired && <span>*</span>}
    </label>
    <div className="form__flex">
      <Field
        type="text"
        name="day"
        className={`form__input flex-grow1 ${className}`}
        placeholder="DD"
      />
      <Field
        type="text"
        name="month"
        className={`form__input flex-grow1 ${className}`}
        placeholder="MM"
      />
      <Field
        type="text"
        name="year"
        className={`form__input flex-grow1 ${className}`}
        placeholder="AAAA"
      />
    </div>
    <div className="form__flex">
      <ErrorMessage name="day" component="div" />
      <ErrorMessage name="month" component="div" />
      <ErrorMessage name="year" component="div" />
    </div>
  </div>
);

const schema = Yup.object().shape({
  name: Yup.string().required("El jorge es gay"),
  email: Yup.string().required('Jorge es maricon').email('invalid email').test("duplicate email", "El email ya esta registrado", val => val !== "andresfch23@gmail.com")
});

class Form extends Component {
  render() {
    const { isRegisterActive } = this.props;
    return (
      <Fragment>
        <h1 className="form__title">REGISTRO</h1>
        <p className="form__description">
          <span className="form__description--bold">
            ¿Deseas convertirte en un Senior de prestigio?
          </span>{' '}
          Haz parte de nuestro próximo entrenamiento, registrarte y estaremos en
          contacto contigo.
        </p>
        <Formik
          initialValues={{
            name: '',
            last_name: '',
            day: '',
            month: '',
            year: '',
            identification: '',
            email: '',
            phone: '',
            city: '',
            pl_vision: '',
            personal_vision: ''
          }}

          validationSchema={schema}

          onSubmit={({ ...props }) => {
            // PRIMATE ACÁ HACES TU MAGIA
            console.warn({ ...props }, 'eche!!!');
          }}
          enableReinitialize
        >
          {({ handleSubmit, isSubmitting }) => (
            <Fragment>
              <div className="form__flex">
                <div className="flex-grow1 mr-50">
                  <div className="form__flex">
                    <InputWithLabel
                      name="name"
                      label="Nombre"
                      type="text"
                      placeholder="Escribe tu nombre"
                      containerClass="flex-grow1 mr-25"
                      isRequired
                    />
                    <InputWithLabel
                      name="last_name"
                      label="Apellido"
                      type="text"
                      placeholder="Escribe tu apellido"
                      containerClass="flex-grow1"
                      isRequired
                    />
                  </div>
                </div>
                <div className="flex-grow1">
                  <div className="form__flex">
                    <DateInputWithLabel
                      label="Fecha de nacimiento"
                      className="form__input--small"
                      containerClass="flex-grow2"
                      isRequired
                    />
                    <Photo containerClass="flex-grow1" />
                  </div>
                </div>
              </div>
              <div className="form__flex">
                <InputWithLabel
                  name="identification"
                  label="Cédula"
                  type="text"
                  placeholder="Escribe tu cédula"
                  containerClass="flex-grow1 mr-50"
                />
                <InputWithLabel
                  name="email"
                  label="Correo Electrónico"
                  type="email"
                  placeholder="Escribe tu correo"
                  containerClass="flex-grow1"
                  isRequired
                />
              </div>
              <div className="form__flex">
                <InputWithLabel
                  name="phone"
                  label="Teléfono"
                  type="text"
                  placeholder="Escribe tu teléfono"
                  containerClass="flex-grow1 mr-50"
                />
                <InputWithLabel
                  name="city"
                  label="¿En donde te encuentras?"
                  type="text"
                  placeholder="Escribe el nombre de tu ciudad"
                  containerClass="flex-grow1"
                  isRequired
                />
              </div>
              <div className="form__flex">
                <InputWithLabel
                  name="pl_vision"
                  label="¿Cual es tu Visión PL?"
                  type="text"
                  placeholder="Escribe tu Visión PL"
                  containerClass="flex-grow1 mr-50"
                  isRequired
                />
                <InputWithLabel
                  name="personal_vision"
                  label="¿Cual es tu visión personal?"
                  type="text"
                  placeholder="Escribe tu visión personal"
                  containerClass="flex-grow1"
                />
              </div>
              {isRegisterActive && (
                <Social
                  isRegisterActive={isRegisterActive}
                  onSubmitForm={handleSubmit}
                />
              )}
            </Fragment>
          )}
        </Formik>
      </Fragment>
    );
  }
}

export default Form;
