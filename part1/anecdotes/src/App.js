import React, { useState } from 'react';

const Anecdote = (props) => {
  return (
    <div>
      <p>{props.text}</p>
      <p>has {props.votes} votes</p>
    </div>
  );
};

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  );
};

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients',
    'The best way to get a project done faster is to start sooner',
    'A common mistake that people make when trying to design something completely foolproof was to underestimate the ingenuity of complete fools.',
    'Programming today is a race between software engineers striving to build bigger and better idiot-proof programs, and the Universe trying to produce bigger and better idiots. So far, the Universe is winning.',
    'I think it\'s a new feature. Don\'t tell anyone it was an accident.',
    "Theory is when you know something, but it doesn’t work. Practice is when something works, but you don’t know why. Programmers combine theory and practice: Nothing works and they don’t know why.",
    "The most likely way for the world to be destroyed, most experts agree, is by accident. That's where we come in; we're computer professionals. We cause accidents.",
    "Documentation is like sex; when it's good, it's very, very good, and when it's bad, it's better than nothing.",
    'Measuring programming progress by lines of code is like measuring aircraft building progress by weight.'
  ];

  const randomIndex = () => Math.floor(Math.random() * anecdotes.length);
   
  const [selected, setSelected] = useState(randomIndex());
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected]++;
    setVotes(newVotes);
  };

  const handleNextAnecdoteClick = () => setSelected(randomIndex());

  const maxVotes = () => {
    let maxIndex = 0;
    votes.forEach((vote, voteIndex) => {
      if (votes[maxIndex] < vote) {
        maxIndex = voteIndex;
      }
    });
    return maxIndex;
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Anecdote text={anecdotes[selected]} votes={votes[selected]} />
      <Button handleClick={handleVote} text="vote" />
      <Button handleClick={handleNextAnecdoteClick} text="next anecdote" />
      <h2>Anecdote with most votes</h2>
      <Anecdote text={anecdotes[maxVotes()]} votes={votes[maxVotes()]} />
    </div>
  );
}

export default App;
