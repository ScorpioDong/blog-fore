import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './Pagination.scss';

export default (props) => {
  const {
    lastHandle,
    nextHandle,
    lastVisible,
    nextVisible,
    current,
    pages,
  } = props;
  return (
    <nav className="pagination">
      <div className='page-div'>
        {lastVisible ? <LeftOutlined className='page-btn arrow-left' onClick={lastHandle}/> : <div/>}
        <span className='page-number'>
              PAGE {current} OF {pages}
          </span>
        {nextVisible ? <RightOutlined className='page-btn arrow-right' onClick={nextHandle}/> : <div/>}
      </div>
    </nav>
  );
}
