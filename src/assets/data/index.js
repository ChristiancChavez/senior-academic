export const dataInput = [
  {
    classNameDiv: "categorie categorie--double",
    classNameSpan: "categorie__title",
    classNameInput: "categorie__input categorie__input--small",
    title: "Nombre*",
    value: "name",
    type: "text",
    placeholder: "Escribe tu nombre"
  },
  {
    classNameDiv: "categorie categorie--double",
    classNameSpan: "categorie__title",
    classNameInput: "categorie__input categorie__input--small",
    title: "Apellido*",
    value: "lastName",
    type: "text",
    placeholder: "Escribe tu apellido"
  },
  { 
    birth: true,
    classNameDiv: "categorie categorie--double",
    classNameSpan: "categorie__title",
    classNameSecondDiv: "categorie categorie--row",
    title: "Fecha de nacimiento",
    value: "date",
    inputs: {
      first: {
        className: "categorie__input categorie__input--center",
        value: "day",
        min:"01",
        max:"31",
        placeholder:"DD",
        pattern:"[0-9]{2}"
      },
      second: {
        className: "categorie__input categorie__input--middle",
        value: "month",
        min:"01",
        max:"12",
        placeholder:"MM",
        pattern:"[0-9]{2}"
      },
      third: {
        className: "categorie__input categorie__input--center",
        value: "year",
        min:"1950",
        max:"2005",
        placeholder:"AAAA",
        pattern:"[0-9]{4}"
      }
    }
  },
  {
    classNameDiv: "categorie",
    classNameSpan: "categorie__title",
    classNameInput: "categorie__input",
    title: "Cédula",
    value: "identification",
    type: "number",
    placeholder: "Escribe tu cédula"
  },
  {
    classNameDiv: "categorie",
    classNameSpan: "categorie__title",
    classNameInput: "categorie__input",
    title: "Correo Electrónico*",
    value: "email",
    type: "email",
    placeholder: "Escribe tu correo"
  },
  {
    classNameDiv: "categorie",
    classNameSpan: "categorie__title",
    classNameInput: "categorie__input",
    title: "Teléfono",
    value: "phone",
    type: "tel",
    placeholder: "Escribe tu teléfono"
  },
  {
    classNameDiv: "categorie",
    classNameSpan: "categorie__title",
    classNameInput: "categorie__input",
    title: "¿En donde te encuentras?*",
    value: "city",
    type: "text",
    placeholder: "Escribe el nombre de tu ciudad",
    img: { className:"categorie__gps", alt: "ubicacion" },

  },
  {
    classNameDiv: "categorie",
    classNameSpan: "categorie__title",
    classNameInput: "categorie__input",
    title: "¿Cuál es tu visión PL?*",
    value: "pl",
    type: "text",
    placeholder: "Escribe tu visión PL"
  },
  {
    classNameDiv: "categorie",
    classNameSpan: "categorie__title",
    classNameInput: "categorie__input",
    title: "¿Cuál es tu visión personal?",
    value: "view",
    type: "text",
    placeholder: "Escribe tu visión personal"
  },
];