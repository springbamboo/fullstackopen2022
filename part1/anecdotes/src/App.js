import React from 'react';

const Hello = (props) => {
    return (
        <div>
            <p>Hello, {props.name}</p>
        </div>
    );
};

const App = () => {
    return (
        <div>
            <p>Heo worlo2</p>
            <Hello name="good" />
        </div>
    );
};

export default App;
