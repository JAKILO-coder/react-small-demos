
import {  makeAutoObservable } from 'mobx'
class TaskStore {
  list = [
    {
      id:1,
      name: '学习react',
      isDone: true
    },
    {
      id:2,
      name: '搞定mobx',
      isDone: false
    }
  ]
  constructor() {
    makeAutoObservable(this)
  }
  get isFinishedLength(){
    return this.list.filter(item=>item.isDone).length
  }
  // 单选操作
  singleCheck (id, isDone){
    // 查找
    const item = this.list.find(item=>item.id === id)
    item.isDone = isDone
  }
  // 全选操作
  allCheck(checked){
    // 把所有项的isDone属性 都按照传入的最新的状态修改
    this.list.forEach(item=>{
      item.isDone = checked
    })
  }
  // 计算属性 只有所有子项都是选中的时候 才是选中的状态
  get isAll() {
    return this.list.every(item=>item.isDone)
  }
  // 删除
  delTask = (id) => {
    this.list = this.list.filter(item => item.id !== id)
  }
  addTask = (task) => {
    this.list.push(task)
  }
}
export default TaskStore
