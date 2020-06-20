import React from 'react';
import CoverHeader from '@/components/CoverHeader';
import Pagination from '@/components/Pagination';
import Article from '@/components/Article';
import web from '@/util/web';
import sort from '@/util/sort';
import { getPage, BlogType } from '@/services/blog';
import { toTopNow } from '@/util/page';
import { baseUrl } from '@/util/request';

class Index extends React.Component<any, any> {

  state = {
    blogs: [],
    sorts: [],
    pagination: {
      current: 1,
      pages: 1,
      size: 9,
    },
  };

  async page(current: number, size: number) {
    const data = await getPage(current, size);
    this.setState({
      blogs: data.records,
      sorts: sort.get(),
      pagination: {
        current: data.current,
        size: data.size,
        pages: data.pages,
      },
    });
  }

  async componentDidMount() {
    await web.update();
    await sort.update();
    await this.page(this.state.pagination.current, this.state.pagination.size);
    toTopNow();
  }

  render() {
    const { webName, motto, nickname, avatar, cover } = web.get();
    const { blogs, pagination } = this.state;
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
              blogs.map((item: BlogType) => {
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
          lastHandle={async () => {
            await this.page(pagination.current - 1, pagination.size);
          }}
          nextVisible={pagination.current !== pagination.pages}
          nextHandle={async () => {
            await this.page(pagination.current + 1, pagination.size);
          }}
        />
      </div>
    );
  }
}

export default Index;
