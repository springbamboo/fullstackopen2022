import React from 'react';

const Head = ({ name }) => {
    return <div>{name}</div>;
};

const Part = ({ parts }) => {
    return (
        <div>
            <div>
                {parts.name} {parts.exercises}
            </div>
        </div>
    );
};

const Content = ({ part }) => {
    const sum = part.reduce((total, part) => total + part.exercises, 0);
    return (
        <div>
            {part.map((e) => (
                <Part key={e.id} parts={e} />
            ))}
            <div>total of {sum} exercises</div>
        </div>
    );
};

const Course = ({ course }) => {
    return (
        <div>
            <h1>
                <Head name={course.name} />
            </h1>
            <Content part={course.parts} />
        </div>
    );
};
const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: 1,
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: 2,
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: 3,
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: 4,
                },
            ],
        },
        {
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1,
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2,
                },
            ],
        },
    ];

    return (
        <div>
            {courses.map((course) => (
                <Course key={course.id} course={course} />
            ))}
        </div>
    );
};

export default App;
