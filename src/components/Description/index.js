import React from 'react';
import './description.scss';

const Description = ({ isAnimationActive }) => (
    <div className={`description ${ isAnimationActive ? 'description-slidetext' : ''}`}>
        <h1 className="description__title">
            LA POSIBILIDAD DE UNA NUEVA <span className="description__title description__title--red">CONVERSACIÓN</span> 
        </h1>
        <p className="description__advertisement">
            Hemos diseñado un <b>Entrenamiento participativo, creativo y retante</b>, donde
            el participante conseguirá especialización, autonomía, orientación estratégica,
            estructuración, orientación a la acción y un enfoque directivo, que potencializará su aptitud
            para cumplir con el Rol de Senior en cualquier proceso de Liderazgo y Transformación.
        </p>
    </div>
)
export default Description;