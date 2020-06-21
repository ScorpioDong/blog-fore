import React from 'react';
import { webUpdate } from '@/services/web';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

class BlogLayout extends React.Component{
  state = {
    scrollScale: 0,
    progressVisible: false,
  };

  componentDidMount() {
    webUpdate();
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
    });
  };

  render() {
    const { scrollScale, progressVisible } = this.state;
    const { children, location, route } = this.props;
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
    )
  }
}

export default BlogLayout;
