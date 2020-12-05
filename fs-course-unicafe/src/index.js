import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => {
  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const Statistic = (props) => {
  return (
    <div>
      {props.text} {props.value}
    </div>
  )
}

const Statistics = (props) => {
  const allCount = props.goodCount + props.neutralCount + props.badCount
  const average = (props.goodCount - props.badCount) / allCount
  const positive = props.goodCount / allCount

  if (allCount === 0) {
    return (
      <div>
        No feedback given
      </div>
    )
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td><Statistic text="good" value={props.goodCount}/></td>
          </tr>
          <tr>
            <td><Statistic text="neutral" value={props.neutralCount}/></td>
          </tr>
          <tr>
            <td><Statistic text="bad" value={props.badCount}/></td>
          </tr>
          <tr>
            <td>all {allCount}</td>
          </tr>
          <tr>
            <td>average {average}</td>
          </tr>
          <tr>
            <td>positive {positive}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = (newValue) => {
    setGood(newValue)
  }

  const neutralClick = (newValue) => {
    setNeutral(newValue)
  }

  const badClick = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      give feedback
      <br/>
      <Button handleClick={() => goodClick(good + 1)} text="good"/>
      <Button handleClick={() => neutralClick(neutral + 1)} text="neutral"/>
      <Button handleClick={() => badClick(bad + 1)} text="bad"/>
      <Statistics goodCount={good} neutralCount={neutral} badCount = {bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)