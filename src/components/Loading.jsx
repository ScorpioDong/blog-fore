import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className='container'>
      <div className="sk-chase sk-center">
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
        <div className="sk-chase-dot"/>
      </div>
    </div>
  );
};

export default Loading;
