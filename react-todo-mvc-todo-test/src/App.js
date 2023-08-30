import { Input, Popconfirm, Space, Table } from 'antd'
import React from 'react'
import './App.css'
import axios from 'axios'
// 1. 找到对应的组件，把页面搭起来
// 2. table渲染出来 (发送请求 拿到数据 交给list (this.setState))
// 3. 删除功能(点击哪个就用哪个id 调用删除接口 重新拉起列表)
// 4. 搜索功能（拿到关键词，调用接口渲染列表）

const {Search} = Input

class App extends React.Component {
  state = {
    list: [],
    columns: [
      {
        title: '任务编号',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '任务名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '任务描述',
        dataIndex: 'des',
        key: 'des',
      },
      {
        title: '操作',
        render: (_, record) => (
          <Popconfirm 
            title="Sure to delete?"
            onConfirm={() => this.delData(_, record)}>
            <a>Delete</a>
          </Popconfirm>
        )
       
      },
    ]
  }

  // 搜索
  onSearch = async (value) => {
    console.log(value)
    const res = await axios.get(`http://localhost:3001/data/?q=${value}`)
    this.setState({
      list: res.data
    })
  }
  // 删除
  delData = async (_, record) => {
    console.log('delete', _, record)
    await axios.delete(`http://localhost:3001/data/${record.id}`)
    this.loadList()
  }

  // 加载列表
  loadList = async () => {
    const res = await axios.get('http://localhost:3001/data')
    console.log(res)
    this.setState({
      list: res.data
    })
  }

  componentDidMount() {
    this.loadList()
  }

  render () {
    return (
      <div className="container">
        {/* 搜索框 */}
        <Search
          placeholder="input search text"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={this.onSearch}
        />
        {/*表格*/}
        <Table dataSource={this.state.list} columns={this.state.columns} />;
      </div>
    )
  }
}

export default App
