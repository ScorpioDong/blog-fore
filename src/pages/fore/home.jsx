import React from 'react';
import CoverHeader from '@/components/CoverHeader';
import Pagination from '@/components/Pagination';
import Article from '@/components/Article';
import { getBlogPage } from '@/services/blog';
import { toTopNow } from '@/util/page';
import memory from '@/util/memory';
import { baseUrl } from '@/util/requst';

class Home extends React.Component {
  state = {
    blogs: [],
    pagination: {
      current: 1,
      pages: 1,
      size: 9,
    },
  };

  componentDidMount() {
    this.page(this.state.pagination.current, this.state.pagination.size);
    toTopNow();
  }

  page(current, size) {
    getBlogPage(current, size)
      .then((data) => {
        this.setState({
          blogs: data.records,
          pagination: {
            current: data.current,
            size: data.size,
            pages: data.pages,
          },
        });
      });
  }

  render() {
    const { webName, motto, nickname, avatar, cover } = memory.web;
    const { blogs, pagination } = this.state;
    const { history } = this.props;
    return (
      <div>
        <CoverHeader
          cover={baseUrl + cover}
          begin={''}
          content={webName}
          after={motto}
        />
        <div className="blog-container">
          <div className="content-blogs">
            {
              blogs.map((item) => {
                return (
                  <Article
                    key={item.id}
                    id={item.id}
                    avatar={avatar}
                    cover={item.cover}
                    createTime={item.createTime}
                    description={item.description}
                    nickname={nickname}
                    sortId={item.sortId}
                    title={item.title}
                    history={history}
                  />
                );
              })
            }
          </div>
        </div>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          lastVisible={pagination.current !== 1}
          lastHandle={() => {
            this.page(pagination.current - 1, pagination.size);
          }}
          nextVisible={pagination.current !== pagination.pages}
          nextHandle={() => {
            this.page(pagination.current + 1, pagination.size);
          }}
        />
      </div>
    );
  }

}

export default Home;
