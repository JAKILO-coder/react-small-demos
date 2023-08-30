import './index.css'
import {useStore} from '../store'
import { useState } from 'react'
import {observer} from 'mobx-react-lite'
import uuid from 'react-uuid'

function Task() {
  const {taskStore} = useStore()

  // 单选受控
  // mobx store去维护状态 input只需要把e.target.value交给store
  // 让store进行修改
  function onChange(id, e){
    console.log(e.target.checked)
    taskStore.singleCheck(id, e.target.checked)
  }
  function allChange(e){
    taskStore.allCheck(e.target.checked)
  }
  function delTask(id){
    taskStore.delTask(id)
  }
  const [taskValue, setTaskValue] =  useState('')
  function addTask(e){
    if (e.keyCode === 13){
      taskStore.addTask({
        id:uuid(),
        name:taskValue,
        isDone: false
      })
      setTaskValue('')
    }
  }

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos</h1>
        <input
          className="new-todo"
          autoFocus
          autoComplete="off"
          placeholder="What needs to be done?"
          value={taskValue}
          onChange={(e)=>setTaskValue(e.target.value)}
          onKeyUp={addTask}
        />
      </header>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type="checkbox"
          checked={taskStore.isAll}
          onChange={allChange}
        />
        <label htmlFor="toggle-all"></label>
        <ul className="todo-list">
          {
            taskStore.list.map(item=>(
              <li
                className={item.isDone ? "todo completed" : 'todo'}
                key={item.id}
              >
                <div className="view">
                  {/* 单选 受控和非受控 */}
                  <input 
                    className="toggle" 
                    type="checkbox" 
                    checked={item.isDone}
                    onChange={(e)=>onChange(item.id, e)}/>
                  <label >{item.name}</label>
                  <button className="destroy" onClick={()=>delTask(item.id)}></button>
                </div>
              </li>
            ))
          }
          
        </ul>
      </section>
      <footer className='footer'>
        <span className='todo-count'>
          任务总数：{taskStore.list.length} 已完成：{taskStore.isFinishedLength}
        </span>
      </footer>
    </section>
  )
}

export default observer(Task)