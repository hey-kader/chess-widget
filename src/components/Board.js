import React, { Component, useRef, useEffect, useState } from "react"
import Chessboard from "chessboardjsx"
import Chess from "chess.js"
import axios from "axios"


function Board (props) {
    
    const [fen, setFen] = useState(props.fen)

    let game = useRef(null)
    useEffect (() => {
		if (game === null) {
			document.getElementById("next").disabled = true
			document.getElementById("reset").disabled = true 
		}
		else {
			game.current = new Chess (fen)
		}
    }, [])


    const onDrop = ({sourceSquare, targetSquare}) => {
        let move = game.current.move({
            from: sourceSquare,
            to: targetSquare
        })

        if (move === null) return;
        setFen(game.current.fen())

        console.log(targetSquare)
        document.getElementById("playerMove").innerHTML = targetSquare

        document.getElementById("next").disabled = false 
        document.getElementById("reset").disabled = false 
    }
    
    return (
        <div id="board" className="wrapper" >
            <Chessboard
                position={fen}
                onDrop={onDrop}
		width={"330"}
            />
        </div>
    )
}



export default Board
