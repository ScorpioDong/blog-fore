import React from 'react';
import './blog.scss';
import { history } from 'umi';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import CoverHeader from '@/components/CoverHeader';
import $ from 'jquery';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import { toTopNow } from '@/util/page';
import { getBlogNearby, getBlogOne } from '@/services/blog';
import { getSortName } from '@/services/sort';
import { baseUrl } from '@/util/requst';
import Loading from '@/components/Loading';
import memory from '@/util/memory';

class Blog extends React.Component {
  state = {
    id: 0,
    sortName: '',
    title: '',
    description: '',
    createTime: '',
    updateTime: '',
    content: '',
    cover: '',
    loading: true,
    near: {},
  };

  componentDidMount() {
    toTopNow();
    const id = this.props.match.params.id;
    getBlogOne(id, false)
      .then((data) => {
        document.title = data.title;
        this.setState({
          id: id,
          sortName: getSortName(data.sortId),
          title: data.title,
          description: data.description,
          createTime: data.createTime,
          updateTime: data.updateTime,
          content: data.content,
          cover: data.cover,
          loading: false,
        });
      });

    $('pre code').each(function(i, block) {
      hljs.highlightBlock(block);
    });

    getBlogNearby(id)
      .then((data) => {
        this.setState({ near: data });
      });
  }

  render() {
    const {
      sortName,
      title,
      description,
      createTime,
      content,
      cover,
      loading,
      near,
    } = this.state;
    if (loading) {
      return <Loading/>;
    } else {
      return (
        <div>
          <CoverHeader
            cover={baseUrl + cover}
            begin={'#' + sortName}
            content={title}
            after={description}
          />
          <div className="article-container">
            <div className="blog-content">
              <div
                className="blog"
                dangerouslySetInnerHTML={{
                  __html: content,
                }}/>
            </div>
            <div className={'blog-copyright-container'}>
              <div className={'blog-copyright'}>
                <div><strong>Copyright:</strong> &nbsp; 本文章采用 <a href="https://creativecommons.org/licenses/by/4.0/">
                  知识共享署名4.0</a> 国际许可协议</div>
                <div><strong>Links:</strong> &nbsp;
                  <a href={memory.web.domain + this.props.history.location.pathname}>
                    {memory.web.domain + this.props.history.location.pathname}
                  </a>
                </div>
              </div>
            </div>
            <div className='blog-nav'>
              <span
                className={'blog-nav-common blog-nav-last' + (near.last ? '' : ' blog-nav-hidden')}
                onClick={() => {
                  history.push('/blog/' + near.last.id);
                  window.location.reload();
                }}
              >
                <LeftOutlined/> {near.last ? near.last.title : ''}
              </span>
              <span
                className={'blog-nav-common blog-nav-next' + (near.next ? '' : ' blog-nav-hidden')}
                onClick={() => {
                  history.push('/blog/' + near.next.id);
                  window.location.reload();
                }}
              >
                {near.next ? near.next.title : ''} <RightOutlined/>
              </span>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default Blog;
