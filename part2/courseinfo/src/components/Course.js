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

export default Course;