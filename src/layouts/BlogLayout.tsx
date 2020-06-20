import React from 'react';
import './BlogLayout.less';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import web from '@/util/web';
import sort from '@/util/sort';

class BlogLayout extends React.Component<any, any> {

  async componentDidMount() {
    await web.update();
    await sort.update();
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  state = {
    scrollScale: 0,
    progressVisible: false,
  };

  handleScroll = (event: Event) => {
    // @ts-ignore
    const len = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    // @ts-ignore
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
    );
  }
}

export default BlogLayout;
