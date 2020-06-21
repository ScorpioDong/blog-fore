import React from 'react';
import './Footre.scss'
import { GithubOutlined, MailOutlined, QqOutlined, UpOutlined } from '@ant-design/icons';
import memory from '@/util/memory';
import { toTop } from '@/util/page';

export default () => {
  const { domain } = memory.web;
  return (
    <div className={'footer'}>
      <div style={{ textAlign: 'center', marginBottom: 30 }}>
        <a href='https://github.com/ScorpioDong' target='-_blank'>
          <GithubOutlined className='footer-icon'/>
        </a>
        <a href='mailto:haodong1101@outlook.com'>
          <MailOutlined className='footer-icon'/>
        </a>
        <a href='http://wpa.qq.com/msgrd?v=3&uin=2053188481&site=qq&menu=yes' target='_blank'>
          <QqOutlined className='footer-icon'/>
        </a>
      </div>
      <div className={'site-info'} style={{ textAlign: 'center' }}>
        <a className={'link'} href="http://www.beian.miit.gov.cn" target="_blank">鲁ICP备20012063号-1</a>
        <p>Copyright © 2020 <a href={domain}> ScorpioDong的个人小站</a></p>
        <p>Powered by <a target="_blank" href={domain}>ScorpioDong</a> • Theme by
          <a href="https://github.com/hshanx/halo-theme-hshan.git">寒山</a> • Reference from
          <a href={domain}>ScorpioDong</a>
        </p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <UpOutlined className={'up-btn'} onClick={() => toTop()}/>
      </div>
    </div>
  )
}
