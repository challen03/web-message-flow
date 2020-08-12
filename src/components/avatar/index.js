import React, { PureComponent } from 'react';
import s from './style.module.scss';

class Avatar extends PureComponent {
  render() {
    const { avatarUrl, name } = this.props;
    return (
      <div className={s.avatarWrap}>
        <div className={s.name}>{name}</div>
        <div>
          <img className={s.avatarImg} src={avatarUrl} alt="头像" /> :
        </div>
      </div>
    )
  }
}

Avatar.defaultProps = {
  avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  name: '暂无',
}

export default Avatar;