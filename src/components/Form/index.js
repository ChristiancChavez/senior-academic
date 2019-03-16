import React, { Component, Fragment } from 'react';
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import Social from '../Social';
import firebase, { storage } from '../../firebase';
// import Photo from '../Photo';
// import RegisterImages from '../RegisterImages';
import vectorPhoto from '../../assets/images/Vectorphoto.png';
import './form.scss';

const InputWithLabel = ({
  name,
  label,
  isRequired,
  placeholder,
  type,
  containerClass,
  img = null
}) => (
  <div className={`${containerClass} ${img ? 'positionImg' : ''}`}>
    <label htmlFor={name} className="form__label">
      {label} {isRequired && <span>*</span>}
    </label>
    <Field
      type={type}
      name={name}
      className="form__input"
      placeholder={placeholder}
    />
    <ErrorMessage className="form__error" name={name} component="div" />
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
    <div className="form__flex form__flex--error">
      <ErrorMessage name="day" component="div" className="form__error form__error--date " />
      <ErrorMessage name="month" component="div" className="form__error form__error--date" />
      <ErrorMessage name="year" component="div" className="form__error form__error--date" />
    </div>
  </div>
);

  const initialValues = {
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
    personal_vision: '',
    image: null
  }

class Form extends Component {

  state = {
      users: []
  }

  componentDidMount() {
    const usersRef = firebase.database().ref('users');

    usersRef.on('value', (snapshot) => {
      let users = snapshot.val();

      if (users) {
        const newState = Object.keys(users).map(user => ({
          id: user,
          identification: users[user].identification,
          email: users[user].email,
        }));

        this.setState({
          users: newState
        });
      }
    });
    document.getElementById('get_file').onclick = function() {
      document.getElementById('file').click();
    };
  }

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
          initialValues={initialValues}

          validationSchema={Yup.object().shape({
            name: Yup.string().required("Debes llenar este campo"),
            last_name: Yup.string().required("Debes llenar este campo"),
            email: Yup.string().required('Este campo es requerido').email()
            .test("duplicate email", "El email ya esta registrado", val => {
              let isValid = true;
        
              this.state.users.forEach(user => {
                if (user.email === val) {
                  isValid = false;
                }
              });
        
              return isValid;
            }),
            day: Yup.number().required('Este campo es requerido')
              .min(1, "Debes poner un dia del mes válido")
              .max(31, "Debes poner un dia del mes válido"),
            month: Yup.number().required('Este campo es requerido')
              .min(1, "Debes poner un número de mes válido (De 1 a 12)")
              .max(12, "Debes poner un número de mes válido (De 1 a 12)"),
            year: Yup.number().required('Este campo es requerido')
              .min(1930, "Debes poner un número de año válido (De 1930 a 2019)")
              .max(2019, "Debes poner un número de mes válido (De 1 a 12)"),
            city: Yup.string().required("Debes llenar este campo"),
            pl_vision: Yup.string().required("Debes llenar este campo"),
          })}

          onSubmit={({ ...props }, { resetForm }) => {
            const usersRef = firebase.database().ref('users');

            const item = { ...props, image: props.image ? props.image.name : null };
            
            if (props.image) {
              storage.ref(`images/${props.image.name}`).put(props.image);
            }

            usersRef.push(item);

           resetForm(initialValues);
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue }) => (
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
                    <div className="photo flex-grow1">
                      <span className="photo__title">Foto de perfil</span>
                      <div className="option">
                        <img className="option__img" src={vectorPhoto} alt="foto perfil" />
                        <Field
                          type="button"
                          id="get_file"
                          name="button"
                          className="form__input option__btn"
                          value="Agregar Foto"
                        />
                        <input
                          id="file"
                          name="image"
                          type="file"
                          onChange={(event) => {
                            setFieldValue("image", event.currentTarget.files[0]);
                          }}
                        />
                      </div>
                    </div>
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
                  label="¿En qué visión y ciudad te graduaste?"
                  type="text"
                  placeholder="Ej: Visión CC4-1 Barranquilla"
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
