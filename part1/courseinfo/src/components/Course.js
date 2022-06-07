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

export default Course;
