import React from 'react';

const Header = ({ course }) => {
  return (
    <h2>{course}</h2>
  );
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => <Part key={part.id} part={part} />)}
    </div>
  );
};

const Total = ({ parts }) => {
  const total = parts.reduce((prevTotal, currentPart) => prevTotal + currentPart.exercises, 0)
  return (
    <p>
      <strong>total of {total} exercises</strong>
    </p>
  );
};

const Course = ({ course }) => (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
);

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