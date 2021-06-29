import React, {Component} from "react"
import Board from "./Board"
import axios from "axios"
import ReactDOM from "react-dom"
import Thanks from "./Thanks"
import "./Test.css"
import  {Button, Card, Tabs, Tab, Table} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'

let a = []
let titles = []


function* iter (fenlist) {
    for (var i = 0; i < fenlist.length ; i++) {
        if (typeof(fenlist[i].fen) !== "undefined") {
			append_to_table()
            document.getElementById("title").innerHTML = fenlist[i].id + '. '+ fenlist[i].color + ' To Move'
            document.getElementById("fen").innerHTML = fenlist[i].fen
            document.getElementById("answer").innerHTML = fenlist[i].answer
            document.getElementById("id").innerHTML = fenlist[i].id
            a.push(fenlist[i].answer)
            titles.push(fenlist[i].title)
            console.log(a)

           yield fenlist[i].fen
        }
    }
}

let ar = [] 

function append_to_table () {

	let row = document.createElement("tr")

	let num = document.createElement("td")
	num.innerHTML = document.getElementById("id").innerHTML
	row.appendChild(num)

	let sub = document.createElement("td")
	sub.innerHTML = document.getElementById("playerMove").innerHTML
	row.appendChild(sub)

	let ans = document.getElementById("answer").innerHTML 
	let z = document.createElement("td")
	z.innerHTML = ans


	console.log(z)
	let clone = row.cloneNode(true)
	clone.appendChild(z)
	

	document.getElementById("table-body").append(clone)
	
}

function handle_click (f, pr) {
    console.log(f)
    if (typeof(f) !== "undefined") {

        ar.push(document.getElementById("playerMove").innerHTML)
        console.log(ar)
        //document.getElementById("playerMove").innerHTML = ""
        //document.getElementById("id").innerHTML = ""
        //document.getElementById("answer").innerHTML = ""
        ReactDOM.unmountComponentAtNode(document.getElementById("board"))
        const board = <Board fen={f} />
            ReactDOM.render(board, document.getElementById("board"))
	document.getElementById('next').style.display = 'none'
	document.getElementById('reset').style.display = 'none'
    }

    else {

        ar.push(document.getElementById("playerMove").innerHTML)
        console.log(f)
		document.getElementById("playerMove").innerHTML = ""
		document.getElementById("id").innerHTML = ""
		document.getElementById("answer").innerHTML = ""
        const thanks = <Thanks titles={titles} answers={a} user={pr} submit={ar} />
        ReactDOM.render(thanks, document.getElementById("root"))
    }
}

function reset_click () {
    const fen = document.getElementById("fen").innerHTML
    ReactDOM.unmountComponentAtNode(document.getElementById("board"))
    const board = <Board fen={fen} />
        ReactDOM.render(board, document.getElementById("board"))
    document.getElementById('next').style.display = 'none'
    document.getElementById('reset').style.display = 'none'
	document.getelementbyid("playermove").innerhtml = ""
	document.getelementbyid("id").innerhtml = ""
	document.getelementbyid("answer").innerhtml = ""
}

const api = axios.create ({
    baseURL: "https://kaderarnold.com:4431/chess"
})

class Test extends Component {

    state = {
        fens: [],
        move: "",
        moves: []
    }
    
    constructor () {
        super()
        api.get ('/fenlist.json').then (res => {
            this.setState({fens: res.data})
            console.log(res.data)
        })

    }
    componentDidMount() {
        console.log(this.props)
    }

	componentWillUpdate() {
		console.log('update')

	}
    
    render () {
        const it = iter(this.state.fens)
        let t = it.next().value
        return (
			<div className="wrapper">
				<Tabs defaultActiveKey="game" id="game">
					<Tab eventKey="game" title="game">
					<Card>
						<Card.Header>
						<Card.Title>
							<h3 style={{margin: '1rem 0rem', display: 'block', width: '100%'}} id="title"></h3>
						</Card.Title>
						</Card.Header>
						<Card.Body>
						<h3 id="fen" hidden></h3>
						<h2 id="playerMove" hidden></h2>
						<h2 id="answer" hidden></h2>
						<h2 id="id" hidden></h2>
						<div id="board" className="wrapper">
							{typeof(t) !== "undefined" ? <Board fen={t} /> : ""}
						</div>
						</Card.Body>
						<Card.Footer>
						<Button onClick={() => handle_click(it.next().value, this.props)} id="next" >next</Button>
						<Button style={{marginLeft: '0.2rem'}} id="reset" onClick={() => reset_click()}>reset</Button>
						</Card.Footer>
					</Card>
					</Tab>

					<Tab eventKey="score" title="score">
							<Card>

								<Card.Header>
									<Card.Title>
										<h3 style={{margin: '1rem 0rem', display: 'block', width: '100%'}}>Score</h3>
									</Card.Title>
								</Card.Header>

								<Card.Body>
									<Table striped bordered hover>
										<thead>
											<tr>
												<th>#</th>
												<th>response</th>
												<th>answer</th>
											</tr>
										</thead>
										<tbody id="table-body">
										</tbody>
									</Table>
								</Card.Body>

								<Card.Footer>
								</Card.Footer>

						</Card>
					</Tab>
				</Tabs>
			</div>
        )
    }
}

export default Test
