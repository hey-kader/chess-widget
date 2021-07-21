import React from 'react'
import ReactDOM from 'react-dom' 
import {Button, Card} from 'react-bootstrap'
import Instructions from './Instructions'

function Begin () {

  function handle_click () {
    ReactDOM.unmountComponentAtNode(document.getElementById('node'))
    const element = <Instructions /> 
    ReactDOM.render (element, document.getElementById('main'))

  }

return (
  <div id="main">
    <div id="node">
      <Card>
        <Card.Title>How Good Are You At Chess?</Card.Title>
        <Card body>Take Our Evaluation And Find Out</Card>
        <Card.Footer>
          <Button variant="info" onClick={handle_click}>Begin</Button>
        </Card.Footer>
      </Card>
    </div>
  </div>
  ) 
}

export default Begin
