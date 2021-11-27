import React, { useState } from 'react';

const Statistics = (props) => {
  const { good, neutral, bad } = props.stats;
  return (
    <>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {good + neutral + bad}</p>
      <p>average {(good - bad)/(good + neutral + bad)}</p>
      <p>positive {(good/(good + neutral + bad)) * 100} %</p>
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
      <button onClick={voteGood}>good</button>
      <button onClick={voteNeutral}>neutral</button>
      <button onClick={voteBad}>bad</button>
      <h1>statistics</h1>
      <Statistics stats={stats} />
    </div>
  )
};

export default App;
