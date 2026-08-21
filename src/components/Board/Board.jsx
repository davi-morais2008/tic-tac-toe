import { useState } from 'react';
import styles from "./Board.module.css"
import Square from '../Square/Square.jsx'


function Board () {
    return(
        <>
            <h1>teste</h1>
            <div className="tabuleiro-linha">
                <Square />
                <Square />
                <Square />
            </div>
            
        </>
    )
}

export default Board