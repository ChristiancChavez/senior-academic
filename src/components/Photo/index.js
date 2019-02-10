import React from 'react';
import vectorPhoto from '../../assets/images/Vectorphoto.png';
import './photo.scss';

const Photo = () => (
  <div className="photo">
    <span className="photo__title">Foto de perfil</span>
    <div className="option">
      <img className="option__img" src={vectorPhoto} alt="foto perfil" />
      <button className="option__btn">Agregar foto</button>
    </div>
  </div>
);

export default Photo;
// {/* <input  type="file" /> */}
