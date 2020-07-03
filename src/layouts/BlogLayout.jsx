import React from 'react';
import { webUpdate } from '@/services/web';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import memory from '@/util/memory';
import $ from 'jquery';
import Loading from '@/components/Loading';
import { sortUpdate } from '@/services/sort';

class BlogLayout extends React.Component {
  state = {
    scrollScale: 0,
    progressVisible: false,
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const len = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollScale = parseInt(document.documentElement.scrollTop * 100 / len);
    const progressVisible = (this.props.location.pathname.indexOf('/blog') === 0);
    this.setState({
      scrollScale: scrollScale,
      progressVisible: progressVisible,
      loading: 0,
    });
  };

  render() {
    const { scrollScale, progressVisible, loading } = this.state;
    const { children, location, route } = this.props;

    if ($.isEmptyObject(memory.web) || memory.sorts.length === 0) {
      webUpdate();
      sortUpdate();
      window.setTimeout(() => {
        this.setState({ loading: loading + 1 });
      }, 1000);
      return <Loading/>;
    } else {
      return (
        <div className='layout'>
          <Header
            selectValue={location.pathname}
            routes={route.routes}
            progressValue={scrollScale}
            progressVisible={progressVisible}
          />
          {children}
          <Footer/>
        </div>
      );
    }
  }
}

export default BlogLayout;
