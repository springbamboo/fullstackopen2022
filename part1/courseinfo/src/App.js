import React from 'react';

const Header = ({ course }) => {
    return <div>{course.course}</div>;
};

const Content = ({ courseInfo }) => {
    return (
        <div>
            <Part
                partTitle={courseInfo.parts[0].partTitle}
                exercises={courseInfo.parts[0].exercises}
            />
            <Part
                partTitle={courseInfo.parts[1].partTitle}
                exercises={courseInfo.parts[1].exercises}
            />
            <Part
                partTitle={courseInfo.parts[2].partTitle}
                exercises={courseInfo.parts[2].exercises}
            />
        </div>
    );
};

const Part = ({ partTitle, exercises }) => {
    return (
        <div>
            {partTitle},{exercises}
        </div>
    );
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
            <Header course={courseInfo} />
            <Content courseInfo={courseInfo} />
            <Total total={courseInfo.parts} />
        </div>
    );
};

export default App;
