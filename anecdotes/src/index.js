import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(5))

  const randInt = () => {
    const randomNum = Math.floor(Math.random() * 5)
    setSelected(randomNum)
  }

  const incrementVote = (selected) => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      Anecdote of the day
      <br/>
      {props.anecdotes[selected]}
      <br/>
      has {votes[selected]} votes
      <br/>
      <Button handleClick={() => incrementVote(selected)} text="vote"/>
      <Button handleClick={() => randInt()} text="next anecdote"/>
      <br/>
      Anecdote with most votes
      <br/>
      {props.anecdotes[votes.indexOf(Math.max(...votes))]}
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
