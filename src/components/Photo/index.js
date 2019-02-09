import React from 'react';
import vectorPhoto from '../../assets/images/Vectorphoto.png';
import './photo.scss';

const Photo = ({ onChange }) => (
    <div className="photo">
        <span className="photo__title">Foto de perfil</span>
        <div className="option">
            <img className="option__img" src={vectorPhoto} alt="foto perfil" />
            <input type="button" id="get_file" className="option__btn" value="Agregar foto" required/>
            <input  type="file" onChange={onChange} id="my_file" required/>
        </div>
    </div>
);
  
export default Photo;