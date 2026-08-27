import { use, useState } from 'react';
import styles from "./Board.module.css"
import Square from '../Square/Square.jsx'


function Board () {
    const [square, setSquare] = useState(Array(9).fill(''))
    const [proximo, setProximo] = useState(true)


    function Clicar(i) {

        if (square[i] !== ''){
            return
        }

        const proximoMove = square.slice()
        console.log(proximoMove)

        if (proximo) {
            proximoMove[i] = 'X'
        } else {
            proximoMove[i] = 'O'
        }
        setSquare(proximoMove)
        setProximo(!proximo)
    }

    return(
        <>
            <h1>teste</h1>
            <div className="tabuleiro-linha">
                <Square valor={square[0]} aoClicarSquare={() => Clicar(0)}/>
                <Square valor={square[1]} aoClicarSquare={() => Clicar(1)}/>
                <Square valor={square[2]} aoClicarSquare={() => Clicar(2)}/>
            </div>
            <div className="tabuleiro-linha">
                <Square valor={square[3]} aoClicarSquare={() => Clicar(3)}/>
                <Square valor={square[4]} aoClicarSquare={() => Clicar(4)}/>
                <Square valor={square[5]} aoClicarSquare={() => Clicar(5)}/>
            </div>
            <div className="tabuleiro-linha">
                <Square valor={square[6]} aoClicarSquare={() => Clicar(6)}/>
                <Square valor={square[7]} aoClicarSquare={() => Clicar(7)}/>
                <Square valor={square[8]} aoClicarSquare={() => Clicar(8)}/>
            </div>
            
        </>
    )
}

export default Board