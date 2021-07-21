import React from 'react'
import ReactDOM from 'react-dom'
import {Button, Card} from 'react-bootstrap'
import Email from './Email'

function Introduction () {

  function toggle_next () {

    ReactDOM.unmountComponentAtNode(document.getElementById('start'))
    const element = <Email />
    ReactDOM.render(element, document.getElementById('main'))

  }

  return (
    <div id="start">
      <Card>
        <Card.Header><Card.Title>Instructions</Card.Title></Card.Header>
          <Card.Body>
            <Card body style={{textAlign: 'left', justifyContent: 'left'}}>
              <Card.Text>This evaluation consists of 40 chess positions.</Card.Text>
              <ul>
                <li><Card.Text>For each position, make your best move by dragging and dropping the piece.</Card.Text></li>
                <li><Card.Text>Then, click next to advance, or click reset to submit another answer.</Card.Text></li>
                <li><Card.Text>Your score will not be affected if you choose reset</Card.Text></li>
                <li><Card.Text>There is no time limit</Card.Text></li>
              </ul>
            </Card>
          </Card.Body>
          <Card.Footer>
            <Button variant="info" onClick={toggle_next}>Next</Button>
          </Card.Footer>
      </Card>
    </div>
  )


}

export default Introduction
