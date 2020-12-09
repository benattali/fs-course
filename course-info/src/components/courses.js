import React from 'react'

const Header = ({ course }) => {
    return (
      <div>
        <h1>{course}</h1>
      </div>
    )
  }
  
  const Part = ({ name, exercises}) => {
    return (
      <div>
        {name} {exercises}
      </div>
    )
  }
  
  const Content = ({ name, exercises }) => {
    return (
      <div>
        <Part name={name} exercises={exercises}/>
      </div>
    )
  }
  
  const Total = ({ parts }) => {
    const sumExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  
    return (
      <div>
        total of {sumExercises}
      </div>
    )
  }
  
  const Course = ({ course }) => {
    return (
      <div>
        <Header course={course.name} />
        {course.parts.map(part =>
          <Content key={part.id} name={part.name} exercises={part.exercises}/>)}
        <Total parts={course.parts}/>
      </div>
    )
  }
  
  const Courses = ({ courses }) => {
    console.log(courses[0].parts);
    return (
      <div>
        {courses.map(course => {
        return <Course key={course.id} course={course}/>
        })}
      </div>
    )
  }

  export default Courses