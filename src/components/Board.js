import React, { Component, useRef, useEffect, useState } from "react"
import Chessboard from "chessboardjsx"
import Chess from "chess.js"
import axios from "axios"


function Board (props) {
    
    const [fen, setFen] = useState(props.fen)
    let [width, setWidth] = useState("")

    let game = useRef(null)
    useEffect (() => {
      if (game !== null) {
        game.current = new Chess (fen)
      }

      if (window.innerWidth > 800) {
        setWidth("500")
      }
      else {
        setWidth("330")
      }
    }, [])

    const onDrop = ({sourceSquare, targetSquare}) => {
        let move = game.current.move({
            from: sourceSquare,
            to: targetSquare
        })

        if (move === null) return;
        setFen(game.current.fen())

        if (move.piece != 'p') {
          var notation = move.piece+targetSquare
        }
        else {
          var notation = targetSquare
        }
        console.log(notation)
        document.getElementById("playerMove").innerHTML = notation 

        document.getElementById("next").disabled = false 
        document.getElementById("reset").disabled = false 

    }

    console.log(window.innerWidth)

    return (
        <div id="board" className="wrapper" >
            <Chessboard
                position={fen}
                onDrop={onDrop}
                width={width}
            />
        </div>
    )
}



export default Board
