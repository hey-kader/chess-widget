import React, { Component, useState, useEffect } from "react"
import axios from 'axios'

function Thanks (props) {
    const [submit, setSubmit] = useState(props.submit)
    const answers = props.answers
    const user = props.user
    const titles = props.titles
    
    function score () {
        var count = 0
        for (var i = 0; i < 40; i++) {
            if (props.submit[i] === props.answers[i]) {
                count++
            }
        }

        return parseFloat(count/40.0 * 100)
    }

    async function titles_show () {
        await document.getElementById("ul")
        let ul = document.getElementById("ul")
        for (var i = 0; i < titles.length; i++) {
            var title = (i+1) + '.' + titles[i]
            const h = document.createElement("h5")
            h.appendChild(document.createTextNode(title))
            if (submit[i] === answers[i]) {
                h.style.color = "green"
            }
            else {
                h.style.color = "red"
            }
            console.log(submit[i])
            console.log(answers[i])
            ul.appendChild(h)
            
        }

    }
    function make_obj () {

        let obj = {
            student: user['student'],
            name: user['name'],
            email: user['email'],
            age: user['age'],
            data: submit
        }

        console.log(obj)
        // axios post request
        axios.post('https://kaderarnold.com:4431/chess/', JSON.stringify(obj))
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })

    }
    

    titles_show()
    return (
        <div>
	    <h2>Score Report: </h2>
            {make_obj()}
            <div id="ul" style={{borderStyle: 'groove', borderRadius: '5px', padding: '1rem'}}>
            </div>
            <h2>Score: {score()}%</h2>
        </div>
    )
}
export default Thanks
