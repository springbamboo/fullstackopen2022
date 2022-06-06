import React, { useState } from 'react';

const Button = ({ onClick, text }) => {
    return <button onClick={onClick}>{text}</button>;
};

const StatisticLine = ({ text, value }) => {
    return (
        <div>
            {text},{value}
        </div>
    );
};

const Statistics = ({ good, neutral, bad }) => {
    if (good === 0 && neutral === 0 && bad === 0) {
        return (
            <div>
                <h1>statistics</h1>
                <div>No feedback given</div>
            </div>
        );
    } else {
        return (
            <div>
                <h1>statistics</h1>
                <StatisticLine text="good" value={good} />
                <StatisticLine text="neutral" value={neutral} />
                <StatisticLine text="bad" value={bad} />
                <StatisticLine text="all" value={good + neutral + bad} />
                <StatisticLine
                    text="average"
                    value={(good * 1 - bad) / (good + neutral + bad)}
                />
                <StatisticLine
                    text="positive"
                    value={good / (good + neutral + bad)}
                />
            </div>
        );
    }
};

const App = () => {
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    const handleGoodClick = () => {
        setGood(good + 1);
    };

    const handleNeutralClick = () => {
        setNeutral(neutral + 1);
    };

    const handleBadClick = () => {
        setBad(bad + 1);
    };

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={handleGoodClick} text="good" />
            <Button onClick={handleNeutralClick} text="Neutral" />
            <Button onClick={handleBadClick} text="Bad" />
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
