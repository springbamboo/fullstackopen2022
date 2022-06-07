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
    return (
        <div>
            <Part parts={part[0]} />
            <Part parts={part[1]} />
            <Part parts={part[2]} />
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
    const course = {
        id: 1,
        name: 'Half Stack application development',
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
        ],
    };

    return <Course course={course} />;
};

export default App;
