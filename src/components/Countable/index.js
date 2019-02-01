import React from 'react';
import './countable.scss';

const Countable = () => (
  <div className="countable">
    <h5 className="countable__title">EL ENTRENAMIENTO EMPIEZA EN:</h5>
    <div className="clock">
        <span className="time">
            <span className="time__number">30</span>
            <span className="time__reference">DIAS</span>
        </span>
        <span className="time">
            <span className="time__number">30</span>
            <span className="time__reference">HORAS</span>
        </span>
        <span className="time">
            <span className="time__number">30</span>
            <span className="time__reference">MINS</span>
        </span>
        <span className="time">
            <span className="time__number">30</span>
            <span className="time__reference">SEGS</span>
        </span>
    </div>
  </div>
);

export default Countable;