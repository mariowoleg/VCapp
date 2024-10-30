import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from "./components/Register"
import Login from './components/Login';
import Home from './components/Home';


function App() {

  return (
    <Router>
      <div className='container grid grid-cols-1 place-items-center w-screen h-screen mx-auto'>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/protected' element={<Home />}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App
