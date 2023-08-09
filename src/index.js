import React from 'react';
import ReactDOM from 'react-dom/client';
import { Route, RouterProvider, 
  createHashRouter, 
  createRoutesFromElements } from 'react-router-dom'
import Layout from './components/Layout';
import Courses, {loader as coursesLoader} from './pages/Courses'
import CourseDetail, {loader as courseDetailLoader} from './pages/CourseDetail';
import Error from './components/Error';
import './index.css';

function App() {

  const router = createHashRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />} errorElement={<Error />} >
      <Route index element={<Courses />} loader={coursesLoader} errorElement={<Error />} />
      <Route path='courses/:page' element={<Courses />} loader={coursesLoader} errorElement={<Error />} />
      <Route path="courses/course/:id" element={<CourseDetail />} loader={courseDetailLoader} errorElement={<Error />}/>
    </Route>
  ), {basename: "/genesis-learning-app"})

  return (
    <RouterProvider router={router} /> 
  );
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);