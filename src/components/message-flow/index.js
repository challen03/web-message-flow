import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { MESSAGE_TYPE_ENUMS } from '../../constant';
import s from './style.module.scss';

class MessageFlow extends PureComponent {

  renderText = () => {
    const { text, fieldProps } = this.props;

    return (
      <section className={s.textMessage} {...fieldProps}>{text}</section>
    )
  }

  renderImage = () => {
    const { url, fieldProps } = this.props;

    return (
      <div className={s.imgMessage} {...fieldProps}>
        <img src={url} width="100" alt="图片消息" />
      </div>
    )
  }

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
      element = render;
    }
    return element;
  }

  render() {
    const { type } = this.props;
    const messageWrapCls = classnames(s.messageWrap, {
      [s.systemMessageWrap]: type === MESSAGE_TYPE_ENUMS.SYSTEM_INFO.value
    })

    return (
      <div className={messageWrapCls}>
        {this.renderMessageInfo()}
      </div>
    )
  }
}

export default MessageFlow;