import React from 'react'
import ReactDOM from 'react-dom'
import {Card, Button} from 'react-bootstrap'
import Test from './Test'


function Demo (props) {

  function toggle_next () {
    ReactDOM.unmountComponentAtNode(document.getElementById('main')) 
    const element = <Test name={props.name} email={props.email} /> 
    ReactDOM.render(element, document.getElementById('root'))

  }

  return (
    <Card>
      <Card.Header><Card.Title>Just Drag and Drop!</Card.Title></Card.Header>
        <Card.Body>
          <Card style={{margin: '0.1rem'}} body>
            <iframe src="https://giphy.com/embed/vc18obMth58a9FuisW" width="300" height="300" frameBorder="0" allowFullScreen></iframe>
          </Card>
        </Card.Body>
        <Card.Footer>
          <Button variant="danger" onClick={toggle_next}>Start</Button>
        </Card.Footer>
    </Card>
  )

}

export default Demo
