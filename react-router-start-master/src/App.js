import {BrowserRouter, Link, Routes, Route} from 'react-router-dom'
import Home from './Home'
import About from './About'
import Login from './Login'


function App() {
  return (
    <BrowserRouter>
      <Link to="/">首页</Link>
      <Link to="/about">关于</Link>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
