import React from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import './index.less';

interface PaginationPropsType {
  lastVisible: boolean,
  nextVisible: boolean,
  lastHandle: () => void,
  nextHandle: () => void,
  current: number,
  pages: number
}

const Pagination: React.FC<PaginationPropsType> = props => {
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
};

export default Pagination;
