import React from 'react';
import './index.less';
import { toTopNow } from '@/util/page';
import { getOne } from '@/services/blog';
import sort from '@/util/sort';
import CoverHeader from '@/components/CoverHeader';
import $ from 'jquery';
import marked from 'marked';
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.css';
import 'github-markdown-css/github-markdown.css'

class Article extends React.Component<any, any> {

  state = {
    id: 0,
    sortName: '',
    title: '',
    description: '',
    createTime: '',
    updateTime: '',
    content: '',
    cover: '',
  };

  async componentDidMount() {
    toTopNow();
    const id = this.props.match.params.id;
    const data = await getOne(id);
    document.title = data.title;
    this.setState({
      id: id,
      sortName: sort.getSortName(data.sortId),
      title: data.title,
      description: data.description,
      createTime: data.createTime,
      updateTime: data.updateTime,
      content: data.content,
      cover: data.cover,
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
    } = this.state;
    return (
      <div>
        <CoverHeader
          cover={cover}
          begin={'#' + sortName}
          content={title}
          after={description}
        />
        <div className="article-container">
          <div
            id={'white'}
            className="blog-content markdown-body"
            dangerouslySetInnerHTML={{
              __html: marked(content),
            }}/>
        </div>
      </div>
    );
  }
}

export default Article;
