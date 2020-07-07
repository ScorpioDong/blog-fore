import React from 'react';
import './archives.scss';
import { baseUrl } from '@/util/requst';
import CoverHeader from '@/components/CoverHeader';
import Loading from '@/components/Loading';
import { getBlogArchives } from '@/services/blog';
import Archive from '@/components/Archive';

class Archives extends React.Component {

  state = {
    loading: true,
    archiveModel: {},
  };

  componentDidMount() {
    getBlogArchives()
      .then((data) => {
        this.setState({
          archiveModel: data,
          loading: false,
        });
      });
  }

  render() {
    const { loading, archiveModel } = this.state;

    if (loading) {
      return <Loading/>;
    } else {
      return (
        <div>
          <CoverHeader
            cover={baseUrl + '/assets/img/cover/cover4.jpg'}
            begin={''}
            content={'归档'}
            after={'愿你走过半生，归来仍是少年。'}
          />
          <div className={'archives-container'}>
            {
              Object.getOwnPropertyNames(archiveModel).map((item)=> {
                return <Archive key={item} year={item} yearModel={archiveModel[item]} />
              })
            }
          </div>
        </div>
      );
    }
  }
}

export default Archives;
