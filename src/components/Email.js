import React, {useState} from 'react' 
import {Form, Button, Card} from 'react-bootstrap'
import axios from 'axios'
import Demo from './Demo'
import ReactDOM from 'react-dom'

function Email ()  {

  let [name, setName] = useState('')
  let [email, setEmail] = useState('')
  let [ud, setUd] = useState('')

  const api = axios.create({
    baseURL: 'https://kaderarnold.com/chess'
  })

  function submit_handler (e) {

    e.preventDefault()

    api.post('/email/', {'name': name, 'email': email})
    .then( (response) => {setName(response.body.name); setEmail(response.body.email) })
    console.log(name)
    console.log(email)

    ReactDOM.unmountComponentAtNode(document.getElementById('main'))
    const element = <Demo name={name} email={email} /> 
    ReactDOM.render(element, document.getElementById('main'))

  }

  require('../App.css')
  return (
    <Card>
      <Card.Header>
        <Card.Title>Contact Information</Card.Title>
      </Card.Header>
      <Card body style={{textAlign: 'left', justifyContent: 'left'}}>
        <Card.Title>First, please enter your name and email address below.</Card.Title>
        <Card.Subtitle>You will receive a detailed copy of the result and follow-up recommendations in your email.</Card.Subtitle>
      </Card>
      <Card.Body>
        <Form id="form" style={{margin: '3rem auto', display: 'inline-block'}} onSubmit={(e) => submit_handler(e)}>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Name</Form.Label>
              <Form.Control type="text" onChange={(e) => setName(e.target.value)} placeholder="Bobby Fischer" required />
          </Form.Group>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
              <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              Your Personal Information Is Confidential
            </Form.Text>
          </Form.Group>
            <Button variant="warning" type="submit">Begin</Button>
        </Form>
      </Card.Body>
    </Card>
  )

}

export default Email
