import React from 'react';
import './index.less';
import { baseUrl } from '@/util/request';

interface CoverHeaderPropsType {
  cover: string,
  begin: string,
  content: string,
  after: string
}

const CoverHeader: React.FC<CoverHeaderPropsType> = props => {
  const { cover, begin, content, after } = props;
  return (
    <div>
      <div className='cover-header'>
        <div className='cover-bg'>
          <img className="cover-img" src={cover} alt="cover"/>
        </div>
        <div className="cover-content-container">
          <div className="cover-content inner">
            <a className="cover-begin">{begin}</a>
            <h2 className="cover-title">{content}</h2>
            <div className="cover-line"/>
            <p className="cover-after">{after}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoverHeader;
