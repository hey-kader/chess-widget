import React, {Component} from "react"
import Board from "./Board"
import axios from "axios"
import ReactDOM from "react-dom"
import Thanks from "./Thanks"
import "./Test.css"
import  {Button, Card} from 'react-bootstrap' 
import 'bootstrap/dist/css/bootstrap.min.css'




let a = []
let titles = []

function* iter (fenlist) {
    for (var i = 0; i < fenlist.length ; i++) {
        if (typeof(fenlist[i].fen) !== "undefined") {
            document.getElementById("title").innerHTML = fenlist[i].id + '. '+ fenlist[i].color + ' To Move'
            document.getElementById("fen").innerHTML = fenlist[i].fen
            a.push(fenlist[i].answer)
            titles.push(fenlist[i].title)
            console.log(a)
           yield fenlist[i].fen
        }
    }
}

let ar = [] 

function handle_click (f, pr) {
    console.log(f)
    if (typeof(f) !== "undefined") {

        ar.push(document.getElementById("playerMove").innerHTML)
        console.log(ar)
        document.getElementById("playerMove").innerHTML = ""
        ReactDOM.unmountComponentAtNode(document.getElementById("board"))
        const board = <Board fen={f} />
            ReactDOM.render(board, document.getElementById("board"))
	document.getElementById('next').style.display = 'none'
	document.getElementById('reset').style.display = 'none'
    }

    else {

        ar.push(document.getElementById("playerMove").innerHTML)
        console.log(f)
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

	// set zoom to 0,0
    }
    
    render () {
        const it = iter(this.state.fens)
        let t = it.next().value
        return (
            <div className="wrapper">
		<Card>
		<Card.Header>
		<Card.Title>
                <h3 style={{margin: '1rem 0rem', display: 'block', width: '100%'}} id="title"></h3>
		</Card.Title>
		</Card.Header>
		<Card.Body>
                <h3 id="fen" hidden></h3>
                <h2 id="playerMove" hidden></h2>

                <div id="board" className="wrapper">
                    {typeof(t) !== "undefined" ? <Board fen={t} /> : ""}
                </div>
		</Card.Body>
		<Card.Footer>
                <Button onClick={() => handle_click(it.next().value, this.props)} id="next" >next</Button>
                <Button style={{marginLeft: '0.2rem'}} id="reset" onClick={() => reset_click()}>reset</Button>
		</Card.Footer>
		</Card>
            </div>
        )
    }
}

export default Test
