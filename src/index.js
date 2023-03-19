import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, 
  createBrowserRouter, 
  createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout';
import Courses from './pages/Courses'
import CourseDetail from './pages/CourseDetail';
import Error from './components/Error';
import './index.css';

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<Error />} >
      <Route index element={<Courses />} errorElement={<Error />} />
      <Route path='courses/:page' element={<Courses />} errorElement={<Error />} />
      <Route path="courses/course/:id" element={<CourseDetail />} errorElement={<Error />}/>
    </Route>
  ))

  return (
    <RouterProvider router={router} /> 
  );
}


ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);