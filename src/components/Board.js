import React, { Component, useRef, useEffect, useState } from "react"
import Chessboard from "chessboardjsx"
import Chess from "chess.js"
import axios from "axios"


function Board (props) {
    
    const [fen, setFen] = useState(props.fen)

    let game = useRef(null)
    useEffect (() => {
		if (game !== null) {
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

        var notation = move.piece+targetSquare
        console.log(notation)
        document.getElementById("playerMove").innerHTML = notation 

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
