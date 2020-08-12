import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Avatar from '../avatar';
import { MESSAGE_TYPE_ENUMS, MESSAGE_TYPE_LIST } from '../../constant';
import s from './style.module.scss';

class MessageFlow extends PureComponent {

  // 文本类型
  renderText = () => {
    const { text, fieldProps } = this.props;

    return (
      <section className={s.textMessage} {...fieldProps}>{text}</section>
    )
  }

  // 图片类型
  renderImage = () => {
    const { url, fieldProps } = this.props;

    return (
      <div className={s.imgMessage} {...fieldProps}>
        <img src={url} width="100" alt="图片消息" />
      </div>
    )
  }

  // 系统消息类型
  renderSystemMessage = () => {
    const { text, fieldProps } = this.props;

    return (
      <div className={s.systemMessage} {...fieldProps}>
        系统消息： {text}
      </div>
    )
  }

  renderMessageInfo = () => {
    const { type, render } = this.props;

    let element = null;

    if (type === MESSAGE_TYPE_ENUMS.TEXT.value) {
      element = this.renderText();
    } else if (type === MESSAGE_TYPE_ENUMS.IMAGE.value) {
      element = this.renderImage();
    } else if (type === MESSAGE_TYPE_ENUMS.SYSTEM_INFO.value) {
      element = this.renderSystemMessage();
    } else {
      // 自定义渲染
      element = render;
    }
    return element;
  }

  render() {
    const { type, name, showAvatr } = this.props;
    const isSystemInfo = MESSAGE_TYPE_ENUMS.SYSTEM_INFO.value;
    const messageContentCls = classnames(s.messageContent, {
      [s.systemMessageContent]: type === isSystemInfo
    })

    return (
      <div className={s.messageWrap}>
        {
          type !== isSystemInfo || showAvatr
            ? <div className={s.messageAvatar}><Avatar name={name} /></div>
            : null
        }
        <div className={messageContentCls}>
          {this.renderMessageInfo()}
        </div>
      </div>
    )
  }
}

MessageFlow.propTypes = {
  type: PropTypes.oneOf(MESSAGE_TYPE_LIST.map(i => i.value)),
  text: PropTypes.node,
  url: PropTypes.string,
  showAvatr: PropTypes.bool,
  fieldProps: PropTypes.object,
  render: PropTypes.node,
}

MessageFlow.defaultProps = {
  type: MESSAGE_TYPE_ENUMS.TEXT.value,
  text: '我是文本'
}

export default MessageFlow;