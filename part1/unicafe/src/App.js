import React, { useState } from 'react';

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  );
};

const StatisticLine = (props) => {
  return <p>{props.text} {props.value}</p>;
};

const Statistics = (props) => {
  const { good, neutral, bad } = props.stats;
  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <StatisticLine text="good" value={good} />
      <StatisticLine text="neutral" value={neutral} />
      <StatisticLine text="bad" value={bad} />
      <StatisticLine text="all" value={good + neutral + bad} />
      <StatisticLine text="average" value={(good - bad)/(good + neutral + bad)} />
      <StatisticLine text="positive" value={((good/(good + neutral + bad)) * 100) + " %"} />
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  
  const voteGood = () => {
    setGood(good + 1);
  };

  const voteNeutral = () => {
    setNeutral(neutral + 1);
  };

  const voteBad = () => {
    setBad(bad + 1);
  };

  const stats = {
    'good': good,
    'neutral': neutral,
    'bad': bad
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={voteGood} text="good" />
      <Button handleClick={voteNeutral} text="neutral" />
      <Button handleClick={voteBad} text="bad" />
      <h1>statistics</h1>
      <Statistics stats={stats} />
    </div>
  )
};

export default App;
