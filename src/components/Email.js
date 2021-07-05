import React, {useState} from 'react' 
import {Form, Button} from 'react-bootstrap'
import axios from 'axios'
import Test from './Test'
import ReactDOM from 'react-dom'

function Email ()  {

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')

const api = axios.create({
baseURL: 'https://kaderarnold.com:4431/chess'
})

  function submit_handler (e) {
    e.preventDefault()

    const obj = {
      'name': name,
      'email': email
    }

    api.post('/email/', obj)
    .then( (response) => console.log(response) )

    ReactDOM.unmountComponentAtNode(document.getElementById('form'))
    const element = <Test />
    ReactDOM.render(element, document.getElementById('root'))
  }

  return (
    <Form id="form" style={{margin: 'auto'}} onSubmit={(e) => submit_handler(e)}>
      <Form.Group controlId="formBasicPassword">
        <Form.Label>Name</Form.Label>
          <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Bobby Fischer" />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
          <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          Your Personal Information Is Confidential
        </Form.Text>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  )

}

export default Email
