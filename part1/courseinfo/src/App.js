import React from 'react';

const Header = ({ course }) => {
    return <div>{course}</div>;
};

const Content = ({ content }) => {
    return content.map((n) => (
        <div>
            {n.partTitle} {n.exercises}
        </div>
    ));
};

const Total = ({ total }) => {
    return (
        <div>
            {total[0].exercises + total[1].exercises + total[2].exercises}
        </div>
    );
};

const App = () => {
    const courseInfo = {
        course: 'Half Stack application development',
        parts: [
            { partTitle: 'Fundamentals of React', exercises: 10 },
            { partTitle: 'Using props to pass data', exercises: 7 },
            { partTitle: 'State of a component', exercises: 14 },
        ],
    };

    return (
        <div>
            <Header course={courseInfo.course} />
            <Content content={courseInfo.parts} />
            <Total total={courseInfo.parts} />
        </div>
    );
};

export default App;
