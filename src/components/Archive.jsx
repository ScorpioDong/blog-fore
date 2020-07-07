import React from 'react';
import './Archive.scss';
import { history } from 'umi';

const Archive = (props) => {
  const { year, yearModel } = props;
  return (
    <div className={'archive-container'}>
      <h1 className={'archive-header'}>{year}</h1>
      {
        Object.getOwnPropertyNames(yearModel).map((item) => {
          return (
            <div className={'archive-content'} key={item}>
              <header className={'archive-content-header'}>
                {item + '月'}
              </header>
              <span>
                {
                  yearModel[item].map((article) => {
                    return (
                      <a className={'archive-content-link'}
                         onClick={() => {
                           history.push('/blog/' + article.id);
                         }}>
                        <span className={'archive-content-link-date'}>{article.createTime.substring(5, 10)}</span>
                        <span className={'archive-content-link-title'}>{article.title}</span>
                      </a>
                    );
                  })
                }
              </span>
            </div>
          );
        })
      }
    </div>
  );
};

export default Archive;
