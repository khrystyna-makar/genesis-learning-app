import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Layout from './components/Layout';
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Courses />} />
          <Route path='courses/:page' element={<Courses />} />
          <Route path="courses/course/:id" element={<CourseDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  );
}


ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);