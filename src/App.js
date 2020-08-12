import React, { PureComponent } from 'react';
import MessageFlow from './components/message-flow';
import { MESSAGE_TYPE_ENUMS } from './constant';
import { List, Skeleton, Button } from 'antd';
import s from './app.module.scss';

// 模拟接口返回的数据
const MOCK_DATA = [
  {
    id: 0,
    name: '陈冠潮',
    type: 0,
    text: '你好，我陈冠潮'
  },
  {
    id: 1,
    name: '铃盛',
    type: 1,
    url: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=818377491,78244796&fm=26&gp=0.jpg'
  },
  {
    id: 2,
    type: 2,
    text: '你已加入群聊'
  },
  {
    id: 3,
    type: 2,
    text: '你撤销了一条消息'
  },
  {
    // 其他非常规的类型，预留用于扩展
    id: 4,
    type: 3
  }
]

const getOtherMessage = () => {
  return <div>我是其他类型的消息流哟</div>
}

class App extends PureComponent {
  state = {
    initLoading: true,
    list: [],
  };

  componentDidMount() {
    this.getData();
  }


  getData = async () => {
    this.setState({
      initLoading: true
    })
    let list = await Promise.resolve(MOCK_DATA)
    list[4].render = getOtherMessage()
    this.setState({
      list,
      initLoading: false
    })
  };

  renderMessageFlows = ({ id, type, ...other }) => {
    return (
      <MessageFlow key={id} type={type} {...other} />
    )
  }

  handleRevoke = (item) => {
    console.log('【撤销该条消息】', item)
  }

  getActionEle = (item) => {
    return (
      item.type !== MESSAGE_TYPE_ENUMS.SYSTEM_INFO.value ?
        [
          <Button
            type="link"
            className={s.actionText}
            onClick={this.handleRevoke.bind(this, item)}
          >
            撤销
          </Button>
        ]
        : null
    )
  }

  render() {
    const { initLoading, list } = this.state

    return (
      <div className={s.app} >
        <List
          className={s.listWrap}
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={item => (
            <List.Item
              actions={this.getActionEle(item)}
            >
              <Skeleton avatar title={false} loading={item.loading} active>
                {
                  this.renderMessageFlows(item)
                }
              </Skeleton>
            </List.Item>
          )
          }
        />
      </div >
    );
  }

}

export default App;
