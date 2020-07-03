import React from 'react';
import './Loading.scss';

const Loading = () => {
  return (
    <div className='container'>
      <img src={require('@/assets/loading.gif')} alt="loading.."/>
    </div>
  );
}

export default Loading;
