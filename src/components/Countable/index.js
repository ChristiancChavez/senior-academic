import React from 'react';
import './countable.scss';

const Countable = ( props ) => (
  <div className={`countable ${ props.isAnimationActive ? 'countable-slidecountable' : ''}`}>
    <h5 className="countable__title">EL ENTRENAMIENTO EMPIEZA EN:</h5>
    <div className="clock">
        <span className="time">
            <span className="time__number">{props.leadingZero(props.days)}</span>
            <span className="time__reference">DIAS</span>
        </span>
        <span className="time">
            <span className="time__number">{props.leadingZero(props.hours)}</span>
            <span className="time__reference">HORAS</span>
        </span>
        <span className="time">
            <span className="time__number">{props.leadingZero(props.minutes)}</span>
            <span className="time__reference">MINS</span>
        </span>
        <span className="time">
            <span className="time__number">{props.leadingZero(props.seconds)}</span>
            <span className="time__reference">SEGS</span>
        </span>
    </div>
  </div>
);

export default Countable;