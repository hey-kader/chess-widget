import React, { Component, useState, useEffect } from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import {Button, Card} from 'react-bootstrap'
import axios from 'axios'
import Test from './Test'
import ReactDOM from 'react-dom'

const api = axios.create({
baseURL: 'https://kaderarnold.com:4431/chess' 
})

function Thanks (props) {

    const [titles, setTitles] = useState(props.titles)
    const [answers, setAnswers] = useState(props.answers)
    const [moves, setMoves] = useState(props.moves)

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
            var answer = (i+1) + '.' + titles[i]
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

        console.log(moves)
        var o = {}
        for (var i = 0; i < moves.length; i++) {
          o['q'+String(i+1)] = moves[i] 

        }
        console.log(o)
        // axios post request
        api.post('/score', o)
            .then(response => {
                console.log(response)
                console.log(JSON.parse(response))
            })
            .catch(error => {
                console.log(error)
            })

    }
    
    titles_show()
    return (
		<Card>
			<div>
			<Card.Header>
				<Card.Title><h2>Score Report: </h2></Card.Title>
			</Card.Header>
			{make_obj()}
			<Card.Body>
				<div id="ul" style={{borderStyle: 'groove', borderRadius: '5px', padding: '1rem'}}>
				</div>
				<h2>Score: {score()}%</h2>
			</Card.Body>
			<Card.Footer>
				<Button onClick={() => window.location.href = "https://kaderarnold.com:4431/chess/"}>Try Again</Button>
			</Card.Footer>
			</div>
		</Card>
    )
}
export default Thanks
