import './App.css';
import Table from './component/Table.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Course from './component/Course.js';
import EditUser from './component/EditUser';
import Home from './component/Home.js';

function App() {
  return (
    <div className='App'>
      <Router>
        <Routes>
          <Route path='/' element={<Home></Home>}></Route>

          <Route Exact path='/table' element={<Table />} />
          <Route Exact path='/course' element={<Course />} />
          <Route path='/editUser/:id' element={<EditUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
