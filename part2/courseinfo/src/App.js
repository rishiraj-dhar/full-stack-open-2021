import React from 'react';
import Course from './components/Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    },
    {
      name: 'UI Visuals',
      id: 3,
      parts: [
        {
          name: 'Tailwind CSS',
          exercises: 4,
          id: 1
        },
        {
          name: 'Bootstrap',
          exercises: 3,
          id: 2
        },
        {
          name: 'Material UI',
          exercises: 7,
          id: 3
        },
        {
          name: 'Figma',
          exercises: 5,
          id: 4
        }
      ]
    }
  ];

  return (
    <>
      <h1>Web Development Curriculum</h1>
      {courses.map(course => <Course key={course.id} course={course} />)}
    </>
  );
};

export default App;