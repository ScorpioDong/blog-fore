import React from 'react';
import './blog.scss';
import CoverHeader from '@/components/CoverHeader';
import $ from 'jquery';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-light.css';
import { toTopNow } from '@/util/page';
import { getBlogOne } from '@/services/blog';
import { getSortName } from '@/services/sort';
import { baseUrl } from '@/util/requst';
import Loading from '@/components/Loading';

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
          </div>
        </div>
      );
    }
  }
}

export default Blog;
