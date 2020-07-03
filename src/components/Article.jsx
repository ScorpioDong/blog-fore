import React from 'react';
import './Article.scss';
import memory from '@/util/memory';
import { getSortName } from '@/services/sort';
import { baseUrl } from '@/util/requst';

export default (props) => {
  const { domain } = memory.web;
  const {
    id,
    sortId,
    createTime,
    title,
    description,
    cover,
    avatar,
    nickname,
    history,
  } = props;
  return (
    <article className="article-cover">
      <div className="article-wrapper card-shadow">
        <header>
          <div className="article-format-wrapper">
            <div className="featured-image">
              <a onClick={
                () => {
                  history.push('/blog/' + id);
                }
              }>
                <div className="blog-cover-img" style={{ backgroundImage: 'url("' + baseUrl + cover + '")' }}/>
              </a>
              <div className="sort-tags">
                <a onClick={() => {
                  console.log(sortId);
                }}>
                  {getSortName(sortId)}
                </a>
              </div>
            </div>
          </div>
          <div className="meta">
            <time>
              <span>{createTime}</span>
            </time>
          </div>
          <h1 className="main-title">
            <a onClick={
              () => {
                history.push('/blog/' + id);
              }
            }>
              {title}
            </a>
          </h1>
        </header>
        <div className="blog-description">
          {description}
        </div>
        <footer className="author-meta">
          <a href={domain} className="author">
            <span className="author-image" style={{ backgroundImage: 'url("' + baseUrl + avatar + '")' }}/>
            <span className="author-name">{nickname}</span>
          </a>
        </footer>
      </div>
    </article>
  );
}
