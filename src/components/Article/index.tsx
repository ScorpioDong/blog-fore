import React from 'react';
import './index.less';
import { history } from 'umi';
import sort from '@/util/sort';
import web from '@/util/web';
import { baseUrl } from '@/util/request';

interface ArticlePropsType {
  id: number,
  sortId: number,
  createTime: string,
  title: string,
  description: string,
  cover: string,
  avatar: string,
  nickname: string
}

const Article: React.FC<ArticlePropsType> = props => {
  const { domain } = web.get();
  const {
    id,
    sortId,
    createTime,
    title,
    description,
    cover,
    avatar,
    nickname,
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
                <div className="blog-cover-img" style={{ backgroundImage: 'url("' + cover + '")' }}/>
              </a>
              <div className="sort-tags">
                <a onClick={() => {console.log(sortId)}}>
                  {sort.getSortName(sortId)}
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
};

export default Article;
