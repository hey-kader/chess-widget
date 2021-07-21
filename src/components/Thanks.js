import React, { Component, useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Card} from 'react-bootstrap'
import axios from 'axios'
import Test from './Test'
import ReactDOM from 'react-dom'

const api = axios.create({
  baseURL: 'https://kaderarnold.com/chess' 
})

function Thanks (props) {

    const [titles, setTitles] = useState(props.titles)
    const [answers, setAnswers] = useState(props.answers)
    const [moves, setMoves] = useState(props.moves)

    const email = props.email
    const name = props.name

    function score () {
        var count = 0
        for (var i = 0; i < answers.length; i++) {
            if (moves[i][0] == 'p') {
              moves[i] = moves[i].replace('p', '')
            }
            if (answers[i] === moves[i]) {
                count++
            }
        } 
        return parseFloat((count/parseFloat(answers.length))* 100)
    }

    async function titles_show () {
        await document.getElementById("ul")
        let ul = document.getElementById("ul")
        for (var i = 0; i < answers.length; i++) {
            var answer = (i+1) + '. ' + titles[i]
            const h = document.createElement("h5")
            h.appendChild(document.createTextNode(answer))
            if (moves[i] === answers[i]) {
                h.style.color = "green"
            }
            else {
                h.style.color = "red"
            }
            console.log(moves[i])
            console.log(answers[i])
            ul.appendChild(h)
            
        }

    }
    function make_obj () {

        var o = [] 

        for (var i = 0; i < moves.length; i++) {
          o[i] = moves[i] 
        }

        o.unshift(name)
        o.unshift(email)

        console.log(o)
        return o


    }

    function send_obj () {
        var obj = make_obj ()

      api.post('/score/', obj)
         .then(response => {
               console.log(response)
           })
           .catch(error => {
              console.log(error)
           })
   }

  
    titles_show()
    send_obj()

    return (
		<Card>
			<div>
			<Card.Header>
				<Card.Title><h2>Score For {name}</h2></Card.Title>
			</Card.Header>
			<Card.Body>
        <Card.Text>Each position tested your understanding of a fundamental chess concept/strategy. Scroll down to see what you got right or wrong, and your overall score.</Card.Text>
				<div id="ul" style={{borderStyle: 'groove', borderRadius: '5px', padding: '1rem'}}>
				</div>
        <Card.Text>You will receive a detailed copy of your result at the provided email address. Any questions or feedback? Contact us at info@startrightchess.com.</Card.Text>
				<h2>Score: {score()}%</h2>
			</Card.Body>
        <Card.Footer style={{alignItems: 'center', textAlign: 'center', contentJustify: 'center', display: 'flex'}}>
				<Button style={{marginRight: '1rem'}} variant="warning" onClick={() => window.location.href = "https://kaderarnold.com/chess/"}>Try Again</Button>
				<Button variant="success" onClick={() => window.location.href = "https://startrightchess.com/post-evaluation"}>Done</Button>
			</Card.Footer>
			</div>
		</Card>
    )
}
export default Thanks
